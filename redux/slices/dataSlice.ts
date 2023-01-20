import { createSlice } from "@reduxjs/toolkit"
import {
  calcularResiduoActual,
  dividirPresupuesto,
  // recalcularResiduoGlobal,
  recalcularSocialMedia,
} from "../../utils/calculations"
import { initialDataState as initialState } from "../initialStates"
import { recalcularPublicaciones } from "../../utils/calculations"

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createNewStore: (state, action) => {
      state.tiendas.push(action.payload)
    },

    createWeek: (state) => {
      const lastWeekId = state.weeks[state.weeks.length - 1].id
      const newWeekId = lastWeekId + 1

      state.weeks.push({ id: newWeekId })

      state.tiendas.forEach((tienda) => {
        const lastWeek = tienda.weeks[tienda.weeks.length - 1]

        const newWeek = {
          weekId: newWeekId,
          presupuestoInicial: lastWeek.presupuestoInicial,
          presupuestoTotal: lastWeek.presupuestoInicial,
          publicaciones: lastWeek.publicaciones,
          division: [],
          residuo: 0,
          residuoGastado: false,
        }

        dividirPresupuesto(lastWeek.publicaciones, newWeek)

        tienda.weeks.push(newWeek)

        // recalcularResiduoGlobal(tienda)

        tienda.residuoGlobal = tienda.residuoGlobal + lastWeek.residuo
      })
    },

    updatePublicationsDist: (state, action) => {
      const tiendaIndex = action.payload.tiendaIndex
      const weekIndex = action.payload.weekIndex

      const currentWeek = state.tiendas[tiendaIndex].weeks[weekIndex]

      currentWeek.division = []
      currentWeek.publicaciones = action.payload.publicaciones

      dividirPresupuesto(action.payload.publicaciones, currentWeek)
      calcularResiduoActual(currentWeek)
    },

    updateMasterTienda: (state, action) => {
      const presupuestoInicial = action.payload.presupuestoInicial
      const residuoGlobal = action.payload.residuoGlobal
      const currentStoreIndex = action.payload.currentStoreIndex
      const currentWeekIndex = action.payload.currentWeekIndex
      // const sumarResiduoAnterior = action.payload.sumarResiduoAnterior

      const currentWeek =
        state.tiendas[currentStoreIndex].weeks[currentWeekIndex]
      const lastWeek =
        state.tiendas[currentStoreIndex].weeks[currentWeekIndex - 1]

      if (state.tiendas[currentStoreIndex].residuoGlobal != residuoGlobal) {
        state.tiendas[currentStoreIndex].residuoGlobal = residuoGlobal

        state.tiendas[currentStoreIndex].weeks.forEach((week) => {
          if (week.weekId !== currentWeek.weekId) week.residuoGastado = true
        })
      }

      currentWeek.presupuestoInicial = presupuestoInicial

      // if (sumarResiduoAnterior) {
      //   currentWeek.presupuestoTotal =
      //     currentWeek.presupuestoInicial + lastWeek.residuo
      //   lastWeek.residuoGastado = true

      //   recalcularResiduoGlobal(state.tiendas[currentStoreIndex])
      // } else {
      //   currentWeek.presupuestoTotal = presupuestoInicial
      // }

      dividirPresupuesto(currentWeek.publicaciones, currentWeek)
      calcularResiduoActual(currentWeek)
    },

    addLastResidue: (state, action) => {
      const nombre = action.payload.nombre
      const id = action.payload.id

      const storeIndex = state.tiendas.findIndex(
        (tienda) => tienda.nombre === nombre
      )

      const weekIndex = state.tiendas[storeIndex].weeks.findIndex(
        (week) => week.weekId === id
      )

      const currentWeek = state.tiendas[storeIndex].weeks[weekIndex]
      const lastWeek = state.tiendas[storeIndex].weeks[weekIndex - 1]

      if (!lastWeek?.residuoGastado && lastWeek !== undefined) {
        currentWeek.presupuestoTotal =
          currentWeek.presupuestoTotal + lastWeek.residuo
        lastWeek.residuoGastado = true
      }

      // recalcularResiduoGlobal(state.tiendas[storeIndex])

      state.tiendas[storeIndex].residuoGlobal =
        state.tiendas[storeIndex].residuoGlobal - lastWeek.residuo

      dividirPresupuesto(currentWeek.publicaciones, currentWeek)
      calcularResiduoActual(state.tiendas[storeIndex].weeks[weekIndex])
    },

    addGlobalResidue: (state, action) => {
      const nombre = action.payload.nombre
      const id = action.payload.id

      const storeIndex = state.tiendas.findIndex(
        (tienda) => tienda.nombre === nombre
      )

      const weekIndex = state.tiendas[storeIndex].weeks.findIndex(
        (week) => week.weekId === id
      )

      const currentWeek = state.tiendas[storeIndex].weeks[weekIndex]

      currentWeek.presupuestoTotal =
        currentWeek.presupuestoTotal + state.tiendas[storeIndex].residuoGlobal

      state.tiendas[storeIndex].weeks.forEach((week) => {
        if (week.weekId !== currentWeek.weekId) week.residuoGastado = true
      })
      // recalcularResiduoGlobal(state.tiendas[storeIndex])
      state.tiendas[storeIndex].residuoGlobal = 0

      dividirPresupuesto(
        currentWeek.publicaciones,
        state.tiendas[storeIndex].weeks[weekIndex]
      )
      calcularResiduoActual(currentWeek)
    },

    updatePublication: (state, action) => {
      const id = action.payload.id
      const current = action.payload.current
      const value = action.payload.value

      const storeIndex = state.tiendas.findIndex(
        (tienda) => tienda.nombre === current.name
      )

      const weekIndex = state.tiendas[storeIndex].weeks.findIndex(
        (week) => week.weekId === current.week
      )

      const publicacionIndex = state.tiendas[storeIndex].weeks[
        weekIndex
      ].division.findIndex((publicacion) => publicacion.id === id)

      const currentWeek = state.tiendas[storeIndex].weeks[weekIndex]

      recalcularPublicaciones(currentWeek, value, publicacionIndex)
      calcularResiduoActual(currentWeek)
    },

    updateSocialMediaDist: (state, action) => {
      const id = action.payload.id
      const value = action.payload.value
      const social = action.payload.social
      const current = action.payload.current

      const storeIndex = state.tiendas.findIndex(
        (tienda) => tienda.nombre === current.name
      )

      const weekIndex = state.tiendas[storeIndex].weeks.findIndex(
        (week) => week.weekId === current.week
      )

      const publicacionIndex = state.tiendas[storeIndex].weeks[
        weekIndex
      ].division.findIndex((publicacion) => publicacion.id === id)

      const currentWeek = state.tiendas[storeIndex].weeks[weekIndex]

      const data = currentWeek.division[publicacionIndex]

      recalcularSocialMedia(data, social, value)
      calcularResiduoActual(currentWeek)
    },

    updateResiduo: (state, action) => {
      const id = action.payload.id
      const value = action.payload.value
      const social = action.payload.social
      const current = action.payload.current

      const storeIndex = state.tiendas.findIndex(
        (tienda) => tienda.nombre === current.name
      )

      const weekIndex = state.tiendas[storeIndex].weeks.findIndex(
        (week) => week.weekId === current.week
      )

      const currentWeek = state.tiendas[storeIndex].weeks[weekIndex]

      const publicacionIndex = currentWeek.division.findIndex(
        (publicacion) => publicacion.id === id
      )

      if (social === "instagram") {
        currentWeek.division[publicacionIndex].distribucion.instagram.out =
          value
      }

      if (social === "facebook") {
        currentWeek.division[publicacionIndex].distribucion.facebook.out = value
      }

      const dist = currentWeek.division[publicacionIndex]

      const residuoFacebook =
        dist.distribucion.facebook.in - dist.distribucion.facebook.out

      const residuoInstagram =
        dist.distribucion.instagram.in - dist.distribucion.instagram.out

      currentWeek.division[publicacionIndex].residuo =
        residuoFacebook + residuoInstagram

      calcularResiduoActual(currentWeek)
    },
  },
})

export const {
  createNewStore,
  updatePublicationsDist,
  createWeek,
  updateMasterTienda,
  addLastResidue,
  addGlobalResidue,
  updatePublication,
  updateSocialMediaDist,
  updateResiduo,
} = dataSlice.actions

export default dataSlice.reducer
