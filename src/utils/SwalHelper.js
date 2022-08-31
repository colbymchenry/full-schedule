import Swal from "sweetalert2";

export class SwalHelper {

    static deleteConfirmation() {
        return Swal.fire({
            icon: 'warning',
            text: 'Are you sure? This is irreversible.',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Never mind',
            confirmButtonColor: 'var(--fuse-warn-600)',
            cancelButtonColor: 'var(--nav-color)',
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true
        });
    }

}