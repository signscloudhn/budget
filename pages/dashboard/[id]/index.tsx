import { useRouter } from "next/router"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import Week from "./components/Week"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { deleteWeek } from "../../../redux/slices/dataSlice"
import { state, store, stores } from "../../../interfaces/store"
import { useEffect, useState } from "react"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Icon } from "@mui/material"

const TiendasList = () => {
  const [datos, setDatos] = useState<stores>({
    stores: [],
    weeks: [],
  })
  const [lastWeekId, setLastWeekId] = useState(0)

  const [showDelete, setShowDelete] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const state: stores = useSelector((state: state) => state.data)

  useEffect(() => {
    setDatos(state)
    setLastWeekId(datos.weeks[datos.weeks.length - 1]?.id)
  }, [state, datos.weeks])

  const current = (store: store) => {
    const weekIndex: number | undefined = store.weeks.findIndex(
      (week) => week.id === Number(id)
    )

    if (weekIndex === -1) {
      return false
    } else return true
  }
  const dispatch = useDispatch()

  const weekDate = datos.weeks.filter((week) => week.id === Number(id))[0]?.date

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Week: {id}</h2>
        {
        // TODO
        lastWeekId === Number(id) && state.weeks.length > 1 && (
          <Icon
            component={RemoveCircleOutlineIcon}
            fontSize="small"
            color="action"
            onClick={() => {
              setShowDelete(true)
            }}
          />
        )}
      </div>
      <p className={styles.date}>{weekDate}</p>
      {showDelete && (
        <div className={styles.delete_modal}>
          <div className={styles.modal_container}>
            <h4>Estas seguro de que quieres borrar la semana {id} ?</h4>
            <div>
              <button
                onClick={() => {
                  dispatch(deleteWeek({ id: id }))
                  setShowDelete(false)
                  router.push(`/dashboard/${lastWeekId - 1}`)
                }}
              >
                Si, estoy seguro
              </button>
              <button
                onClick={() => {
                  setShowDelete(false)
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.stores_lista}>
        {datos.stores.map((store) => {
          if (current(store)) {
            return (
              <Tienda
                key={store.name}
                name={store.name}
                globalResidue={store.globalResidue}
              >
                {store.weeks.map((week) => {
                  // * Render
                  if (week.id.toString() === id)
                    return (
                      <Week key={store.name} store={store} week={week}>
                        <DivisionInfo
                          division={week.division}
                          update={{ name: store.name, week: week.id }}
                        />
                      </Week>
                    )
                })}
              </Tienda>
            )
          }
        })}
        <div
          onClick={() => {
            router.push("/add-store")
          }}
          className={styles.new_btn}
        >
          <h4>Nueva Tienda</h4>
        </div>

        {/* TODO: reactivar tiendas */}
      </div>
      <WeeksBar weeks={datos.weeks} />
    </div>
  )
}

export default TiendasList
