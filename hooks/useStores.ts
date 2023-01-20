// import { data } from '../data/tiendas';
import { useDispatch, useSelector } from "react-redux"
import { tienda, storeWeeks, tiendas, state } from "../interfaces/tienda"
import {
  createNewStore,
  updateMasterTienda,
  updatePublicationsDist,
} from "../redux/slices/dataSlice"
import { dividirPresupuesto } from "../utils/calculations"

export const useStores = () => {
  const data: tiendas = useSelector((state: state) => state.data)
  const tiendas = data.tiendas
  const dispatch = useDispatch()

  const createStore = (
    nombre: string,
    presupuesto: number,
    publicaciones: number
  ) => {
    const lastWeek = data.weeks[data.weeks.length - 1].id

    const tienda: tienda = {
      nombre: nombre,
      residuoGlobal: 0,
      weeks: [
        {
          weekId: lastWeek,
          presupuestoInicial: presupuesto,
          presupuestoTotal: presupuesto,
          publicaciones: publicaciones,
          division: [],
          residuo: 0,
          residuoGastado: false,
        },
      ],
    }

    dividirPresupuesto(publicaciones, tienda.weeks[0])

    dispatch(createNewStore(tienda))
  }

  const updatePublications = (
    tienda: tienda,
    week: storeWeeks,
    publicaciones: number
  ) => {
    const tiendaIndex = data.tiendas.findIndex((i) => i === tienda)
    console.log(data.tiendas[tiendaIndex])

    const weekIndex = data.tiendas[tiendaIndex].weeks.findIndex(
      (i) => i === week
    )

    dispatch(
      updatePublicationsDist({
        tiendaIndex: tiendaIndex,
        weekIndex: weekIndex,
        publicaciones: publicaciones,
      })
    )
  }

  const updateMaster = (
    nombre: string,
    id: any,
    residuoGlobalValue: number,
    presupuestoValue: number
  ) => {
    const storeIndex = tiendas.findIndex((tienda) => tienda.nombre === nombre)

    const currentStore = tiendas[storeIndex]

    const currentWeek = currentStore.weeks[tiendas[0].weeks.length - 1]

    const residuoGlobal = currentStore.residuoGlobal
    const presupuesto = currentWeek.presupuestoInicial

    dispatch(
      updateMasterTienda({
        storeIndex,
        id,
        residuoGlobalValue,
        presupuestoValue,
      })
    )

    return {
      residuoGlobal,
      presupuesto,
    }
  }

  return {
    createStore,
    updatePublications,
    updateMaster,
  }
}
