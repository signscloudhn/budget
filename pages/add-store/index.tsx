import { Formik, Form, Field, ErrorMessage } from "formik"
import { useStores } from "../../hooks/useStores";

const AddStore = () => {


  const { createStore } = useStores()

  return (
    <div>
      <h1>Add New Store</h1>

      <Formik initialValues={{
         nombre: "",
         presupuesto: 0,
         publicaciones: 1,
      }} onSubmit={(values) => {
        createStore(values.nombre, values.presupuesto, values.publicaciones)
      }}>
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

            <button type="submit">Crear</button>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddStore
