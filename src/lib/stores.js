import {writable} from "svelte/store";

export const navStore = writable(true);
export const authStore = writable(null);
export const progressBarStore = writable(false);
