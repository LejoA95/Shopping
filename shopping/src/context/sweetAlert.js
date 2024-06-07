import Swal from 'sweetalert2'

const advertenceMessage = (message) => {
    Swal.fire({
        customClass: {
            container: 'my-swal',
            color: '#022946'
        },
        icon: "warning",
        color: '#022946',
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        title: message,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
}

const advertenceTrueMessage = (message) => {
    Swal.fire({
        customClass: {
            container: 'my-swal',
            color: '#022946'
        },
        icon: "success",
        color: '#022946',
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        title: message,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
}
export { advertenceMessage, advertenceTrueMessage };
