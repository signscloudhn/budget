import { Formik, Form, Field } from "formik"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { deleteStore } from "../../../../redux/slices/dataSlice"
import { state } from "../../../../interfaces/store"
import { updateMasterStore } from "../../../../redux/slices/dataSlice"
import { MasterTienda } from "../../../../interfaces/Dashboard/MasterTienda"
import styles from "../styles/MasterTienda.module.scss"
import { useState, useEffect } from 'react';

const MasterTienda = ({ handle, name }: MasterTienda) => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const stores = useSelector((state: state) => state.data.stores)

  const currentStoreIndex = stores.findIndex((store) => store.name === name)
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
    budgetInitial: currentStore?.weeks[currentWeekIndex].budgetInitial,
    sumarResiduoAnterior: false,
  }

  const [show, setShow] = useState({
    danger_zone: false,
    openDelete: false,
    deleteInput: "",
    enableDelete: false
  })

  const handleDangerZone = ()=>{
    setShow({
      ...show,
      danger_zone: !show.danger_zone,
      openDelete: false
    })
  }

  const handleDelete = ()=>{
    setShow({
      ...show,
      openDelete: !show.openDelete
    })
  }

  const captureInput = (value: string)=>{
    setShow({
      ...show,
      deleteInput: value
    })
  }

  useEffect(()=>{
    if(show.deleteInput === "kato-delete"){
    setShow({
      ...show,
      enableDelete: true
    })
  } else {
    setShow({
      ...show,
      enableDelete: false
    })
  }
  }, [show.deleteInput])

  console.log(show.deleteInput, show.enableDelete)

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
            className={`${styles.open_zone_btn} ${show.danger_zone && styles.red}`}
            onClick={
              handleDangerZone
            }
          >
            Danger zone
          </button>
          {show.danger_zone && (
            <div className={styles.content}>
              <button>Desactivar tienda</button>
              <p>
                *Esto desactivara la tienda a partir de esta semana y podras
                reactivarla cuando quieras, ademas si haz sumado alguno de los residuos (global o anterior) sera devuelto.
              </p>
              {!show.openDelete ? (
                <button
              onClick={handleDelete}
              >Eliminar tienda</button>
              ) : (
                <button
              onClick={handleDelete}
              disabled
              >Eliminar tienda</button>
              )}
              <p>
                *Esto eliminara todo registro de la tienda y no se puede
                deshacer
              </p>

              {show.openDelete && (
              <>
              <p className={styles.disclaimer}>Para borrar escribe la palabra &aposkato-delete&apos en el siguiente campo:</p>
              <input type="text" onChange={e => {
                  captureInput(e.target.value)
              }} />

              {show.enableDelete ? (
                <button onClick={()=>{
                  dispatch(deleteStore({name}))
                }} >Eliminar</button>
              ) : (
                <button disabled >Eliminar</button>
              )}

              </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MasterTienda
