import {config} from "dotenv";
import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";
import {Recaptcha} from "../../utils/Recaptcha.js";
config()

export async function post({request, url}) {
    const verify = await Recaptcha.verifyToken(request);
    if (verify) return verify;


    try {
        const payload = await request.json();
        let lead = await FirebaseAdmin.firestore().collection("leads").add(payload);
        return {
            status: 200,
            body: {
                lead: lead.id
            }
        }
    } catch (error) {
        if (error?.code) {
            return {
                status: 400,
                body: {
                    code: error.code,
                    message: error.message
                }
            }
        } else {
            console.error(error);
            return {
                status: 500
            }
        }
    }
}