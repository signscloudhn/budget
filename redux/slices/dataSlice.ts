import { createSlice } from "@reduxjs/toolkit"
import { storeWeeks, tiendas } from "../../interfaces/tienda"
import { dividirPresupuesto } from "../../utils/calculations"

const initialState: tiendas = {
  weeks: [{ id: 1 }, { id: 2 }, { id: 3 }],
  tiendas: [
    {
      nombre: "Villana Antillana 333 Seneca",
      residuoGlobal: 0,
      weeks: [
        {
          weekId: 1,
          // Editable
          presupuestoInicial: 100,
          presupuestoTotal: 100,
          // Editable
          publicaciones: 3,
          division: [
            {
              // Editable y recalculable
              presupuesto: 33,
              distribucion: {
                instagram: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
                facebook: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
              },
              // Se calcula de lo que sobro en la distribucion
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
          ],
          // Se calcula sumando los residuos de cada publicacion
          residuo: 0,
          residuoGastado: false,
        },
        {
          weekId: 2,
          // Editable
          presupuestoInicial: 100,
          presupuestoTotal: 120,
          // Editable
          publicaciones: 2,
          division: [
            {
              // Editable y recalculable
              presupuesto: 33,
              distribucion: {
                instagram: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
                facebook: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
              },
              // Se calcula de lo que sobro en la distribucion
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
          ],
          // Se calcula sumando los residuos de cada publicacion
          residuo: 234,
          residuoGastado: false,
        },
        {
          weekId: 3,
          // Editable
          presupuestoInicial: 100,
          presupuestoTotal: 120,
          // Editable
          publicaciones: 2,
          division: [
            {
              // Editable y recalculable
              presupuesto: 33,
              distribucion: {
                instagram: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
                facebook: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
              },
              // Se calcula de lo que sobro en la distribucion
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
          ],
          // Se calcula sumando los residuos de cada publicacion
          residuo: 24,
          residuoGastado: false,
        },
      ],
    },
  ],
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createNewStore: (state, action) => {
      state.tiendas.push(action.payload)
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
  },
})

export const { createNewStore, updatePublicationsDist, createWeek } =
  dataSlice.actions

export default dataSlice.reducer
