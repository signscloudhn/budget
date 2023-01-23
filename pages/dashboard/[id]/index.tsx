import { useRouter } from "next/router"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import Week from "./components/Week"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import { useSelector } from "react-redux"
import { state, tienda, tiendas, weeks } from "../../../interfaces/tienda"
import { useEffect, useState } from "react"

const TiendasList = () => {
  const [datos, setDatos] = useState<tiendas>({
    tiendas: [],
    weeks: [],
  })

  const router = useRouter()
  const { id } = router.query

  const state: tiendas = useSelector((state: state) => state.data)

  useEffect(() => {
    setDatos(state)
  }, [state])

  const current = (tienda: tienda) => {
    const i: number | undefined = tienda.weeks.findIndex(
      (week) => week.weekId === Number(id)
    )

    if (i === -1) {
      return false
    } else return true
  }

  return (
    <div className={styles.container}>
      <WeeksBar weeks={datos.weeks} />
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
    </div>
  )
}

export default TiendasList
