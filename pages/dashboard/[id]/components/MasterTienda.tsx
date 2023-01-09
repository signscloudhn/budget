import { Formik, Form, Field, ErrorMessage } from "formik"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { state } from "../../../../interfaces/tienda"
import { updateMasterTienda } from "../../../../redux/slices/dataSlice"
import { MasterTienda } from "../interfaces/MasterTienda"
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
  const currentWeekIndex = currentStore.weeks.findIndex(
    (week) => week.weekId == weekId
  )

  const submit = (
    presupuestoInicial: number,
    residuoGlobal: number,
    sumarResiduoAnterior: boolean
  ) => {
    dispatch(
      updateMasterTienda({
        presupuestoInicial,
        residuoGlobal,
        currentStoreIndex,
        currentWeekIndex,
        sumarResiduoAnterior,
      })
    )
  }

  const initialValue = {
    residuoGlobal: currentStore.residuoGlobal,
    presupuestoInicial: currentStore.weeks[currentWeekIndex].presupuestoInicial,
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
              values.residuoGlobal,
              values.sumarResiduoAnterior
            )
            handle()
          }}
        >
          {(formik) => (
            <Form>
              <label htmlFor="presupuestoInicial">Presupuesto base:</label>
              <Field type="number" name="presupuestoInicial" />

              {/* <label htmlFor="residuo-anterior">Residuo anterior</label>
            <Field type="number" name="residuoAnterior" /> */}

              <label htmlFor="residuo-global">Residuo global:</label>
              <Field type="number" name="residuoGlobal" />

              <label htmlFor="residuoAnterior">Sumar residuo anterior ({tiendas[currentStoreIndex].weeks[currentWeekIndex - 1]?.residuo}):</label>
              <Field type="checkbox" name="sumarResiduoAnterior" />

              <button type="submit" >
                Listo
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default MasterTienda
