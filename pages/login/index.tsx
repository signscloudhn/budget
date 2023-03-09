import { ErrorMessage, Field, Form, Formik } from "formik"
import styles from "./styles/login.module.scss"
import { validationsLoginForm } from '../../utils/validations';
import * as yup from 'yup';
import Link from "next/link";

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
          //
        }}
        validationSchema={yup.object(validationsLoginForm)}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="email">Correo:</label>
              <Field type="email" name="email" />
            </div>
            <ErrorMessage name="email" component="p" className={styles.error} />
            <div>
              <label htmlFor="password" >Password:</label>
              <Field type="password" name="password" />
            </div>
            <ErrorMessage name="password" component="p" className={styles.error} />
            <button type="submit" >Sign in</button>
            <Link href={"login/recovery"} className={styles.recovery} >Olvide mi contraseña :D</Link>
          </Form>
        )}
      </Formik>
      </div>
    </main>
  )
}

export default index
