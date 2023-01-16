import { createSlice } from "@reduxjs/toolkit"
import {
  calcularResiduoActual,
  dividirPresupuesto,
  recalcularResiduoGlobal,
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
      })
    },

    updatePublicationsDist: (state, action) => {
      const tiendaIndex = action.payload.tiendaIndex
      const weekIndex = action.payload.weekIndex
      const weekToUpdate = state.tiendas[tiendaIndex].weeks[weekIndex]

      state.tiendas[tiendaIndex].weeks[weekIndex].division = []
      state.tiendas[tiendaIndex].weeks[weekIndex].publicaciones =
        action.payload.publicaciones

      dividirPresupuesto(action.payload.publicaciones, weekToUpdate)

      calcularResiduoActual(state.tiendas[tiendaIndex].weeks[weekIndex])
    },

    updateMasterTienda: (state, action) => {
      const presupuestoInicial = action.payload.presupuestoInicial
      const residuoGlobal = action.payload.residuoGlobal
      const currentStoreIndex = action.payload.currentStoreIndex
      const currentWeekIndex = action.payload.currentWeekIndex
      const sumarResiduoAnterior = action.payload.sumarResiduoAnterior

      const currentWeek =
        state.tiendas[currentStoreIndex].weeks[currentWeekIndex]
      const lastWeek =
        state.tiendas[currentStoreIndex].weeks[currentWeekIndex - 1]

      if (state.tiendas[currentStoreIndex].residuoGlobal != residuoGlobal) {
        state.tiendas[currentStoreIndex].residuoGlobal = residuoGlobal

        state.tiendas[currentStoreIndex].weeks.forEach((week) => {
          week.residuoGastado = true
        })
      }

      currentWeek.presupuestoInicial = presupuestoInicial

      if (sumarResiduoAnterior) {
        currentWeek.presupuestoTotal =
          currentWeek.presupuestoInicial + lastWeek.residuo
        lastWeek.residuoGastado = true

        recalcularResiduoGlobal(state.tiendas[currentStoreIndex])
      } else {
        currentWeek.presupuestoTotal = presupuestoInicial
      }

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

      if (!state.tiendas[storeIndex].weeks[weekIndex - 1].residuoGastado) {
        state.tiendas[storeIndex].weeks[weekIndex].presupuestoTotal =
          state.tiendas[storeIndex].weeks[weekIndex].presupuestoTotal +
          state.tiendas[storeIndex].weeks[weekIndex - 1].residuo

        state.tiendas[storeIndex].weeks[weekIndex - 1].residuoGastado = true
      }

      recalcularResiduoGlobal(state.tiendas[storeIndex])
      dividirPresupuesto(
        state.tiendas[storeIndex].weeks[weekIndex].publicaciones,
        state.tiendas[storeIndex].weeks[weekIndex]
      )

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

      state.tiendas[storeIndex].weeks[weekIndex].presupuestoTotal =
        state.tiendas[storeIndex].weeks[weekIndex].presupuestoTotal +
        state.tiendas[storeIndex].residuoGlobal

      state.tiendas[storeIndex].weeks.forEach((week) => {
        week.residuoGastado = true
      })
      recalcularResiduoGlobal(state.tiendas[storeIndex])

      dividirPresupuesto(
        state.tiendas[storeIndex].weeks[weekIndex].publicaciones,
        state.tiendas[storeIndex].weeks[weekIndex]
      )
      calcularResiduoActual(state.tiendas[storeIndex].weeks[weekIndex])
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

      recalcularPublicaciones(
        state.tiendas[storeIndex].weeks[weekIndex],
        value,
        publicacionIndex
      )
      calcularResiduoActual(state.tiendas[storeIndex].weeks[weekIndex])
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

      const data =
        state.tiendas[storeIndex].weeks[weekIndex].division[publicacionIndex]

      recalcularSocialMedia(data, social, value)
      calcularResiduoActual(state.tiendas[storeIndex].weeks[weekIndex])
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

      const publicacionIndex = state.tiendas[storeIndex].weeks[
        weekIndex
      ].division.findIndex((publicacion) => publicacion.id === id)

      if (social === "instagram") {
        state.tiendas[storeIndex].weeks[weekIndex].division[
          publicacionIndex
        ].distribucion.instagram.out = value
      }

      if (social === "facebook") {
        state.tiendas[storeIndex].weeks[weekIndex].division[
          publicacionIndex
        ].distribucion.facebook.out = value
      }

      const dist =
        state.tiendas[storeIndex].weeks[weekIndex].division[publicacionIndex]

      const residuoFacebook =
        dist.distribucion.facebook.in - dist.distribucion.facebook.out

      const residuoInstagram =
        dist.distribucion.instagram.in - dist.distribucion.instagram.out

      state.tiendas[storeIndex].weeks[weekIndex].division[
        publicacionIndex
      ].residuo = residuoFacebook + residuoInstagram

      calcularResiduoActual(state.tiendas[storeIndex].weeks[weekIndex])
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
