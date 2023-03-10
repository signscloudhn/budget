import { ErrorMessage, Field, Form, Formik } from "formik"
import styles from './styles/restore-password.module.scss'
import * as yup from 'yup';
import { validationsRestorePassword } from '../../utils/validations';

const restorePassword = () => {
  return (
    <main className={styles.restore} >
      <h2>Restore password</h2>
      <Formik
        onSubmit={() => {}}
        initialValues={{
          password1: "",
          password2: "",
        }}
        validationSchema={yup.object(validationsRestorePassword)}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="password1">Nueva contraseña</label>
              <Field type="password" name="password1" />
              <ErrorMessage name="password1" component={"p"} />
            </div>
            <div>
              <label htmlFor="password2">Escribe de nuevo la contraseña</label>
              <Field type="password" name="password2" />
              <ErrorMessage name="password2" component={"p"} />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default restorePassword
