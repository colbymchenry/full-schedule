import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";

export async function get({request, url}) {
    try {
        if (url.searchParams.get("store")) {
            const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();

            let staffAccounts = await FirebaseAdmin.getCollectionArray("staff");
            // Filter out staff with no schedules
            staffAccounts = staffAccounts.filter((staff) => staff?.schedule &&
                Object.values(staff.schedule).filter((day) => day.enabled === true && day?.day?.start && day?.day?.end).length);


            if (!staffAccounts.length) {
                return {
                    status: 400,
                    body: { error: true }
                }
            }

            delete settings["clover"];
            delete settings["google"];
            delete settings["sendinblue"];
            delete settings["textmagic"];
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