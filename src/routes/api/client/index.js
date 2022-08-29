import {FirebaseAdmin} from "../../../utils/firebase/FirebaseAdmin.js";
import {CloudinaryApi} from "../../../utils/CloudinaryApi.js";

export async function patch({request, url}) {
    try {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

        const res = await request.json();

        const user = await FirebaseAdmin.auth().getUser(url.searchParams.get("uid"));
        if (user?.photoURL) {
            await CloudinaryApi.delete(CloudinaryApi.getFileNameFromURL(user.photoURL));
        }

        await FirebaseAdmin.auth().updateUser(url.searchParams.get("uid"), {
            ...(res?.photoURL && { photoURL: res.photoURL }),
            ...(res?.displayName && { displayName: res.displayName }),
            ...(res?.phoneNumber && { phoneNumber: res.phoneNumber }),
            ...(res?.email && { email: res.email }),
            ...(res?.disabled && { disabled: res.disabled }),
        });

        delete res['photoURL']
        delete res['displayName']
        delete res['phoneNumber']
        delete res['email']
        delete res['disabled']

        await FirebaseAdmin.firestore().collection("clients").doc(url.searchParams.get("uid")).update(res);

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

        await FirebaseAdmin.firestore().collection("clients").doc(user.uid).set({
            address: data.address,
            birthday: data.birthday,
            notes: data.notes,
            title: data.title,
            uid: user.uid
        });

        return {
            status: 200,
            body: { user, staffAccount: (await FirebaseAdmin.firestore().collection("clients").doc(user.uid).get()).data() }
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

export async function DELETE({request, url}) {
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