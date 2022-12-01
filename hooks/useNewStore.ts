import { data } from "../data/tiendas"
import { tienda } from "../interfaces/tienda"

export const useNewStore = () => {
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

    for (let i = 0; i < publicaciones; i++) {
      const presupuestoPost = tienda.weeks[0].presupuestoTotal / publicaciones

      const presupuestoSocial = presupuestoPost / 2

      tienda.weeks[0].division.push({
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

    data.tiendas.push(tienda)
  }

  return {
    createNewStore,
  }
}
