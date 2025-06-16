import Swal from "sweetalert2";

export const popError = (message) => {
  Swal.fire({
    icon: "error",
    text: message,
    background: "#2c313c",
    confirmButtonColor: "#0d6efd",
    color: "#ffffff",
    customClass: {
      popup: "border rounded",
    },
  });
};
