import {FirebaseClient} from "./firebase/FirebaseClient.js";

// TODO: Errors not catching with try catch
export class Api {

    static async get(url, headers) {
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers || {
                ...(!headers?.token ? { 'authorization': await FirebaseClient.getIdToken() } : { 'token': headers["token"] }),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    static async delete(url, headers) {
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers || {
                ...(!headers?.token ? { 'authorization': await FirebaseClient.getIdToken() } : { 'token': headers["token"] }),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    static async post(url, data = {}, headers) {
        // clean up masked phone number
        if (data["phoneNumber"]) {
            data["phoneNumber"] = "+1" + data["phoneNumber"].replace('+1', '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '');
            if (data["phoneNumber"].length < 3) delete data["phoneNumber"]
        }
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                ...(!headers?.token ? { 'authorization': await FirebaseClient.getIdToken() } : { 'token': headers["token"] }),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }


    static async patch(url, data = {}, headers) {
        // clean up masked phone number
        if (data["phoneNumber"]) {
            data["phoneNumber"] = "+1" + data["phoneNumber"].replace('+1', '').replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '');
            if (data["phoneNumber"].length < 3) delete data["phoneNumber"]
        }
        const response = await fetch(url, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers || {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(!headers?.token ? { 'authorization': await FirebaseClient.getIdToken() } : { 'token': headers["token"] }),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

}