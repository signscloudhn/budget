import { data } from "../data/tiendas"
import { tienda, storeWeeks } from "../interfaces/tienda"

export const useStoreData = () => {
  const dividirPresupuesto = (p: number, w: storeWeeks) => {
    for (let i = 0; i < p; i++) {
      const presupuestoPost = w.presupuestoTotal / p

      const presupuestoSocial = presupuestoPost / 2

      w.division.push({
        presupuesto: presupuestoPost,
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

  const createNewStore = (
    nombre: string,
    presupuesto: number,
    publicaciones: number
  ) => {
    const lastWeek = data.weeks[data.weeks.length - 1].id

    let tienda: tienda = {
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

    data.tiendas.push(tienda)
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
    createNewStore,
    updatePublication,
  }
}
