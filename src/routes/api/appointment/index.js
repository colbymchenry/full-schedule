import {FirebaseAdmin} from "../../../utils/firebase/FirebaseAdmin.js";
import {JsonHelper} from "../../../utils/JsonHelper";
import {GoogleCalendarAPI} from "../../../utils/GoogleCalendarAPI.js";
import {StringUtils} from "../../../utils/StringUtils.js";

// Endpoint to create an appointment
export async function post({request}) {

    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
    const settings = new JsonHelper(await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data());

    const payload = await request.json();

    // Grab all relevant Firebase documents from the IDs passed in the payload
    const staff = await (await FirebaseAdmin.firestore().collection("staff").doc(payload.staff).get()).data();
    const client = await (await FirebaseAdmin.firestore().collection("clients").doc(payload.client).get()).data();

    // Make sure if only one service is selected it is passed as an array
    if (typeof payload.services === 'string') payload["services"] = [payload["services"]];

    const services = await Promise.all(payload.services.map(async (docId) => {
        return await (await FirebaseAdmin.firestore().collection("services").doc(docId).get()).data();
    }));

    const getVal = (key) => settings.get(key) || "";

    try {
        const startDate = new Date(payload.date);

        // Add up service durations to get accurate endTime
        const endDate = new Date(payload.date);
        let totalMinutes = 0;
        services.forEach(({duration}) => totalMinutes += duration ? parseInt(duration) : 30);
        const addedHours = Math.floor(totalMinutes / 60);
        const addedMinutes = totalMinutes % 60;
        endDate.setHours(endDate.getHours() + addedHours, endDate.getMinutes() + addedMinutes, 0);

        // Get a new Google Calendar API instance
        const calendarApi = await GoogleCalendarAPI.getInstance();

        // Setup Google Calendar's event variables
        const location = `${getVal("address.street1")} ${getVal("address.street2")}, ${getVal("address.city")}, ${getVal("address.state")} ${getVal("address.zip")}`;
        const summary = `${settings.get("store.name")} Appointment`;
        const description = `Provider: ${StringUtils.capitalize(staff?.displayName)}
Services: ${services.map((service) => StringUtils.capitalize(service.name)).join(", ")}
        `;

        // Get events at time & date
        const events = await calendarApi.getEvents({
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            singleEvents: true,
            orderBy: 'startTime'
        })

        if (events.filter((gEvent) => gEvent?.extendedProperties?.private?.staff === payload.staff).length) {
            return {
                status: 400,
                body: {
                    message: "Staff not available.",
                    code: 1
                }
            }
        }

        // Post new event to Google Calendar
        const postedEvent = await calendarApi.postEvent(location, summary, description, startDate, endDate, [
            {
                email: staff.email
            },
            {
                email: "me@colbymchenry.com" // TODO: Switch to client later
            }
        ], {
            staff: payload.staff,
            client: payload.client
        });

        // Add appointment to DB
        await FirebaseAdmin.firestore().collection("appointments").add({
            staff: payload.staff,
            client: payload.client,
            google_event_id: postedEvent.id,
            google_event_link: postedEvent.htmlLink,
            start: postedEvent.start,
            end: postedEvent.end,
            services: payload.services
        });

        return {
            status: 200,
            body: {}
        }
    } catch (error) {
        if (error?.code ) {
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

