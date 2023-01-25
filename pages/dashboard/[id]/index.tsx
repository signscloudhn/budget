import { useRouter } from "next/router"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import Week from "./components/Week"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { deleteWeek } from "../../../redux/slices/dataSlice"
import { state, tienda, tiendas, weeks } from '../../../interfaces/tienda';
import { useEffect, useState } from "react"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Icon } from "@mui/material"

const TiendasList = () => {
  const [datos, setDatos] = useState<tiendas>({
    tiendas: [],
    weeks: [],
  })
  const [lastWeekId, setLastWeekId] = useState(0)

  const [showDelete, setShowDelete] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const state: tiendas = useSelector((state: state) => state.data)

  useEffect(() => {
    setDatos(state)
    setLastWeekId(datos.weeks[datos.weeks.length - 1]?.id)
  }, [state, datos.weeks])


  const current = (tienda: tienda) => {
    const i: number | undefined = tienda.weeks.findIndex(
      (week) => week.weekId === Number(id)
    )

    if (i === -1) {
      return false
    } else return true
  }
  const dispatch = useDispatch()


  const weekDate = datos.weeks.filter(week => week.id === Number(id))[0]?.fecha


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Week: {id}</h2>
        <Icon
          component={RemoveCircleOutlineIcon}
          fontSize="small"
          color="action"
          onClick={() => {
            setShowDelete(true)
          }}
        />
      </div>
      <p className={styles.date} >{weekDate}</p>
      {showDelete && (
        <div className={styles.delete_modal}>
          <div className={styles.modal_container}>
            <h4>Estas seguro de que quieres borrar la semana {id} ?</h4>
            {/* <p>Para borrar la semana debes escribir 'kato-delete'</p> */}
            <div>
              <button
                onClick={() => {
                  dispatch(deleteWeek({ weekId: id }))
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
      <div className={styles.tiendas_lista}>
        {datos.tiendas.map((tienda) => {
          if (current(tienda)) {
            return (
              <Tienda
                key={tienda.nombre}
                nombre={tienda.nombre}
                residuoGlobal={tienda.residuoGlobal}
              >
                {tienda.weeks.map((week) => {
                  // * Render
                  if (week.weekId.toString() === id)
                    return (
                      <Week key={tienda.nombre} tienda={tienda} week={week}>
                        <DivisionInfo
                          division={week.division}
                          update={{ name: tienda.nombre, week: week.weekId }}
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
          <h4>Nueva tienda</h4>
        </div>
      </div>
      <WeeksBar weeks={datos.weeks} />
    </div>
  )
}

export default TiendasList
