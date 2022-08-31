export class Env {
    static get(key) {
        if (process.env.NODE_ENV === 'production') {
            // For production
           return process.env[key];
        } else {
            // For development
            return import.meta.env[key];
        }
    }
}