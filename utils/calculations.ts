import { storeWeeks } from "../interfaces/tienda"

export const dividirPresupuesto = (publicaciones: number, week: storeWeeks) => {
  week.division = []

  for (let i = 0; i < publicaciones; i++) {
    const presupuestoPublicacion = week.presupuestoTotal / publicaciones

    const presupuestoSocialMedia = presupuestoPublicacion / 2

    const presupuestoDividido = {
      presupuesto: presupuestoPublicacion,
      distribucion: {
        instagram: {
          in: presupuestoSocialMedia,
          out: 0,
        },
        facebook: {
          in: presupuestoSocialMedia,
          out: 0,
        },
      },
      residuo: 0,
    }

    week.division.push(presupuestoDividido)
  }
}
