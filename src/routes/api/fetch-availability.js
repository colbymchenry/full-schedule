import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";
import {JsonHelper} from "../../utils/JsonHelper.js";
import {AppointmentHelper} from "../../utils/AppointmentHelper.js";
import {TimeHelper} from "../../utils/TimeHelper.js";

export async function post({request}) {

    const payload = await request.json();

    try {
        const settings = new JsonHelper(await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data());

        // Make sure if only one service is selected it is passed as an array
        if (typeof payload.services === 'string') payload["services"] = [payload["services"]];

        const services = await Promise.all(payload.services.map(async (docId) => {
            return await (await FirebaseAdmin.firestore().collection("services").doc(docId).get()).data();
        }))

        // Get all staff availability
        const staff = await FirebaseAdmin.getCollectionArray("staff");

        // Hold an object of time slots available
        const timeSlots = {};

        // TODO: Get all staff and render
        await Promise.all(staff.map(async (staffObj) => {
            // We pass in the appointments object and settings object to prevent calling too many querys to the Firestore DB
            let appointments = await FirebaseAdmin.query(FirebaseAdmin.firestore().collection("appointments").where("staff", "==", staffObj.doc_id));
            for (let hour = 4; hour <= 20; hour += 0.25) {
                let isAvailable = await AppointmentHelper.isAvailable(payload.date, TimeHelper.sliderValTo24(hour), services, staffObj, settings, appointments);
                // If there is no status returned then it's a valid time slot
                if (!isAvailable?.status) {
                    if (!timeSlots[staffObj.doc_id]) {
                        timeSlots[staffObj.doc_id] = staffObj;
                        timeSlots[staffObj.doc_id]["availability"] = [TimeHelper.sliderValTo24(hour)];
                    } else {
                        timeSlots[staffObj.doc_id]["availability"] = [...timeSlots[staffObj.doc_id]["availability"], TimeHelper.sliderValTo24(hour)];
                    }
                }
            }
        }));

        return {
            status: 200,
            body: { timeSlots }
        }

    } catch (error) {
        console.error(error)
        return {
            status: 400,
            body: { error: true }
        }
    }
}