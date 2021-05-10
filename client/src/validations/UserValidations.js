import * as yup from "yup";

export const UserSchema = yup.object().shape({
    email: yup
    .string()
    .email("Email invalido")
    .required("Email esta requerido"),
    name: yup
    .string()
    .required("Nombre esta requerido"),
    lastName: yup
    .string()
    .required("Apellido esta requerido"),
    password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres!")
    .required("Contraseña esta requerida")
})