import {config} from "dotenv";

config()
export class Recaptcha {
    static async verifyToken(request) {
        // If we are in production mode we need to verify their Google Recaptcha Key
        if (process.env.ENV !== "DEV") {
            if (!request.headers.get("token")) {
                return {
                    status: 400,
                    body: {
                        message: "Recaptcha failed."
                    }
                }
            }

            let res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: `secret=${process.env.GCAPTCHA_KEY}&response=${request.headers.get("token")}`,
            })

            res = await res.json();

            if (!res?.success) {
                return {
                    status: 400,
                    body: {
                        message: "Recaptcha failed."
                    }
                }
            }
        }

        return false;
    }
}