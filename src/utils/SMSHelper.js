import twilio from "twilio";
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

}