export class StringUtils {

    static getInitials(str) {
        if (!str) return "";
        return str.includes(" ") ? str.split(" ").map((str) => str.trim()).filter((str) => str.length).map((str) => str.charAt(0).toUpperCase()).join("") : str.charAt(0).toUpperCase();
    }

    static formatCurrency(str, currency, locals) {
        const formatter = new Intl.NumberFormat(locals || 'en-US', {
            style: 'currency',
            currency: currency || 'USD',

            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        return formatter.format(str);
    }

    static capitalize(str) {
        if (!str) return str;
        const words = str.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(" ");
    }

    static formatPhoneNumber(phoneNumberString) {
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            let intlCode = (match[1] ? '+1 ' : '');
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }

}