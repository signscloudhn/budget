import { Formik, Form, Field } from "formik"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { deleteStore, disableStore } from "../../../../redux/slices/dataSlice"
import { updateMasterStore } from "../../../../redux/slices/dataSlice"
import { MasterTienda } from "../../../../interfaces/dashboard"
import styles from "../styles/MasterTienda.module.scss"
import { useState, useEffect } from 'react';
import useFindIndex from '../../../../hooks/useFindIndex';

const MasterTienda = ({ handle, name }: MasterTienda) => {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()

  const {currentStore, weekStoreIndex, storeIndex} = useFindIndex(name, Number(id))

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
    if(show.deleteInput === "store-delete"){
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
              <button
              onClick={()=>{
                dispatch(disableStore({name}))
              }}
              >Desactivar tienda</button>
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
              <p className={styles.disclaimer}>Para borrar la tienda escribe la palabra {"'"}store-delete{"'"} en el siguiente campo:</p>
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
