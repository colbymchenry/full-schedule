import axios from "axios";
import {FirebaseAdmin} from "./firebase/FirebaseAdmin.js";

const endpoint = `https://api.sendinblue.com/v3/`;

export class MailHelper {
    static async send(sender, to, subject, html) {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();
        try {
            const res = await axios.post(endpoint + "smtp/email", {
                sender, to, subject,
                "htmlContent": html
            }, {
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "api-key": settings?.sendinblue?.api_key
                }
            });
            return res.data.messageId;
        } catch (error) {
            console.error(error);
        }
    }

}