import {FirebaseAdmin} from "../../../utils/firebase/FirebaseAdmin.js";
import {CloudinaryApi} from "../../../utils/CloudinaryApi.js";

export async function post({request, url}) {
    try {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

        const user = await FirebaseAdmin.auth().getUser(url.searchParams.get("uid"));

        if (user?.photoURL) {
            await CloudinaryApi.delete(CloudinaryApi.getFileNameFromURL(user.photoURL));
        }

        await FirebaseAdmin.auth().deleteUser(url.searchParams.get("uid"))
        await FirebaseAdmin.firestore().collection("clients").doc(url.searchParams.get("uid")).delete();

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