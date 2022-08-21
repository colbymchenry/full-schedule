import {progressBarStore} from "./stores.js";


export class ApiProgressBar {

    static start() {
        progressBarStore.set(true);
    }

    static stop() {
        progressBarStore.set(false);
    }


}