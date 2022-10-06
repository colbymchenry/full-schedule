import {instance} from "textmagic-client/src/ApiClient.js";
import TextMagicApi from "textmagic-client/src/api/TextMagicApi.js";
import {FirebaseAdmin} from "./firebase/FirebaseAdmin.js";
import {StringUtils} from "./StringUtils.js";


function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

export class SMSHelper {

    static async getMagicInstance() {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data()
        const client = instance;
        const auth = client.authentications['BasicAuth'];
        auth.username = settings?.textmagic?.username;
        auth.password = settings?.textmagic?.apikey;
        return new TextMagicApi();
    }

    static async sendMagicMessage(number, message) {
        return await (await SMSHelper.getMagicInstance()).sendMessage({
            phones: number,
            text: message
        })
    }

    static async setAppointmentCancellation(appointment, number, staff) {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();
        const dateHuman = FirebaseAdmin.toDate(appointment.start).toLocaleTimeString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            ...(settings?.address?.timezone && { timeZone: settings.address.timezone })
        }).replace(/^(.+?,.+?),\s*/g,'$1 @ ');
        const textBody = `\n\nYour appointment on\n\n${dateHuman}${staff?.displayName ? ` with ${StringUtils.capitalize(staff.displayName)}` : ""} was cancelled.`;

        const textMagic = await SMSHelper.getMagicInstance();

        // Send text message NOW
        await textMagic.sendMessage({
            text: textBody,
            phones: number,
        });
    }

    static async sendAppointmentConfirmation(appointment, number, staff, update) {
        const settings = await (await FirebaseAdmin.firestore().collection("settings").doc("main").get()).data();
        const dateHuman = FirebaseAdmin.toDate(appointment.start).toLocaleTimeString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            ...(settings?.address?.timezone && { timeZone: settings.address.timezone })
        }).replace(/^(.+?,.+?),\s*/g,'$1 @ ');
        const textBody = `\n\nYour appointment on\n\n${dateHuman}${staff?.displayName ? ` with ${StringUtils.capitalize(staff.displayName)}` : ""} ${update ? "was updated" : "is scheduled"}.\n\nAddress:\n${settings?.address?.street1 && settings.address.street1 + "\n"}${settings?.address?.street2 && settings?.address?.street2 + "\n"}${settings?.address?.city && settings?.address?.city + ", "}${settings?.address?.state && settings?.address?.state} ${settings?.address?.zip && settings?.address?.zip}\n\nThanks for choosing ${settings?.store?.name}! We look forward to seeing you!`;
        const reminderDate = FirebaseAdmin.toDate(appointment.start);
        // Send reminder text at 8:30 AM
        reminderDate.setHours(8, 0, 30);

        const textMagic = await SMSHelper.getMagicInstance();

        // Send text message NOW
        await textMagic.sendMessage({
            text: textBody,
            phones: number,
        });

        // Schedule reminder text message
        const resp = await textMagic.sendMessage({
            text: textBody,
            phones: number,
            sendingDateTime: formatDate(reminderDate),
            ...(settings?.address?.timezone && { sendingTimeZone: settings.address.timezone })
        });
        try {
            // Update appointment to include the Scheduled Text ID, so we can cancel the scheduled text later
            // if appointment is cancelled
            if (appointment?.doc_id) {
                if (appointment?.TextMagicReminderId) {
                    textMagic.deleteScheduledMessage(appointment.TextMagicReminderId);
                }
                await FirebaseAdmin.firestore().collection("appointments").doc(appointment.doc_id).update({
                    "TextMagicReminderId": resp.scheduleId
                })
            }
        } catch (error) {
            console.error(error);
        }

        return resp.scheduleId;
    }



}