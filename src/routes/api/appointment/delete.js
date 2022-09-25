import {FirebaseAdmin} from "../../../utils/firebase/FirebaseAdmin.js";
import {SMSHelper} from "../../../utils/SMSHelper.js";
import {MailHelper} from "../../../utils/MailHelper.js";
import {HTMLBookingConfirmation} from "../../../assets/email-templates/booking-confirmation.js";
import {StringUtils} from "../../../utils/StringUtils.js";
import {GoogleCalendarAPI} from "../../../utils/GoogleCalendarAPI.js";
import {JsonHelper} from "../../../utils/JsonHelper.js";

export async function post({request}) {
    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
    const payload = await request.json();
    const notifyCustomer = payload.notify;
    const appointment = payload.appointment;
    const client = appointment.userInfo;
    const staff = await (await FirebaseAdmin.firestore().collection("staff").doc(appointment.staff).get()).data();
    const settings = new JsonHelper(await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data());
    const services = await Promise.all(payload.services.map(async (docId) => {
        return await (await FirebaseAdmin.firestore().collection("services").doc(docId).get()).data();
    }));
    
    if (notifyCustomer) {
        try {
            if (appointment?.TextMagicReminderId) {
                const textMagic = await SMSHelper.getMagicInstance();
                textMagic.deleteScheduledMessage(appointment.TextMagicReminderId);
            }

            await SMSHelper.setAppointmentCancellation(appointment, client?.phoneNumber, staff);
        } catch (error) {
            console.error(error);
        }

        try {
            await MailHelper.send(
                {
                    "name": settings.get("store.name"),
                    "email": "scheduling@fullschedule.co"
                },
                [{
                    "email": client?.email,
                    "name": client?.displayName
                }], `Appointment Cancelled!`, HTMLBookingConfirmation
                    .replace("{{TITLE}}", "APPOINTMENT CANCELLED!")
                    .replace("{{LOGOURL}}", settings.get("store.logo"))
                    .replace("{{ADDRESS}}", `${settings.object?.address?.street1 && settings.object.address.street1 + "\n"}${settings.object?.address?.street2 && settings.object?.address?.street2 + "\n"}${settings.object?.address?.city && settings.object?.address?.city + ", "}${settings.object?.address?.state && settings.object?.address?.state} ${settings.object?.address?.zip && settings.object?.address?.zip}`)
                    .replace("{{SERVICES}}", services.map(({name}) => name).join(", "))
                    .replace("{{PROVIDER.PHOTOURL}}", staff.photoURL)
                    .replace("{{PROVIDER.NAME}}", StringUtils.capitalize(staff.displayName))
                    .replace("{{PROVIDER.TITLE}}", staff.title)
                    .replace("{{FOR}}", "provider")
                    .replace("{{DATE}}", FirebaseAdmin.toDate(appointment.start).toLocaleTimeString([], {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        ...(settings.get("address.timezone") && {timeZone: settings.get("address.timezone")})
                    }).replace(/^(.+?,.+?),\s*/g, '$1 @ ')));


        } catch (error) {
            console.error(error);
        }
    }

    try {
        const calendarApi = await GoogleCalendarAPI.getInstance();
        await calendarApi.deleteEvent(appointment.google_event_id, notifyCustomer);

        await FirebaseAdmin.firestore().collection("appointments").doc(appointment.doc_id).update({
            cancelled: true
        });

        return { status: 200 }
    } catch (error) {

    }
}