import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from 'react-redux';
import { useStores } from "../../hooks/useStores"
import { state } from "../../interfaces/store"
import styles from "./styles/add-store.module.sass"
import validations from "../../lib/validations"
import * as yup from "yup"
import { postThunk } from '../../redux/store';

const AddStore = () => {
  const lastWeekId: number = useSelector(
    (state: state) => state.data.weeks[state.data.weeks.length - 1].id
  )
  const router = useRouter()

  const { createStore } = useStores()

  const dispatch: any = useDispatch()

  return (
    <div className={styles.container}>
      <h2>Agregar nueva Tienda</h2>

      <Formik
        initialValues={{
          name: "",
          budget: 0,
          publications: 1,
        }}
        validationSchema={yup.object(validations)}
        onSubmit={(values) => {
          const { name, budget, publications }= values

          createStore(name, budget, publications)
          dispatch(postThunk)
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
              <label htmlFor="publications">Publicaciones:</label>
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
