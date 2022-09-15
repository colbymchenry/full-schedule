import Swal from "sweetalert2";

export const prettyLog = (label, val, asTable = false, shouldWarn = false) => {
    console.log('%c' + label, 'background-color: #245057;padding: 0.2rem 1.5rem;color: white;');
    if (val) {
        if (shouldWarn) {
            console.warn(val);
        } else if (asTable) {
            console.table(val);
        } else {
            console.log(val);
        }
    }
}

export const showToast = (title, type, text) => {
    Swal.fire({
        title: title ||  "Server error. Please try again later.",
        ...(text && { text }),
        timer: 5000,
        timerProgressBar: true,
        toast: true,
        position: 'top-right',
        icon: type || 'error',
        showConfirmButton: false,
        showCancelButton: false,
        showDenyButton: false
    });
}