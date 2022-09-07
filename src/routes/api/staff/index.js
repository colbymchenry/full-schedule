import {FirebaseAdmin} from "../../../utils/firebase/FirebaseAdmin.js";

export async function patch({request, url}) {
    try {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

        const res = await request.json();

        await FirebaseAdmin.auth().updateUser(url.searchParams.get("uid"), {
            ...(res?.photoURL && { photoURL: res.photoURL }),
            ...(res?.displayName && { displayName: res.displayName }),
            ...(res?.phoneNumber && { phoneNumber: res.phoneNumber }),
            ...(res?.email && { email: res.email }),
            ...(res?.disabled && { disabled: res.disabled }),
        });

        delete res['photoURL']
        res['displayName'] = res['displayName'].toLowerCase();
        res['email'] = res['email'].toLowerCase();
        delete res['phoneNumber']
        delete res['disabled']

        await FirebaseAdmin.firestore().collection("staff").doc(url.searchParams.get("uid")).update(res);

        return {status: 200}
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

        await FirebaseAdmin.firestore().collection("staff").doc(user.uid).set({
            address: data.address,
            birthday: data.birthday,
            notes: data.notes,
            title: data.title,
            uid: user.uid,
            email: data.email.toLowerCase(),
            phoneNumber: data.phoneNumber,
            displayName: data.displayName.toLowerCase()
        });

        return {
            status: 200,
            body: { user, staffAccount: (await FirebaseAdmin.firestore().collection("staff").doc(user.uid).get()).data() }
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
