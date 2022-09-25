import {config} from "dotenv";
import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";
import {JsonHelper} from "../../utils/JsonHelper.js";
import {AppointmentHelper} from "../../utils/AppointmentHelper.js";
import {TimeHelper} from "../../utils/TimeHelper.js";
import {Recaptcha} from "../../utils/Recaptcha.js";
config()


export async function post({request}) {

    // TODO: This may not be best method, should maybe ban IP abuse rather than checking token for GET requests (yes this is POST but it's fetching info)
    const verify = await Recaptcha.verifyToken(request);
    if (verify) return verify;

    const payload = await request.json();

    try {
        const settings = new JsonHelper(await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data());

        // Make sure if only one service is selected it is passed as an array
        if (typeof payload.services === 'string') payload["services"] = [payload["services"]];

        const services = await Promise.all(payload.services.map(async (docId) => {
            return await (await FirebaseAdmin.firestore().collection("services").doc(docId).get()).data();
        }))

        // Get all staff availability
        let staff = await FirebaseAdmin.getCollectionArray("staff");
        // Remove staff with no schedule
        staff = staff.filter((staffObj) => {
            if (staffObj["schedule"]) {
                if (staffObj["schedule"]?.sunday?.enabled || staffObj["schedule"]?.monday?.enabled
                    || staffObj["schedule"]?.tuesday?.enabled || staffObj["schedule"]?.wednesday?.enabled
                    || staffObj["schedule"]?.thursday?.enabled || staffObj["schedule"]?.friday?.enabled
                    || staffObj["schedule"]?.saturday?.enabled) {
                    return true;
                }
            }

            return false;
        })

        // Hold an object of time slots available
        const timeSlots = {};

        // Initialize timeslots object with photoURLs
        staff.forEach((staffObj) => {
            if (!timeSlots[staffObj.doc_id]) {
                timeSlots[staffObj.doc_id] = staffObj;
                timeSlots[staffObj.doc_id]["availability"] = [];
                if (staffObj["photoURL"])
                    timeSlots[staffObj.doc_id]["photoURL"] = staffObj["photoURL"];
                if (staffObj["schedule"])
                    timeSlots[staffObj.doc_id]["schedule"] = staffObj["schedule"];
            }
        })

        await Promise.all(staff.map(async (staffObj) => {
            // We pass in the appointments object and settings object to prevent calling too many querys to the Firestore DB
            let appointments = await FirebaseAdmin.query(FirebaseAdmin.firestore().collection("appointments").where("staff", "==", staffObj.doc_id));
            for (let hour = 4; hour <= 20; hour += 0.25) {
                let isAvailable = await AppointmentHelper.isAvailable(payload.date, TimeHelper.sliderValTo24(hour), services, staffObj, settings, appointments);
                // If there is no status returned then it's a valid time slot
                if (!isAvailable?.status) {
                    timeSlots[staffObj.doc_id]["availability"] = [...timeSlots[staffObj.doc_id]["availability"], TimeHelper.sliderValTo24(hour)];
                }
            }

            // If there was no availability for the staff, we need to find the next available date
            let dayShift = 1;
            while (!timeSlots[staffObj.doc_id]["availability"].length) {
                let date = new Date(payload.date);
                date.setDate(date.getDate() + dayShift);
                dayShift += 1;
                for (let hour = 4; hour <= 20; hour += 0.25) {
                    let isAvailable = await AppointmentHelper.isAvailable(date, TimeHelper.sliderValTo24(hour), services, staffObj, settings, appointments);
                    // If there is no status returned then it's a valid time slot
                    if (!isAvailable?.status) {
                        timeSlots[staffObj.doc_id]["availability"] = [date];
                    }
                }

                if (dayShift > 90) {
                    timeSlots[staffObj.doc_id]["availability"] = ["none"]
                }
            }
        }));


        return {
            status: 200,
            body: {timeSlots}
        }

    } catch (error) {
        console.error(error)
        return {
            status: 400,
            body: {error: true}
        }
    }
}