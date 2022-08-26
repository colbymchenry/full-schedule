
export class JsonHelper {

    constructor(object) {
        this.object = object;
    }

     get(path) {
        path = path.replace(/[\[]/gm, '.').replace(/[\]]/gm, ''); //to accept [index]
        let keys = path.split('.'),
            last = keys.pop();

        return keys.reduce(function (o, k) { return o[k] = o[k] || {}; }, this.object)[last];
    }

     set(path, value) {
        path = path.replace(/[\[]/gm, '.').replace(/[\]]/gm, ''); //to accept [index]
        let keys = path.split('.'),
            last = keys.pop();

        keys.reduce(function (o, k) { return o[k] = o[k] || {}; }, this.object)[last] = value;
    }

}