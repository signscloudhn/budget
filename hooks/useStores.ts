// import { data } from '../data/tiendas';
import { useDispatch, useSelector } from "react-redux"
import { tienda, storeWeeks, tiendas } from "../interfaces/tienda"
import {
  createNewStore,
  updatePublicationsDist,
} from "../redux/slices/dataSlice"
import { dividirPresupuesto } from "../utils/calculations"

export const useStores = () => {
  const data: tiendas = useSelector((state: any) => state.data)
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

  return {
    createStore,
    updatePublications,
  }
}
