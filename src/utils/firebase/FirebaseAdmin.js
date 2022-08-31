import admin from 'firebase-admin';

try {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(import.meta.env.ADMIN_FIREBASE_CONFIG)),
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

    static async getCollectionArray(collection) {
        const querySnapshot = await FirebaseAdmin.firestore().collection(collection).get();
        let result = []
        querySnapshot.forEach((doc) => {
            result.push({...doc.data(), doc_id: doc.id})
        });
        return result;
    }

}

