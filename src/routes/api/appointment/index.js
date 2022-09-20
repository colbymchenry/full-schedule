import {FirebaseAdmin} from "../../../utils/firebase/FirebaseAdmin.js";
import {JsonHelper} from "../../../utils/JsonHelper";
import {GoogleCalendarAPI} from "../../../utils/GoogleCalendarAPI.js";
import {StringUtils} from "../../../utils/StringUtils.js";
import {SMSHelper} from "../../../utils/SMSHelper.js";
import {MailHelper} from "../../../utils/MailHelper.js";
import {AppointmentHelper} from "../../../utils/AppointmentHelper.js";
import {Recaptcha} from "../../../utils/Recaptcha.js";
import {HTMLBookingConfirmation} from "../../../assets/email-templates/booking-confirmation.js";

// Endpoint to create an appointment
export async function post({request}) {

    const payload = await request.json();
    let client, lead;

    if (payload?.lead) {
        const verify = await Recaptcha.verifyToken(request);
        if (verify) return verify;
        lead = await (await FirebaseAdmin.firestore().collection("leads").doc(payload.lead).get()).data();
    } else if (payload?.client) {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
        client = await (await FirebaseAdmin.firestore().collection("clients").doc(payload.client).get()).data();
    } else {
        return {
            status: 400,
            body: {}
        }
    }

    // Basic payload validation for now
    if (!payload?.date || !payload?.services || !payload?.staff || !payload?.timestamp) {
        return {
            status: 400,
            body: {}
        }
    }

    const settings = new JsonHelper(await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data());

    // Grab all relevant Firebase documents from the IDs passed in the payload
    const staff = await (await FirebaseAdmin.firestore().collection("staff").doc(payload.staff).get()).data();

    // Make sure if only one service is selected it is passed as an array
    if (typeof payload.services === 'string') payload["services"] = [payload["services"]];

    const services = await Promise.all(payload.services.map(async (docId) => {
        return await (await FirebaseAdmin.firestore().collection("services").doc(docId).get()).data();
    }));

    const getVal = (key) => settings.get(key) || "";

    try {

        // Setup Google Calendar's event variables
        const location = `${getVal("address.street1")} ${getVal("address.street2")}, ${getVal("address.city")}, ${getVal("address.state")} ${getVal("address.zip")}`;
        const summary = `${settings.get("store.name")} Appointment`;
        const description = `Provider: ${StringUtils.capitalize(staff?.displayName)}
Services: ${services.map((service) => StringUtils.capitalize(service.name)).join(", ")}
        `;

        staff["doc_id"] = payload.staff;
        const isAvailable = await AppointmentHelper.isAvailable(payload.date, payload.timestamp, services, staff, settings);

        // if there is no start date return
        if (isAvailable?.status === 400) {
            return isAvailable;
        }

        // Post new event to Google Calendar
        const calendarApi = await GoogleCalendarAPI.getInstance();
        const postedEvent = await calendarApi.postEvent(location, summary, description, isAvailable.startDate, isAvailable.endDate, [
            {
                email: staff.email,
                displayName: staff.displayName
            },
            {
                email: client?.email || lead?.email,
                displayName: client?.displayName || lead?.displayName,
                phoneNumber: client?.phoneNumber || lead?.phoneNumber
            }
        ], {
            staff: payload.staff,
            ...(payload?.client && {client: payload.client}),
            ...(payload?.lead && {lead: payload.lead})
        });

        // Add appointment to DB
        let appObj = {
            staff: payload.staff,
            ...(payload?.client && {client: payload.client}),
            ...(payload?.lead && {lead: payload.lead}),
            google_event_id: postedEvent.id,
            google_event_link: postedEvent.htmlLink,
            services: payload.services,
            start: FirebaseAdmin.toTimestamp(new Date(postedEvent.start.dateTime)),
            end: FirebaseAdmin.toTimestamp(new Date(postedEvent.end.dateTime))
        };

        const {id} = await FirebaseAdmin.firestore().collection("appointments").add(appObj);

        appObj["doc_id"] = id;

        let errors = [];

        try {
            // Send Email and SMS confirmation
            await SMSHelper.sendAppointmentConfirmation(appObj, client?.phoneNumber || lead?.phoneNumber, staff);
        } catch (error) {
            errors.push("Failed to send SMS confirmation.");
            console.error(error);
        }

        try {
            // Send email to client/customer
            await MailHelper.send(
                {
                    "name": settings.get("store.name"),
                    "email": "scheduling@fullschedule.co"
                },
                [{
                    "email": client?.email || lead?.email,
                    "name": client?.displayName || lead?.displayName
                }], "Your Appointment Confirmation!", HTMLBookingConfirmation
                    .replace("{{LOGOURL}}", settings.get("store.logo"))
                    .replace("{{ADDRESS}}", `${settings.object?.address?.street1 && settings.object.address.street1 + "\n"}${settings.object?.address?.street2 && settings.object?.address?.street2 + "\n"}${settings.object?.address?.city && settings.object?.address?.city + ", "}${settings.object?.address?.state && settings.object?.address?.state} ${settings.object?.address?.zip && settings.object?.address?.zip}`)
                    .replace("{{SERVICES}}", services.map(({name}) => name).join(", "))
                    .replace("{{PROVIDER.PHOTOURL}}", staff.photoURL)
                    .replace("{{PROVIDER.NAME}}", StringUtils.capitalize(staff.displayName))
                    .replace("{{PROVIDER.TITLE}}", staff.title)
                    .replace("{{FOR}}", "provider")
                    .replace("{{DATE}}", new Date(postedEvent.start.dateTime).toLocaleTimeString([], {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        ...(settings.get("address.timezone") && {timeZone: settings.get("address.timezone")})
                    }).replace(/^(.+?,.+?),\s*/g,'$1 @ ')));
        } catch (error) {
            errors.push("Failed to send email confirmation to customer.");
            console.error(error);
        }

        try {
            let customerName = StringUtils.capitalize((client?.displayName || lead?.displayName).toLowerCase());
            // Send email to provider
            await MailHelper.send(
                {
                    "name": settings.get("store.name"),
                    "email": "scheduling@fullschedule.co"
                },
                [{
                    "email": staff.email,
                    "name": staff.displayName
                }], `New Booking for ${customerName}!`, HTMLBookingConfirmation
                    .replace("{{LOGOURL}}", settings.get("store.logo"))
                    .replace("{{ADDRESS}}", StringUtils.formatPhoneNumber(client?.phoneNumber || lead?.phoneNumber))
                    .replace("{{SERVICES}}", services.map(({name}) => name).join(", "))
                    .replace("{{PROVIDER.PHOTOURL}}", client?.photoURL || lead?.photoURL)
                    .replace("{{PROVIDER.NAME}}", customerName)
                    .replace("{{FOR}}", "patient")
                    .replace("{{PROVIDER.TITLE}}", (client?.email || lead?.email).toLowerCase())
                    .replace("{{DATE}}", new Date(postedEvent.start.dateTime).toLocaleTimeString([], {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        ...(settings.get("address.timezone") && {timeZone: settings.get("address.timezone")})
                    }).replace(/^(.+?,.+?),\s*/g,'$1 @ ')));
        } catch (error) {
            errors.push("Failed to send email confirmation to customer.");
            console.error(error);
        }

        if (errors.length) {
            FirebaseAdmin.firestore().collection("appointments").doc(id).update({errors});
        }

        return {
            status: 200,
            body: {
                appointment: appObj,
                errors
            }
        }
    } catch (error) {
        if (error?.code) {
            return {
                status: 400,
                body: {
                    code: error.code,
                    message: error.message
                }
            }
        } else {
            console.error(error);
            return {
                status: 500
            }
        }
    }
}

export async function patch({request, url}) {
    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
    const data = await request.json();

    try {


        return {status: 200}
    } catch (error) {
        if (error?.code) {
            return {
                status: 400,
                body: {
                    code: error.code,
                    message: error.message
                }
            }
        } else {
            console.error(error);
            return {
                status: 500
            }
        }
    }
}

