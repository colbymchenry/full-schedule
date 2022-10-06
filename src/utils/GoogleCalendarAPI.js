import { google } from 'googleapis';
import {config} from 'dotenv';
import {FirebaseAdmin} from "./firebase/FirebaseAdmin.js";

config();

// TODO: Implement freebusy to determine if blocked time with new appointments when scheduling
// https://stackoverflow.com/questions/44133947/google-calendar-api-check-for-conflicts
export class GoogleCalendarAPI {

    constructor() {
        this.oauth2Client = null;
        this.settings = null;
        this.calendar = null;
        this.calendarId = null;
    }

    static async getInstance() {
        const calendarApi = new GoogleCalendarAPI();
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();
        const tokens = await settings?.google?.token;

        console.log("FETCHING NEW TOKEN")

        // TODO: Implement check if expired
        const request = await fetch("https://www.googleapis.com/oauth2/v4/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: settings?.google?.client_id,
                client_secret: settings?.google?.client_secret,
                refresh_token: settings?.google?.token?.refresh_token,
                grant_type: "refresh_token",
            }),
        });

        const data = await request.json();
        tokens["access_token"] = data.access_token;

        console.log("DATA", data)

        calendarApi.oauth2Client = new google.auth.OAuth2(
            settings?.google?.client_id,
            settings?.google?.client_secret,
            'postmessage'
        );
        await calendarApi.oauth2Client.setCredentials(tokens);
        calendarApi.calendar = google.calendar({version: 'v3', auth: calendarApi.oauth2Client});
        calendarApi.calendarId = settings?.google?.calendars?.appointments;
        calendarApi.settings = settings;
        return calendarApi;
    }

    // timeMin: (new Date()).toISOString(),
    // maxResults: 10,
    // singleEvents: true,
    // orderBy: 'startTime',
    async getEvents(options) {
        const events = await this.calendar.events.list({...options, calendarId: this.calendarId });
        return events.data.items;
    }

    // TODO: Not sure if we need to update time zone here, seems every event has it's own unique time zone
    async updateCalendar(options) {
        // console.log(this.calendar.settings)
        // return await this.calendar.settings.update(options);
    }

    async getCalendars() {
        return (await this.calendar.calendarList.list()).data.items;
    }

    async createCalendar(name) {
        const timeZone = this.settings?.address?.timezone;
        return (await this.calendar.calendars.insert({
            requestBody: {
                summary: name || "Full Schedule - MASTER",
                ...(timeZone && { timeZone })
            }
        })).data;
    }

//     $event = new Google_Service_Calendar_Event(array(
//         'summary' => 'Google I/O 2015',
//     'location' => '800 Howard St., San Francisco, CA 94103',
//     'description' => 'A chance to hear more about Google\'s developer products.',
//     'start' => array(
//     'dateTime' => '2015-05-28T09:00:00-07:00',
//     'timeZone' => 'America/Los_Angeles',
// ),
//     'end' => array(
//     'dateTime' => '2015-05-28T17:00:00-07:00',
//     'timeZone' => 'America/Los_Angeles',
// ),
//     'recurrence' => array(
//     'RRULE:FREQ=DAILY;COUNT=2'
// ),
//     'attendees' => array(
//         array('email' => 'lpage@example.com'),
//     array('email' => 'sbrin@example.com'),
// ),
//     'reminders' => array(
//     'useDefault' => FALSE,
//     'overrides' => array(
//         array('method' => 'email', 'minutes' => 24 * 60),
//     array('method' => 'popup', 'minutes' => 10),
// ),
// ),
// ));
    async postEvent(location, summary, description, startTime, endTime, attendees, extendedProperties) {
        const timeZone = this.settings?.address?.timezone;
        const res = await this.calendar.events.insert({
            calendarId: this.calendarId,
            resource: {
                summary, location, description, attendees: attendees || [],
                start: {
                    dateTime: startTime,
                    timeZone,
                },
                end: {
                    dateTime: endTime,
                    timeZone,
                },
                sendUpdates: "all",
                reminders: {
                    useDefault: false,
                    overrides: [
                        {method: 'email', minutes: 24 * 60},
                        {method: 'popup', minutes: 12 * 60},
                    ],
                },
                extendedProperties: {
                    private: extendedProperties
                }
            }
        });

        return res.data;
    }

    async deleteEvent(id, sendUpdates) {
        return await this.calendar.events.delete({
            calendarId: this.calendarId,
            eventId: id
        }, {
            sendUpdates
        });
    }

    async updateEvent(id, summary, description, startTime, endTime, sendUpdates) {
        const timeZone = this.settings?.address?.timezone;
        return await this.calendar.events.update({
            calendarId: this.calendarId,
            eventId: id,
            resource: {
                summary, description,
                start: {
                    dateTime: startTime,
                    timeZone,
                },
                end: {
                    dateTime: endTime,
                    timeZone,
                },
                sendUpdates
            }
        });
    }

}

