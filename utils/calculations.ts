import { storeWeeks, tienda, weeks } from "../interfaces/tienda"

export const dividirPresupuesto = (publicaciones: number, week: storeWeeks) => {
  week.division = []

  for (let i = 0; i < publicaciones; i++) {
    const presupuestoPublicacion = week.presupuestoTotal / publicaciones

    const presupuestoSocialMedia = presupuestoPublicacion / 2

    const presupuestoSocialMediaRounded = Number(
      presupuestoSocialMedia.toFixed(2)
    )

    const presupuestoPublicacionRounded = Number(
      presupuestoPublicacion.toFixed(2)
    )

    const presupuestoDividido = {
      presupuesto: presupuestoPublicacionRounded,
      distribucion: {
        instagram: {
          in: presupuestoSocialMediaRounded,
          out: 0,
        },
        facebook: {
          in: presupuestoSocialMediaRounded,
          out: 0,
        },
      },
      residuo: 0,
    }

    week.division.push(presupuestoDividido)
  }
}

export const recalcularResiduoGlobal = (tienda: tienda) => {
  let nuevoResiduoGlobal = 0

  tienda.weeks.forEach((week) => {
    if (!week.residuoGastado) {
      nuevoResiduoGlobal = nuevoResiduoGlobal + week.residuo
    }
  })
  tienda.residuoGlobal = nuevoResiduoGlobal
}

export const recalcularPublicaciones = (
  week: storeWeeks,
  presupuesto: number
) => {
  week.division[0].presupuesto = presupuesto
}
