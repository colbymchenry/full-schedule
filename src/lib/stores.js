import {writable} from "svelte/store";
import {JsonHelper} from "../utils/JsonHelper.js";

// used to hold the state of the navigation being open or closed
export const navStore = writable(true);
// used to hold the authenticated user for Firebase
export const auth = writable(null);
// used to hold the state of the progress bar being visible or not
export const progressBarStore = writable(false);
// holds the settings for this store
export const settings = writable(new JsonHelper({}));
// hold the choices made during the booking process
export const bookingStore = writable(new JsonHelper({}));
