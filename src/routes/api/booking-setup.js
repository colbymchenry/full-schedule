import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";

export async function get() {

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
}