export class StringUtils {

    static getInitials(str) {
        return str.includes(" ") ? str.split(" ").map((str) => str.trim()).filter((str) => str.length).map((str) => str.charAt(0).toUpperCase()).join("") : str.charAt(0).toUpperCase();
    }

}