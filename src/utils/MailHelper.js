import axios from "axios";
import {FirebaseAdmin} from "./firebase/FirebaseAdmin.js";

const endpoint = `https://api.sendinblue.com/v3/`;

export class MailHelper {
    static async send(sender, to, html) {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();
        try {
            const res = await axios.post(endpoint + "smtp/email", {
                sender, to,
                "htmlContent": "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
            }, {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "api-key": settings?.sendinblue?.api_key
                }
            });
            console.log(res)
        } catch (error) {
            console.error(error);
        }
    }

}