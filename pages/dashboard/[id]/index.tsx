// 'use client';
import { useRouter } from "next/router"
import { useEffect} from "react"
// import { data } from "../../../data/tiendas"
import { useStores } from "../../../hooks/useStores"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import Week from "./components/Week"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import MasterTienda from "./components/MasterTienda"
import { useSelector } from "react-redux"
import { tiendas } from '../../../interfaces/tienda';

const TiendasList = () => {
  const { createStore } = useStores()

  const router = useRouter()
  const { id } = router.query

  const datos: tiendas = useSelector((state: any) => state.data)

  const tiendas = datos.tiendas

  //! Generar data
  useEffect(() => {
    createStore("Nueva Tienda supermarket 1", 110, 1)
    createStore("Food Fair Supermarket 14 broadway, NY 11234", 130, 2)
    createStore("Meat Market 32-80 broadway, NY 11234", 100, 2)
    createStore("Cherry Valley 12 broadway, NY 11234", 120, 4)
  }, [])

  return (
    <div className={styles.container}>
      <WeeksBar weeks={datos.weeks} />
      <div className={styles.tiendas_lista}>
        {tiendas.map((tienda) => (
          <Tienda
            key={tienda.nombre}
            nombre={tienda.nombre}
            residuoGlobal={tienda.residuoGlobal}
          >
            {tienda.weeks.map((week) => {
              // * Render
              if (week.weekId.toString() === id)
                return (
                  <Week
                    key={tienda.nombre}
                    tienda={tienda}
                    week={week}
                  >
                    <DivisionInfo division={week.division} />
                  </Week>
                )
            })}
          </Tienda>
        ))}
      </div>
    </div>
  )
}

export default TiendasList
