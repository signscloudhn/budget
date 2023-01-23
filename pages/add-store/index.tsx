import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useStores } from "../../hooks/useStores"
import { state } from "../../interfaces/tienda"
import styles from "./styles/add-store.module.sass"
import validations from "../../lib/validations"
import * as yup from "yup"

const AddStore = () => {
  const lastWeekId: number = useSelector(
    (state: state) => state.data.weeks[state.data.weeks.length - 1].id
  )
  const router = useRouter()

  const { createStore } = useStores()

  return (
    <div className={styles.container}>
      <h2>Agregar nueva tienda</h2>

      <Formik
        initialValues={{
          nombre: "",
          presupuesto: 0,
          publicaciones: 1,
        }}
        validationSchema={yup.object(validations)}
        onSubmit={(values) => {
          createStore(values.nombre, values.presupuesto, values.publicaciones)
          router.push(`/dashboard/${lastWeekId}`)
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.field_name}>
              <label htmlFor="nombre">Nombre:</label>
              <Field name="nombre" type="text" />
              <ErrorMessage
              name="nombre"
              component="p"
            />
            </div>
            <div className={styles.field}>
              <label htmlFor="presupuesto">Presupuesto:</label>
              <Field name="presupuesto" type="number" />
              <ErrorMessage
              name="presupuesto"
              component="p"
            />
            </div>
            <div className={styles.field}>
              <label htmlFor="publicaciones">Publicaciones:</label>
              <Field name="publicaciones" type="number" />
              <ErrorMessage
              name="publicaciones"
              component="p"
            />
            </div>
            <div className={styles.field}>
              <button type="submit">Agregar</button>
              <button
                type="button"
                onClick={() => {
                  router.back()
                }}
                style={{ background: "gray" }}
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddStore
