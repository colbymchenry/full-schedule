import {google} from "googleapis";
import {FirebaseAdmin} from "../../utils/firebase/FirebaseAdmin.js";
import {Env} from "../../lib/env.js";

export async function post({request}) {

    await FirebaseAdmin.auth().verifyIdToken(request.headers.get("authorization"));

    const res = await request.json();

    const oauth2Client = new google.auth.OAuth2(
        Env.get("GOOGLE_CLIENT_ID"),
        Env.get("GOOGLE_CLIENT_SECRET"),
        res.baseUrl + '/settings/api'
    );

    if (res["code"]) {
        try {
            let {tokens} = await oauth2Client.getToken(res["code"]);
            return {
                status: 200,
                body: tokens
            }
        } catch (error) {
            console.error(error)
        }
    }

    const scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
    ];

    // Generate a url that asks permissions
    const authorizationUrl = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',

        /** Pass in the scopes array defined above.
         * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
        scope: scopes,
        // Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes: true
    });

    return {
        status: 200,
        body: authorizationUrl
    }
}

