// 'use client';
import { useRouter } from "next/router"
import { useEffect} from "react"
import { useStores } from "../../../hooks/useStores"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import Week from "./components/Week"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import MasterTienda from "./components/MasterTienda"
import { useSelector } from "react-redux"
import { state, tiendas } from '../../../interfaces/tienda';

const TiendasList = () => {
  const { createStore } = useStores()

  const router = useRouter()
  const { id } = router.query

  const datos: tiendas = useSelector((state: state) => state.data)

  const tiendas = datos.tiendas


  // ! Generar data
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
                    <DivisionInfo division={week.division} update={{ name: tienda.nombre, week: week.weekId}} />
                  </Week>
                )
            })}
          </Tienda>
        ))}
        <div onClick={()=> {
          router.push("/add-store")
        }}>
          <h4>Nueva tienda</h4>
        </div>
      </div>
    </div>
  )
}

export default TiendasList
