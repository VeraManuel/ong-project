import Swal from "sweetalert2";
import { confirmColor, errorColor } from "./App.scss";

export const confirm = (confirmTitle, confirmMsg, next) => {
  Swal.fire({
    title: confirmTitle,
    text: confirmMsg,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: confirmColor,
    cancelButtonColor: errorColor,
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
  }).then(next);
};

export const message = (title, message, icon) => {
  Swal.fire({
    type: icon,
    title: title,
    text: message,
  });
};
