export const FIREBASE_CONFIG = process.env.PUBLIC_FIREBASE_CONFIG;
export const ADMIN_FIREBASE_CONFIG = import.meta.env.VITE_ADMIN_FIREBASE_CONFIG;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

export class Env {
    static getValue(key) {
        if (process.env.NODE_ENV === 'production') {
            // For production
           return process.env[key];
        } else {
            // For development
            return import.meta.env[key];
        }
    }
}