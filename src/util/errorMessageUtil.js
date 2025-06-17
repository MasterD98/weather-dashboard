import Swal from "sweetalert2";

export const popError = (message) => {
  const theme = localStorage.getItem("theme") || "light";
  Swal.fire({
    icon: "error",
    text: message,
    background: theme === "dark" ? "#332D2D" : "#FBFBFB",
    confirmButtonColor: "#0d6efd",
    color: theme === "dark" ? "#ffffff" : "#000000",
  });
};
