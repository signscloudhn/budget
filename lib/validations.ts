import * as yup from "yup"

const required = "Campo obligatorio"

const validations = {
  name: yup
    .string()
    .min(10, "Debe tener 10 caracteres o mas")
    .required(required),
  budget: yup
    .number()
    .min(1, "El presupuesto no puede ser 0")
    .required(required),
  publications: yup
    .number()
    .min(1, "Debe tener al menos una publicación")
    .required(required),
}

export default validations
