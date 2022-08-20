// export async function get() {
//     return {
//         status: 200,
//         body: {
//             message: "Hello"
//         }
//     }
// }


import {FirebaseAdmin} from "../../../utils/firebase/FirebaseAdmin.js";

export async function patch({request}) {
    try {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

        const res = await request.json();

        await FirebaseAdmin.auth().updateUser(res.uid, {
            photoURL: res.photoURL
        });

        return { status: 200 }
    } catch (error) {
        console.error(error);
        if (error?.code ) {
            return {
                status: 400,
                body: {
                    cody: error.code,
                    message: error.message
                }
            }
        } else {
            return {
                status: 500
            }
        }
    }
}