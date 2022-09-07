import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";

export async function get({request, url}) {
    try {
        if (url.searchParams.get("store")) {
            const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();

            delete settings["clover"];
            delete settings["google"];
            delete settings["twilio"];
            delete settings["textmagic"];
            delete settings["email"];
            delete settings["created_at"];
            delete settings["updated_at"];
            return {
                status: 200,
                body: settings
            }
        } else if (url.searchParams.get("services")) {
            const services = await FirebaseAdmin.getCollectionArray("services");

            return {
                status: 200,
                body: services.filter((service) => service?.active)
            }
        }
    } catch (error) {
        return {
            status: 400,
            body: { error: true }
        }
    }
}