import { Formik, Form, Field, ErrorMessage } from "formik"

const index = () => {
  return (
    <div>
      <h1>Add New Store</h1>

      <Formik initialValues={{}} onSubmit={() => {}}>
        {(formik) => (
          <Form>

            <label htmlFor="nombre">Nombre de la tienda:</label>
            <Field name="nombre" type="text" />
            <ErrorMessage name="nombre" component="p" />

            <label htmlFor="presupuesto">Presupuesto:</label>
            <Field name="presupuesto" type="number" />
            <ErrorMessage name="presupuesto" component="p" />

            <label htmlFor="publicaciones">Publicaciones:</label>
            <Field name="publicaciones" type="number" />
            <ErrorMessage name="publicaciones" component="p" />

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default index
