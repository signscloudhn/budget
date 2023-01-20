import { useRouter } from "next/router"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import Week from "./components/Week"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import { useSelector } from "react-redux"
import { state, tiendas } from "../../../interfaces/tienda"
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

  return (
    <div className={styles.container}>
      <WeeksBar weeks={datos.weeks} />
      <div className={styles.tiendas_lista}>
        {datos.tiendas.map((tienda) => (
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
        ))}
        <div
          onClick={() => {
            router.push("/add-store")
          }}
        >
          <h4>Nueva tienda</h4>
        </div>
      </div>
    </div>
  )
}

export default TiendasList
