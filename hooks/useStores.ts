// import { data } from '../data/tiendas';
import { useDispatch, useSelector } from "react-redux"
import { tienda, storeWeeks } from "../interfaces/tienda"
import { createNewStore } from "../redux/slices/dataSlice"

export const useStores = () => {
  const data = useSelector((state: any) => state.data)
  const dispatch = useDispatch()

  const dividirPresupuesto = (publicaciones: number, week: storeWeeks) => {
    for (let i = 0; i < publicaciones; i++) {
      const presupuestoPublicacion = week.presupuestoTotal / publicaciones

      const presupuestoSocial = presupuestoPublicacion / 2

      week.division.push({
        presupuesto: presupuestoPublicacion,
        distribucion: {
          instagram: {
            in: presupuestoSocial,
            out: 0,
          },
          facebook: {
            in: presupuestoSocial,
            out: 0,
          },
        },
        residuo: 0,
      })
    }
  }

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

    // data.tiendas.push(tienda)
  }

  const updatePublication = (
    tienda: tienda,
    week: storeWeeks,
    publicaciones: number
  ) => {
    const index = data.tiendas.findIndex((i) => i === tienda)

    const indexW = data.tiendas[index].weeks.findIndex((i) => i === week)

    const divisionWeek = data.tiendas[index].weeks[indexW]

    divisionWeek.division = []

    divisionWeek.publicaciones = publicaciones

    dividirPresupuesto(publicaciones, divisionWeek)
  }

  return {
    createStore,
    updatePublication,
    dividirPresupuesto,
  }
}
