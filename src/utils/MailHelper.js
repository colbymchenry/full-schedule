import nodemailer from "nodemailer";

let transporter;

try {
    transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: '465',
        auth: {
            user: 'noreply@fullschedule.co',
            pass: '90Percent%'
        },
        secure: true,
        pool: true
    })
} catch (error) {

}

export class MailHelper {
    // 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
    static async send(to, subject, html) {
        await transporter.sendMail({
            from: '"Balanced Aesthetics Medspa" <noreply@fullschedule.co>',
            to,
            subject,
            html
        });
    }

}