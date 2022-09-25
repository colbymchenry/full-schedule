import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    sendEmailVerification,
    deleteUser as deleteUserAccount,
    sendPasswordResetEmail
} from 'firebase/auth';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    getDocs,
    setDoc,
    serverTimestamp,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';
import {getStorage, ref, uploadBytes, deleteObject, listAll, getDownloadURL} from "firebase/storage";
import {getAnalytics} from "firebase/analytics";
import {browser} from "$app/env";
import {tokenStore} from "../../lib/stores.js";
import {get} from "svelte/store";

let firebaseApp;
let firebaseAnalytics;
let firebaseDb;
let firebaseAuth;
let firebaseStorage;

if (browser) {
    let fireBaseConf = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
    try {
        firebaseApp = initializeApp(fireBaseConf, "[DEFAULT]")
        firebaseAnalytics = getAnalytics(firebaseApp);
    } catch (error) {
        /*
         * We skip the "already exists" message which is
         * not an actual error when we're hot-reloading.
         */
        if (!/duplicate-app/u.test(error.message)) {
            console.error('Firebase initialization error', error.stack)
        }
    }

    firebaseDb = getFirestore(firebaseApp)
    firebaseAuth = getAuth();
    firebaseStorage = getStorage();
}

export class FirebaseClient {

    static passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    static db() {
        return firebaseDb;
    }

    static auth() {
        return firebaseAuth;
    }

    static storage() {
        return firebaseStorage;
    }

    static app() {
        return firebaseApp;
    }

    static toDate(timestamp) {
        if (!timestamp) return undefined;
        return timestamp["_seconds"] ? new Date(timestamp["_seconds"] * 1000) : new Date(timestamp.seconds * 1000);
    }

    static async uploadFile(fileData, path) {
        const storageRef = ref(firebaseStorage, path);
        await uploadBytes(storageRef, fileData);
        return await getDownloadURL(ref(firebaseStorage, path));
    }

    static async getFileURL(path) {
        return await getDownloadURL(ref(firebaseStorage, path));
    }

    static async deleteFile(path) {
        const fileRef = ref(firebaseStorage, path);
        return await deleteObject(fileRef);
    }

    static async listFiles(path) {
        const listRef = ref(firebaseStorage, path);
        const res = await listAll(listRef);
        return res.items;
    }

    static getIdToken() {
        const token = get(tokenStore);

        // Grab a new token and store it.
        setTimeout(async () => {
            if (firebaseAuth?.currentUser) {
                const newToken = await firebaseAuth.currentUser.getIdToken();
                tokenStore.set(newToken);
                localStorage.setItem("token", newToken)
            };
        }, 1500);

        // If no token is stored
        if (!token) {
            // Fetch a new token and write it to the store
            if (localStorage.getItem("token")) {
                return localStorage.getItem("token");
            }
        }

        return token;
    }

    static async createUser(email, password) {
        return await createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    static async deleteUser(user) {
        return await deleteUserAccount(user);
    }

    static async updateUser(user, data, email, password) {
        if (browser) {
            if (email) {
                await updateEmail(user, email);
            }
            if (password) {
                await updatePassword(user, password);
            }
            await updateProfile(user, data);
        }
    }

    static async sendVerificationEmail(user) {
        return await sendEmailVerification(user);
    }

    static async sendPasswordResetEmail(email) {
        return await sendPasswordResetEmail(firebaseAuth, email);
    }

    static async signOut() {
        return await signOut(firebaseAuth);
    }

    static async signIn(email, password) {
        return await signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    static async collection(collectionName) {
        if (browser) {
            const querySnapshot = await getDocs(query(collection(firebaseDb, collectionName)));
            let result = []
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), doc_id: doc.id})
            });
            return result;
        }
    }

    static async query(collectionName, ...where) {
        if (browser) {
            const q = query(collection(firebaseDb, collectionName), ...where);
            const querySnapshot = await getDocs(q);
            let result = []
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), doc_id: doc.id})
            });
            return result;
        }

        return undefined;
    }

    static async queryAdv(q) {
        if (browser) {
            const querySnapshot = await getDocs(q);
            let result = []
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), doc_id: doc.id})
            });
            return result;
        }

        return undefined;
    }

    static async getSnapshot(q) {
        if (browser) {
            const querySnapshot = await getDocs(q);
            let result = []
            querySnapshot.forEach((doc) => {
                result.push({doc_id: doc.id})
            });
            return result;
        }

        return undefined;
    }

    static async doc(collectionName, docId) {
        if (browser) {
            const docRef = doc(firebaseDb, collectionName, docId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return {...docSnap.data(), doc_id: docId};
            }
        }

        return undefined;
    }

    static async set(collectionName, docId, data) {
        if (browser) {
            removeUndefined(data);
            delete data['doc_id']
            await setDoc(doc(firebaseDb, collectionName, docId), data);
            await updateDoc(doc(firebaseDb, collectionName, docId), {
                created_at: serverTimestamp(),
                updated_at: serverTimestamp()
            });
            return await this.doc(collectionName, docId);
        }

        return undefined;
    }

    static async add(collectionName, data) {
        if (browser) {
            removeUndefined(data);
            delete data['doc_id']
            let docRef = await addDoc(collection(firebaseDb, collectionName), data);

            await updateDoc(doc(firebaseDb, collectionName, docRef.id), {
                created_at: serverTimestamp()
            });
            return await this.doc(collectionName, docRef.id);
        }

        return undefined;
    }

    static async update(collectionName, docId, data) {
        if (browser) {
            try {
                removeUndefined(data);
                await updateDoc(doc(firebaseDb, collectionName, docId), {...data, updated_at: serverTimestamp()});
                return await this.doc(collectionName, docId);
            } catch (e) {
                return await this.set(collectionName, docId, data);
            }

        }

        return undefined;
    }

    static async delete(collectionName, docId) {
        return await deleteDoc(doc(firebaseDb, collectionName, docId));
    }
}

function removeUndefined(obj) {
    Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {})
}
