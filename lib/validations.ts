import * as yup from "yup"

const requerido = "Campo obligatorio"

const validations = {
  name: yup
    .string()
    .min(10, "Debe tener 10 caracteres o mas")
    .required(requerido),
  budget: yup.number().min(1, "El budget no puede ser 0").required(requerido),
  publications: yup
    .number()
    .min(1, "Debe tener al menos una publicación")
    .required(requerido),
}

export default validations
