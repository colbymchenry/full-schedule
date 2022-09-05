import {FirebaseAdmin} from "../../../utils/firebase/FirebaseAdmin.js";

export async function post({request, url}) {
    try {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
        await FirebaseAdmin.auth().deleteUser(url.searchParams.get("uid"))
        await FirebaseAdmin.firestore().collection("staff").doc(url.searchParams.get("uid")).delete();

        return {
            status: 200
        }
    } catch (error) {
        if (error?.code ) {
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