import admin from 'firebase-admin';
import {config} from "dotenv";

config()

try {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.ADMIN_FIREBASE_CONFIG)),
    })

    admin.firestore().settings({
        timestampsInSnapshots: true,
        ignoreUndefinedProperties: true
    })
} catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack)
    }
}

export class FirebaseAdmin {


    static passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    static firestore() {
        return admin.firestore();
    }

    static serverTimestamp() {
        return admin.firestore.FieldValue.serverTimestamp();
    }

    static auth() {
        return admin.auth();
    }

    static toTimestamp(date) {
        return admin.firestore.Timestamp.fromDate(new Date(date));
    }

    static toDate(timestamp) {
        return new Date(timestamp.seconds*1000);
    }

    static async getCollectionArray(collection) {
        const querySnapshot = await FirebaseAdmin.firestore().collection(collection).get();
        let result = []
        querySnapshot.forEach((doc) => {
            result.push({...doc.data(), doc_id: doc.id})
        });
        return result;
    }

    static async query(q) {
        let snapshot = await q.get();
        let results = [];
        snapshot.forEach((doc) => {
            results.push({...doc.data(), doc_id: doc.id});
        })
        return results;
    }

}

