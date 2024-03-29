import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";

export async function get({request, url}) {
    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));
    const ids = url.searchParams.get("ids").includes(",") ? url.searchParams.get("ids").split(",").filter((id) => id) : [url.searchParams.get("ids")];
    const users = await FirebaseAdmin.auth().getUsers(ids.map((uid) => {
        return {uid}
    }));
    return {
        status: 200,
        body: users
    }
}

export async function patch({request}) {
    try {
        await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

        const res = await request.json();

        await FirebaseAdmin.auth().updateUser(res.uid, res);

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