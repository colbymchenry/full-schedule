import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";

export async function post({request}) {

    const payload = await request.json();

    try {
        const weekday = payload?.date ? new Date(payload.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).split(",")[0].toLowerCase() : null;

        // Make sure if only one service is selected it is passed as an array
        if (typeof payload.services === 'string') payload["services"] = [payload["services"]];

        const services = await Promise.all(payload.services.map(async (docId) => {
            return await (await FirebaseAdmin.firestore().collection("services").doc(docId).get()).data();
        }));

    } catch (error) {
        return {
            status: 400,
            body: { error: true }
        }
    }
}