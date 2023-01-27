import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useStores } from "../../hooks/useStores"
import { state } from "../../interfaces/store"
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
      <h2>Agregar nueva store</h2>

      <Formik
        initialValues={{
          name: "",
          budget: 0,
          publications: 1,
        }}
        validationSchema={yup.object(validations)}
        onSubmit={(values) => {
          createStore(values.name, values.budget, values.publications)
          router.push(`/dashboard/${lastWeekId}`)
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.field_name}>
              <label htmlFor="name">Nombre:</label>
              <Field name="name" type="text" />
              <ErrorMessage
              name="name"
              component="p"
            />
            </div>
            <div className={styles.field}>
              <label htmlFor="budget">Presupuesto:</label>
              <Field name="budget" type="number" />
              <ErrorMessage
              name="budget"
              component="p"
            />
            </div>
            <div className={styles.field}>
              <label htmlFor="publications">Publications:</label>
              <Field name="publications" type="number" />
              <ErrorMessage
              name="publications"
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
