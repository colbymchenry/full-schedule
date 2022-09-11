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
            // take into account multiple select
            if (data[key]) {
                if (typeof data[key] === 'string') {
                   setValue(data, key, [data[key], value])
                } else if (Array.isArray(data[key])) {
                    setValue(data, key, [...data[key], value])
                } else {
                    setValue(data, key, value === "false" || value === "true" ? value === "true" : value);
                }
            } else {
                setValue(data, key, value === "false" || value === "true" ? value === "true" : value);
            }
        }

        return data;
    }

}

