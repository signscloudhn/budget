import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  deleteStore,
  disableStore,
} from "../../../../../redux/slices/dataSlice"
import styles from "../../styles/DangerZone.module.scss"

interface props {
  name: string
}

const DangerZone = ({ name }: props) => {
  const [show, setShow] = useState({
    openDelete: false,
    enableDelete: false,
    deleteInput: "",
  })

  const captureInput = (value: string) => {
    setShow({
      ...show,
      deleteInput: value,
    })
  }

  const handleDelete = () => {
    setShow({
      ...show,
      openDelete: !show.openDelete,
    })
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (show.deleteInput === "store-delete") {
      setShow({
        ...show,
        enableDelete: true,
      })
    } else {
      setShow({
        ...show,
        enableDelete: false,
      })
    }
  }, [show.deleteInput])

  return (
    <div className={styles.content}>
      <button
        onClick={() => {
          dispatch(disableStore({ name }))
        }}
      >
        Desactivar tienda
      </button>
      <p>
        *Esto desactivara la tienda a partir de esta semana y podras reactivarla
        cuando quieras, ademas si haz sumado alguno de los residuos (global o
        anterior) sera devuelto.
      </p>
      {!show.openDelete ? (
        <button onClick={handleDelete}>Eliminar tienda</button>
      ) : (
        <button onClick={handleDelete} disabled>
          Eliminar tienda
        </button>
      )}
      <p>*Esto eliminara todo registro de la tienda y no se puede deshacer</p>

      {show.openDelete && (
        <>
          <p className={styles.disclaimer}>
            Para borrar la tienda escribe la palabra {"'"}store-delete{"'"} en
            el siguiente campo:
          </p>
          <input
            type="text"
            onChange={(e) => {
              captureInput(e.target.value)
            }}
          />

          {show.enableDelete ? (
            <button
              onClick={() => {
                dispatch(deleteStore({ name }))
              }}
            >
              Eliminar
            </button>
          ) : (
            <button disabled>Eliminar</button>
          )}
        </>
      )}
    </div>
  )
}

export default DangerZone
