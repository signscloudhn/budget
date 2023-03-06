import { ErrorMessage, Field, Form, Formik } from "formik"
import styles from "./styles/login.module.scss"
import { validationsLoginForm } from '../../utils/validations';
import * as yup from 'yup';

const index = () => {

  return (
    <main className={styles.login_layout}>
      <h1>Budget App</h1>
      <div className={styles.form_content} >
        <h2>Iniciar Sesión</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
        validationSchema={yup.object(validationsLoginForm)}
      >
        {() => (
          <Form>
            <div>
              <label>Correo:</label>
              <Field type="email" name="email" />
            </div>
            <ErrorMessage name="email" component="p" />
            <div>
              <label>Password:</label>
              <Field type="password" name="password" />
            </div>
            <ErrorMessage name="password" component="p" />
            <button type="submit" >Sign in</button>
          </Form>
        )}
      </Formik>
      </div>
    </main>
  )
}

export default index
