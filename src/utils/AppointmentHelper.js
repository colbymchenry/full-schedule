import {GoogleCalendarAPI} from "./GoogleCalendarAPI.js";
import {TimeHelper} from "./TimeHelper.js";

export class AppointmentHelper {

    static async isAvailable(date, timestamp, services, staff) {
        const weekday = date ? new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).split(",")[0].toLowerCase() : null;

        const startDate = new Date(date);
        const [hour, minute] = timestamp.split(":");
        startDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
        // Add up service durations to get accurate endTime
        const endDate = new Date(date);
        endDate.setHours(parseInt(hour), parseInt(minute), 0, 0);

        let totalMinutes = 0;
        services.forEach(({duration}) => totalMinutes += duration ? parseInt(duration) : 30);
        const addedHours = Math.floor(totalMinutes / 60);
        const addedMinutes = totalMinutes % 60;
        endDate.setHours(endDate.getHours() + addedHours, endDate.getMinutes() + addedMinutes, 0);

        // Get a new Google Calendar API instance
        const calendarApi = await GoogleCalendarAPI.getInstance();

        // Get events at time & date
        const events = await calendarApi.getEvents({
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            singleEvents: true,
            orderBy: 'startTime'
        })

        // Check to see if the staff is available at that time
        const notWorking = !staff?.schedule?.[weekday]?.enabled;
        const onLunch = () => {
            if (!staff?.schedule?.[weekday]?.lunch?.start || !staff?.schedule?.[weekday]?.lunch?.end) return false;
            let lunchStart = TimeHelper.getSliderValFrom24(staff.schedule[weekday].lunch.start);
            let lunchEnd = TimeHelper.getSliderValFrom24(staff.schedule[weekday].lunch.end);
            let currentVal = TimeHelper.getSliderValFrom24(timestamp);
            return lunchStart <= currentVal && lunchEnd >= currentVal;
        }

        if (notWorking || onLunch()) {
            return {
                status: 400,
                body: {
                    message: "Staff not available.",
                    code: 2
                }
            }
        }

        // Check to see if staff is already scheduled at that time
        if (events.filter((gEvent) => gEvent?.extendedProperties?.private?.staff === staff.doc_id).length) {
            return {
                status: 400,
                body: {
                    message: "Staff already scheduled.",
                    code: 1
                }
            }
        }

        return { startDate, endDate };
    }

}