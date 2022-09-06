import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";
import {GoogleCalendarAPI} from "../../utils/GoogleCalendarAPI.js";

export async function get({request, url}) {
    try {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
        const calendarApi = await GoogleCalendarAPI.getInstance();

        return {
            status: 200,
            body: {data: await calendarApi.getCalendars()}
        }
    } catch (error) {
        return {
            status: 200,
            body: {data: []}
        }
    }
}

export async function post({request}) {
    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
    const calendarApi = await GoogleCalendarAPI.getInstance();

    return {
        status: 200,
        body: {data: await calendarApi.createCalendar()}
    }
}