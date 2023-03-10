import * as yup from "yup"

const requerido = "Campo obligatorio"

export const validationsLoginForm = {
  email: yup.string().email("Correo invalido").required(requerido),
  password: yup.string().required(requerido),
}

export const validationsRecoveryForm = {
  email: yup.string().email("Correo invalido").required(requerido),
}

export const validationsRestorePassword = {
  password1: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  password2: yup.string(),
}
