import twilio from "twilio";
import {instance} from "textmagic-client/src/ApiClient";
import TextMagicApi from "textmagic-client/src/api/TextMagicApi";
import {FirebaseAdmin} from "./firebase/FirebaseAdmin.js";

export class SMSHelper {

    static async sendText(phone, message) {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();
        const client = twilio(settings?.twilio?.sid, settings?.twilio?.token);
        return await client.messages.create({body: message, from: settings?.twilio?.number, to: phone})
    }

    static async scheduleText(to, body, sendAt) {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data()
        const client = twilio(settings?.twilio?.sid, settings?.twilio?.token);
        return await client.messages.create({
            messagingServiceSid: settings?.twilio?.msid,
            body,
            sendAt,
            scheduleType: 'fixed',
            to
        })
    }

    static async cancelText(sid) {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data()
        const client = twilio(settings?.twilio?.sid, settings?.twilio?.token);
        return await client.messages(sid).update({status: 'canceled'})
    }

    static async getMagicInstance() {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data()
        const client = instance;
        const auth = client.authentications['BasicAuth'];
        auth.username = settings?.textmagic?.username;
        auth.password = settings?.textmagic?.apikey;
        return new TextMagicApi();
    }

}