import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { state } from "../../../../interfaces/tienda"
import { updateMasterTienda } from "../../../../redux/slices/dataSlice"
import { MasterTienda } from "../../../../interfaces/Dashboard/MasterTienda"
import styles from "../styles/MasterTienda.module.scss"

const MasterTienda = ({ handle, nombre }: MasterTienda) => {
  const router = useRouter()
  const { id } = router.query
  const weekId = Number(id)

  const dispatch = useDispatch()
  const tiendas = useSelector((state: state) => state.data.tiendas)

  const currentStoreIndex = tiendas.findIndex(
    (tienda) => tienda.nombre === nombre
  )
  const currentStore = tiendas[currentStoreIndex]
  const currentWeekIndex = currentStore?.weeks.findIndex(
    (week) => week.weekId == weekId
  )

  const submit = (presupuestoInicial: number, residuoGlobal: number) => {
    dispatch(
      updateMasterTienda({
        presupuestoInicial,
        residuoGlobal,
        currentStoreIndex,
        currentWeekIndex,
      })
    )
  }

  const initialValue = {
    residuoGlobal: currentStore?.residuoGlobal,
    presupuestoInicial:
      currentStore?.weeks[currentWeekIndex].presupuestoInicial,
    sumarResiduoAnterior: false,
  }

  return (
    <div className={styles.master_tienda}>
      <div className={styles.modal}>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => {
            submit(
              values.presupuestoInicial,
              values.residuoGlobal
              // values.sumarResiduoAnterior
            )
            handle()
          }}
        >
          {() => (
            <Form>
              <div className={styles.field}>
                <label htmlFor="presupuestoInicial">Presupuesto:</label>
                <Field type="number" name="presupuestoInicial" />
              </div>

              <div className={styles.field}>
                <label htmlFor="residuo-global">Residuo global:</label>
                <Field type="number" name="residuoGlobal" />
              </div>
              <div className={styles.buttons_container}>
                <button type="submit">Guardar</button>
                <button type="button"  onClick={()=>{
                  handle()
                }} >Cancelar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default MasterTienda
