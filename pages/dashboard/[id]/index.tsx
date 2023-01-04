// 'use client';
import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import { data } from "../../../data/tiendas"
import { useStoreData } from "../../../hooks/useStores"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import Week from "./components/Week"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import useWeeks from "../../../hooks/useWeeks";

/*eslint-disable */

const index = () => {
  const { createNewStore } = useStoreData()

  const [renderizar, setRenderizar] = useState(false)

  // Generar data
  useEffect( () => {
    createNewStore("Nueva Tienda supermarket 1", 110, 1)
    createNewStore("Food Fair Supermarket 14 broadway, NY 11234", 130, 2)
    createNewStore("Meat Market 32-80 broadway, NY 11234", 100, 2)
    createNewStore("Cherry Valley 12 broadway, NY 11234", 120, 4)
    setRenderizar(!renderizar)
  }, [])


  const router = useRouter()

  const { id } = router.query

  const datos = data

  const tiendas = datos.tiendas

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
                    update={()=>{
                      setRenderizar(!renderizar)
                    }}
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

export default index
