export class FormHelper {
    static getFormData(form) {
        const setValue = (object, path, value) => {
            path = path.replace(/[\[]/gm, '.').replace(/[\]]/gm, ''); //to accept [index]
            let keys = path.split('.'),
                last = keys.pop();

            keys.reduce(function (o, k) {
                return o[k] = o[k] || {};
            }, object)[last] = value;
        }

        const formData = new FormData(form);

        let data = {};

        for (let field of formData) {
            const [key, value] = field;
            setValue(data, key, value);
        }

        return data;
    }

}

