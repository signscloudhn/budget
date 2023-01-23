import * as yup from "yup"

const requerido = "Campo obligatorio"

const validations = {
  nombre: yup
    .string()
    .min(10, "Debe tener 10 caracteres o mas")
    .required(requerido),
  presupuesto: yup
    .number()
    .min(1, "El presupuesto no puede ser 0")
    .required(requerido),
  publicaciones: yup
    .number()
    .min(1, "Debe tener al menos una publicación")
    .required(requerido),
}

export default validations
