import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { state } from "../../../../interfaces/store"
import { updateMasterStore } from "../../../../redux/slices/dataSlice"
import { MasterTienda } from "../../../../interfaces/Dashboard/MasterTienda"
import styles from "../styles/MasterTienda.module.scss"

const MasterTienda = ({ handle, name }: MasterTienda) => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const stores = useSelector((state: state) => state.data.stores)

  const currentStoreIndex = stores.findIndex(
    (store) => store.name === name
  )
  const currentStore = stores[currentStoreIndex]
  const currentWeekIndex = currentStore?.weeks.findIndex(
    (week) => week.id == Number(id)
  )

  const submit = (budgetInitial: number, globalResidue: number) => {
    dispatch(
      updateMasterStore({
        budgetInitial,
        globalResidue,
        currentStoreIndex,
        currentWeekIndex,
      })
    )
  }

  const initialValue = {
    globalResidue: currentStore?.globalResidue,
    budgetInitial:
      currentStore?.weeks[currentWeekIndex].budgetInitial,
    sumarResiduoAnterior: false,
  }

  return (
    <div className={styles.master_store}>
      <div className={styles.modal}>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => {
            submit(
              values.budgetInitial,
              values.globalResidue
            )
            handle()
          }}
        >
          {() => (
            <Form>
              <div className={styles.field}>
                <label htmlFor="budgetInitial">Presupuesto:</label>
                <Field type="number" name="budgetInitial" />
              </div>

              <div className={styles.field}>
                <label htmlFor="residue-global">Residuo global:</label>
                <Field type="number" name="globalResidue" />
              </div>
              <div className={styles.buttons_container}>
                <button type="submit">
                  Guardar</button>
                <button
                  type="button"
                  onClick={() => {
                    handle()
                  }}
                >
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default MasterTienda
