import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";
import {GoogleCalendarAPI} from "../../utils/GoogleCalendarAPI.js";

export async function get({request, url}) {
    try {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
        const calendarApi = await GoogleCalendarAPI.getInstance();

        console.log("HELLOOO", await calendarApi.getCalendars())
        return {
            status: 200,
            body: {data: await calendarApi.getCalendars()}
        }
    } catch (error) {
        console.error(error);
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

export async function patch({request, url}) {
    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

    try {
        const res = await request.json();
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();

        if (settings?.google?.calendars?.appointments) {
            const calendarApi = await GoogleCalendarAPI.getInstance();
            await calendarApi.updateCalendar({
                timeZone: res.timeZone
            })
        }

        return {
            status: 200
        }
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: { message: error.message }
        }
    }
}