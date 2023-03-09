import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import styles from "./styles/verification-code.module.scss"

const verificationCode = () => {
  return (
    <main className={styles.verification} >
      {/* <h2>Recuperar contraseña</h2> */}
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={() => {
          //
        }}
        validationSchema={yup.object({})}
      >
        {() => (
          <Form>
            <div>
              {/* <label htmlFor="email">Ingresa el codigo enviado a tu correo electronico</label> */}
              <Field type="text" name="code" />
              <ErrorMessage name="code" component={"p"} />
            </div>
            <button>Verificar</button>
            <button type="submit">Reenviar codigo</button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default verificationCode;