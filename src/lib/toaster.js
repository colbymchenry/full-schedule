import {get} from "svelte/store";
import {toasts} from "./stores.js";

export class Toaster {
    static push(component) {
        const toast = get(toasts);
        toast.set((prev) => [...prev, component])
    }

    static pop() {
        const toast = get(toasts);
        toast.set((prev) => prev.length ? prev.slice(0, prev.length - 1) : []);
    }
}