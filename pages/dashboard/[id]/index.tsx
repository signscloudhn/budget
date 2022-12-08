// 'use client';
import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import { data } from "../../../data/tiendas"
import { useStoreData } from "../../../hooks/useStoreData"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import WeekInfo from "./components/WeekInfo"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"

/*eslint-disable */

const index = () => {
  const { createNewStore } = useStoreData()

  const [datos, setDatos] = useState(data)

  const [renderizar, setRenderizar] = useState(false)

  const [show, setShow] = useState(false)

  const handleShow = ()=>{
    setShow(!show)
  }

  useEffect( () => {
    createNewStore("Nueva Tienda supermarket 1", 110, 1)
    createNewStore("Nueva Tienda supermarket 14 broadway, NY 11234", 130, 2)
    createNewStore("Nueva Tienda supermarket 32-80 broadway, NY 11234", 100, 2)
    createNewStore("Nueva Tienda supermarket 12 broadway, NY 11234", 120, 4)
    setDatos(data)
  }, [])


  const router = useRouter()

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

              const lastIndex = t.weeks.findIndex((i)=>{
                return i === w
              }) - 1
              const residuoLast = ()=>{
                if(!t.weeks[lastIndex]?.residuoGastado && t.weeks[lastIndex]?.residuo > 0){
                  return t.weeks[lastIndex]?.residuo
                } else {
                  return undefined
                }
              }

              if (w.weekId === id)
                return (
                  <WeekInfo
                    tienda={t}
                    week={w}
                    update={()=>{
                      setRenderizar(!renderizar)
                    }}
                    key={w.weekId}
                    presupuestoTotal={w.presupuestoTotal}
                    publicaciones={w.publicaciones}
                    open={()=>{handleShow()}}
                    residuo={w.residuo}
                    residuoAnterior={residuoLast()}
                  >
                    {show && w.division.map((d) => (
                      <DivisionInfo
                        key={d.residuo + Math.random()}
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
