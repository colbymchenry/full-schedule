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

        // TODO: Delete Cloudinary old image
        /*
        cloudinary.v2.api.delete_resources([photo.public_id], (result) => {
      console.log(result)
    });
         */

        const res = await request.json();

        await FirebaseAdmin.auth().updateUser(res.uid, res);

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