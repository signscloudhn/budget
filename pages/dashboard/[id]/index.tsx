import { useRouter } from "next/router"
import { useEffect } from "react"
import { data } from "../../../data/tiendas"
import { useNewStore } from "../../../hooks/useNewStore"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import WeekInfo from "./components/WeekInfo"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"

/*eslint-disable */

const index = () => {
  const { createNewStore } = useNewStore()

  useEffect(() => {
    createNewStore("Nueva Tienda supermarket 12 broadway, NY 11234", 120, 4)
  }, [])

  const router = useRouter()

  const datos = data

  const { id } = router.query

  const tiendas = datos.tiendas

  return (
    <div className={styles.container}>
      <WeeksBar weeks={datos.weeks} />
      <div className={styles.tiendas_lista}>
        {tiendas.map((t) => (
          <Tienda
            key={t.nombre}
            nombre={t.nombre}
            residuoGlobal={t.residuoGlobal}
          >
            {t.weeks.map((w) => {
              if (w.weekId === id)
                return (
                  <WeekInfo
                    key={w.weekId}
                    presupuestoTotal={w.presupuestoTotal}
                    publicaciones={w.publicaciones}
                    residuo={w.residuo}
                  >
                    {w.division.map((d) => (
                      <DivisionInfo
                        key={d.residuo}
                        presupuesto={d.presupuesto}
                        distribucion={d.distribucion}
                        residuo={d.residuo}
                      />
                    ))}
                  </WeekInfo>
                )
            })}
          </Tienda>
        ))}
      </div>
    </div>
  )
}

export default index
