import {writable} from "svelte/store";
import {JsonHelper} from "../utils/jsonhelper.js";

export const navStore = writable(true);
export const auth = writable(null);
export const progressBarStore = writable(false);
export const settings = writable(new JsonHelper({}));