import { Formik, Form, Field } from "formik"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { updateMasterStore } from "../../../../redux/slices/dataSlice"
import { MasterTienda } from "../../../../interfaces/dashboard"
import styles from "../styles/MasterTienda.module.scss"
import { useState } from "react"
import useFindIndex from "../../../../hooks/useFindIndex"
import DangerZone from "./common/DangerZone"

const MasterTienda = ({ handle, name }: MasterTienda) => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()

  const { currentStore, weekStoreIndex, storeIndex } = useFindIndex(
    name,
    Number(id)
  )

  const initialValue = {
    globalResidue: currentStore?.globalResidue,
    budgetInitial: currentStore?.weeks[weekStoreIndex]?.budgetInitial,
    sumarResiduoAnterior: false,
  }

  const submit = (budgetInitial: number, globalResidue: number) => {
    dispatch(
      updateMasterStore({
        budgetInitial,
        globalResidue,
        storeIndex,
        weekStoreIndex,
      })
    )
  }

  const [show, setShow] = useState({
    danger_zone: false,
  })

  const handleDangerZone = () => {
    setShow({
      ...show,
      danger_zone: !show.danger_zone,
    })
  }

  return (
    <div className={styles.master_store}>
      <div className={styles.modal}>
        <h4>{name}</h4>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => {
            submit(values.budgetInitial, values.globalResidue)
            handle()
          }}
        >
          {() => (
            <Form>
              <div className={styles.field}>
                <label htmlFor="budgetInitial">Budget:</label>
                <Field type="number" name="budgetInitial" />
              </div>

              <div className={styles.field}>
                <label htmlFor="residue-global">Residuo global:</label>
                <Field type="number" name="globalResidue" />
              </div>
              <div className={styles.buttons_container}>
                <button type="submit">Guardar</button>
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
        <div
          className={styles.danger_zone}
          style={
            show.danger_zone
              ? { width: "100%", padding: 3 }
              : { width: "fit-content", padding: 1 }
          }
        >
          <button
            className={`${styles.open_zone_btn} ${
              show.danger_zone && styles.red
            }`}
            onClick={handleDangerZone}
          >
            Danger zone
          </button>
          {show.danger_zone && <DangerZone name={name} />}
        </div>
      </div>
    </div>
  )
}

export default MasterTienda
