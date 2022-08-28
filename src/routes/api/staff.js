import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";

export async function post({request}) {

    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

    const data = await request.json();

    try {
        const user = await FirebaseAdmin.auth().createUser({
            email: data.email.toLowerCase(),
            emailVerified: true,
            password: data.password,
            displayName: data.displayName,
            phoneNumber: data.phoneNumber,
            disabled: false
        });

        const staffAccount = await FirebaseAdmin.firestore().collection("staff").add({
            address: data.address,
            birthday: data.birthday,
            notes: data.notes,
            title: data.title,
            uid: user.uid
        });

        return {
            status: 200,
            body: { user, staffAccount: (await FirebaseAdmin.firestore().collection("staff").doc(staffAccount.id).get()).data() }
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