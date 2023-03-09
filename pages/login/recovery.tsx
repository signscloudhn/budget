import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from "yup"
import { validationsRecoveryForm } from "../../utils/validations"
import styles from "./styles/recovery.module.scss"

const recovery = () => {
  return (
    <main className={styles.recovery} >
      <h2>Recuperar contraseña</h2>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={() => {
          //
        }}
        validationSchema={yup.object(validationsRecoveryForm)}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="email">Ingresa tu correo electronico</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component={"p"} />
            </div>
            <button type="submit">Enviar codigo</button>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default recovery
