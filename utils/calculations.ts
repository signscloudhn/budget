import { storeWeeks, tienda, division } from "../interfaces/tienda"

export const dividirPresupuesto = (publicaciones: number, week: storeWeeks) => {
  week.division = []

  let idCounter = 0

  for (let i = 0; i < publicaciones; i++) {
    const presupuestoPublicacion = week.presupuestoTotal / publicaciones

    const presupuestoSocialMedia = presupuestoPublicacion / 2

    const presupuestoSocialMediaRounded = Number(
      presupuestoSocialMedia.toFixed(2)
    )

    const presupuestoPublicacionRounded = Number(
      presupuestoPublicacion.toFixed(2)
    )

    idCounter = idCounter + 1

    const presupuestoDividido = {
      id: idCounter,
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

// export const recalcularResiduoGlobal = (tienda: tienda) => {
//   let nuevoResiduoGlobal = 0

//   tienda.weeks.forEach((week) => {
//     if (!week.residuoGastado) {
//       nuevoResiduoGlobal = nuevoResiduoGlobal + week.residuo
//     }
//   })
//   tienda.residuoGlobal = nuevoResiduoGlobal
// }

export const recalcularPublicaciones = (
  week: storeWeeks,
  presupuesto: number,
  publicacionIndex: number
) => {
  const currentPublicacion = week.division[publicacionIndex]

  currentPublicacion.presupuesto = presupuesto

  const presupuestoSocialMedia = presupuesto / 2

  const presupuestoSocialMediaRounded = Number(
    presupuestoSocialMedia.toFixed(2)
  )

  currentPublicacion.distribucion = {
    instagram: {
      in: presupuestoSocialMediaRounded,
      out: 0,
    },
    facebook: {
      in: presupuestoSocialMediaRounded,
      out: 0,
    },
  }

  const presupuestoRestante =
    week.presupuestoTotal - currentPublicacion.presupuesto

  const presupuestoARepartir = presupuestoRestante / (week.publicaciones - 1)

  week.division.forEach((publicacion) => {
    if (publicacion.id !== currentPublicacion.id) {
      publicacion.presupuesto = presupuestoARepartir

      const presupuestoSocialMedia = presupuestoARepartir / 2

      const presupuestoSocialMediaRounded = Number(
        presupuestoSocialMedia.toFixed(2)
      )

      publicacion.distribucion = {
        instagram: {
          in: presupuestoSocialMediaRounded,
          out: 0,
        },
        facebook: {
          in: presupuestoSocialMediaRounded,
          out: 0,
        },
      }
    }
  })
}

export const recalcularSocialMedia = (
  division: division,
  social: string,
  value: number
) => {
  let restante = division.presupuesto - value

  if (social === "instagram") {
    division.distribucion.instagram.in = value

    division.distribucion.facebook.in = restante
  }
  if (social === "facebook") {
    division.distribucion.facebook.in = value

    division.distribucion.instagram.in = restante
  }
}

export const calcularResiduoActual = (week: storeWeeks) => {
  let residuo = 0

  week.division.forEach((publicacion) => {
    residuo = residuo + Number(publicacion.residuo.toFixed(2))
  })

  week.residuo = Number(residuo.toFixed(2))
}

export const generateDate = (fecha?: string | undefined) => {
  let date: Date

  if (typeof fecha === "string") {
    date = new Date(fecha)
  } else {
    date = new Date()
  }

  const milisecondsAt24Hours = 86400000
  const daysToEndWeek = 6

  const getStartWeek = () => {
    let dias = date.getDay() * 86400000

    return new Date(date.getTime() - dias)
  }

  const getEndWeek = () => {
    let diasASumar =
      getStartWeek().getTime() + daysToEndWeek * milisecondsAt24Hours

    return new Date(diasASumar)
  }

  const todayStartWeek = new Date(getStartWeek().toLocaleDateString())
  const todayEndWeek = new Date(getEndWeek().toLocaleDateString())

  const getNextStartWeek = (fecha: string | undefined) => {
    let nextDay

    if (typeof fecha === "string") {
      nextDay = new Date(fecha).getTime() + 1 * milisecondsAt24Hours
    } else {
      nextDay = new Date().getTime() + 1 * milisecondsAt24Hours
    }

    return new Date(nextDay).toLocaleDateString()
  }

  return {
    startWeek: todayStartWeek.toLocaleDateString(),
    endWeek: todayEndWeek.toLocaleDateString(),
    nextWeek: getNextStartWeek,
  }
}
