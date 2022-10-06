import {TimeHelper} from "./TimeHelper.js";
import {FirebaseAdmin} from "./firebase/FirebaseAdmin.js";
import {JsonHelper} from "./JsonHelper.js";

export class AppointmentHelper {

    static async isAvailable(date, timestamp, services, staff, settings, appointments, blockedTime) {
        if (!settings) {
            settings = new JsonHelper(await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data());
        }

        if (!blockedTime) {
            blockedTime = await FirebaseAdmin.getCollectionArray("blocked_time");
        }

        const weekday = date ? new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...(settings.get("address.timezone") && { timeZone: settings.get("address.timezone") })
        }).split(",")[0].toLowerCase() : null;

        // Check to see if the staff is available at that time
        const notWorking = staff?.schedule?.[weekday]?.enabled === false || staff?.schedule?.[weekday]?.enabled === "";
        const onLunch = () => {
            if (!staff?.schedule?.[weekday]?.lunch?.start || !staff?.schedule?.[weekday]?.lunch?.end) return false;
            let lunchStart = TimeHelper.getSliderValFrom24(staff.schedule[weekday].lunch.start);
            let lunchEnd = TimeHelper.getSliderValFrom24(staff.schedule[weekday].lunch.end);
            let currentVal = TimeHelper.getSliderValFrom24(timestamp);
            return lunchStart <= currentVal && lunchEnd >= currentVal;
        }

        const isBlockedTime = () => {
            return blockedTime ?  blockedTime.filter((block) => new Date(date).getDate() === FirebaseAdmin.toDate(block.date).getDate() && block.staff === staff.doc_id).length : false;
        }

        if (notWorking || onLunch() || isBlockedTime()) {
            return {
                status: 400,
                body: {
                    message: "Staff not available.",
                    code: 2
                }
            }
        }

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

        // Get events at time & date, will need to make this more efficient
        if (!appointments) {
            appointments = await FirebaseAdmin.query(FirebaseAdmin.firestore().collection("appointments").where("staff", "==", staff.doc_id).where("cancelled", "!=", true));
        }

        // Check to see if staff is already scheduled at that time
        if (appointments.filter((app) => {
            const appStart = FirebaseAdmin.toDate(app.start);
            const appEnd = FirebaseAdmin.toDate(app.end);
            return (appStart < endDate) && (appEnd >= startDate);
        }).length) {
            return {
                status: 400,
                body: {
                    message: "Conflicts with provider's schedule.",
                    code: 1
                }
            }
        }

        return { startDate, endDate };
    }

}