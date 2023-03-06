import * as yup from "yup"

const requerido = "Campo obligatorio"

export const validationsLoginForm = {
  email: yup.string().email("Correo invalido").required(requerido),
  password: yup.string().required(requerido),
}
