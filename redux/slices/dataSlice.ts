import { createSlice } from "@reduxjs/toolkit"
import {
  dividirPresupuesto,
  recalcularResiduoGlobal,
} from "../../utils/calculations"
import { initialDataState as initialState } from "../initialStates"

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
    },

    updatePublication: (state, action) => {},
  },
})

export const {
  createNewStore,
  updatePublicationsDist,
  createWeek,
  updateMasterTienda,
  addLastResidue,
  addGlobalResidue,
} = dataSlice.actions

export default dataSlice.reducer
