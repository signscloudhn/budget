import { createSlice } from "@reduxjs/toolkit"
import {
  calculateCurrentResidue,
  splitBudget,
  generateDate,
  recalculateSocialMedia,
} from "../../utils/calculations"
import { initialDataState as initialState } from "../initialStates"
import { recalculatePublications } from "../../utils/calculations"
import store from "../store"
import { weeks } from "../../interfaces/store"
const { nextWeek } = generateDate()

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createNewStore: (state, action) => {
      const storeExist = state.stores.filter(
        (store) => store.name === action.payload.name
      )

      if (storeExist.length === 0) {
        state.stores.push(action.payload)
      }
    },

    createWeek: (state) => {
      const lastWeekId = state.weeks[state.weeks.length - 1]
      const newWeekId = lastWeekId.id + 1

      // TODO: Agregar date
      const date = lastWeekId.date?.split("-")[1].trim()

      const { startWeek, endWeek } = generateDate(nextWeek(date))

      state.weeks.push({ id: newWeekId, date: `${startWeek} - ${endWeek}` })

      state.stores.forEach((store) => {
        const lastWeek = store.weeks[store.weeks.length - 1]

        const newWeek = {
          id: newWeekId,
          date: undefined,
          budgetInitial: lastWeek.budgetInitial,
          budgetTotal: lastWeek.budgetInitial,
          publications: lastWeek.publications,
          division: [],
          residue: 0,
          residueIsSpend: false,
        }

        splitBudget(lastWeek.publications, newWeek)

        store.weeks.push(newWeek)

        store.globalResidue = store.globalResidue + lastWeek.residue
      })
    },

    deleteWeek: (state, action) => {
      const id = action.payload.id

      const weekIndex = state.weeks.findIndex((week) => week.id === Number(id))

      state.weeks.forEach((week) => {
        if (week.id > state.weeks[weekIndex].id) week.id = week.id - 1
      })

      state.stores.forEach((store) => {
        store.weeks.forEach((week) => {
          if (week.id > state.weeks[weekIndex].id) week.id = week.id - 1
        })
      })

      state.stores.forEach((store) =>
        store.weeks.splice(store.weeks.length - 1, 1)
      )

      state.weeks.splice(weekIndex, 1)

      state.stores.forEach((store) => {
        store.weeks[store.weeks.length - 1].residueIsSpend = false
      })
    },

    updateDate: (state, action) => {
      const id = action.payload.id
      const name = action.payload.name
      const value = action.payload.value

      const storeIndex = state.stores.findIndex((store) => store.name === name)

      const weekIndex = state.stores[storeIndex].weeks.findIndex(
        (week) => week.id === id
      )

      const currentWeek = state.stores[storeIndex].weeks[weekIndex]

      currentWeek.date = value
    },

    updatePublicationsDist: (state, action) => {
      const storeIndex = action.payload.storeIndex
      const weekIndex = action.payload.weekIndex

      const currentWeek = state.stores[storeIndex].weeks[weekIndex]

      currentWeek.division = []
      currentWeek.publications = action.payload.publications

      splitBudget(action.payload.publications, currentWeek)
      calculateCurrentResidue(currentWeek)
    },

    updateMasterStore: (state, action) => {
      const budgetInitial = action.payload.budgetInitial
      const globalResidue = action.payload.globalResidue
      const currentStoreIndex = action.payload.currentStoreIndex
      const currentWeekIndex = action.payload.currentWeekIndex

      const currentWeek =
        state.stores[currentStoreIndex].weeks[currentWeekIndex]

      if (state.stores[currentStoreIndex].globalResidue != globalResidue) {
        state.stores[currentStoreIndex].globalResidue = globalResidue

        state.stores[currentStoreIndex].weeks.forEach((week) => {
          if (week.id !== currentWeek.id) week.residueIsSpend = true
        })
      }

      currentWeek.budgetInitial = budgetInitial
      currentWeek.budgetTotal = budgetInitial

      splitBudget(currentWeek.publications, currentWeek)
      calculateCurrentResidue(currentWeek)
    },

    addLastResidue: (state, action) => {
      const name = action.payload.name
      const id = action.payload.id

      const storeIndex = state.stores.findIndex((store) => store.name === name)

      const weekIndex = state.stores[storeIndex].weeks.findIndex(
        (week) => week.id === id
      )

      const currentWeek = state.stores[storeIndex].weeks[weekIndex]
      const lastWeek = state.stores[storeIndex].weeks[weekIndex - 1]

      if (!lastWeek?.residueIsSpend && lastWeek !== undefined) {
        currentWeek.budgetTotal = currentWeek.budgetTotal + lastWeek.residue
        lastWeek.residueIsSpend = true
      }

      state.stores[storeIndex].globalResidue =
        state.stores[storeIndex].globalResidue - lastWeek.residue

      splitBudget(currentWeek.publications, currentWeek)
      calculateCurrentResidue(state.stores[storeIndex].weeks[weekIndex])
    },

    addGlobalResidue: (state, action) => {
      const name = action.payload.name
      const id = action.payload.id

      const storeIndex = state.stores.findIndex((store) => store.name === name)

      const weekIndex = state.stores[storeIndex].weeks.findIndex(
        (week) => week.id === id
      )

      const currentWeek = state.stores[storeIndex].weeks[weekIndex]

      currentWeek.budgetTotal =
        currentWeek.budgetTotal + state.stores[storeIndex].globalResidue

      state.stores[storeIndex].weeks.forEach((week) => {
        if (week.id !== currentWeek.id) week.residueIsSpend = true
      })
      state.stores[storeIndex].globalResidue = 0

      splitBudget(
        currentWeek.publications,
        state.stores[storeIndex].weeks[weekIndex]
      )
      calculateCurrentResidue(currentWeek)
    },

    updatePublication: (state, action) => {
      const id = action.payload.id
      const current = action.payload.current
      const value = action.payload.value

      const storeIndex = state.stores.findIndex(
        (store) => store.name === current.name
      )

      const weekIndex = state.stores[storeIndex].weeks.findIndex(
        (week) => week.id === current.week
      )

      const publicationIndex = state.stores[storeIndex].weeks[
        weekIndex
      ].division.findIndex((publication) => publication.id === id)

      const currentWeek = state.stores[storeIndex].weeks[weekIndex]

      recalculatePublications(currentWeek, value, publicationIndex)
      calculateCurrentResidue(currentWeek)
    },

    updateSocialMediaDist: (state, action) => {
      const id = action.payload.id
      const value = action.payload.value
      const social = action.payload.social
      const current = action.payload.current

      const storeIndex = state.stores.findIndex(
        (store) => store.name === current.name
      )

      const weekIndex = state.stores[storeIndex].weeks.findIndex(
        (week) => week.id === current.week
      )

      const publicationIndex = state.stores[storeIndex].weeks[
        weekIndex
      ].division.findIndex((publication) => publication.id === id)

      const currentWeek = state.stores[storeIndex].weeks[weekIndex]

      const data = currentWeek.division[publicationIndex]

      recalculateSocialMedia(data, social, value)
      calculateCurrentResidue(currentWeek)
    },

    updateResiduo: (state, action) => {
      const id = action.payload.id
      const value = action.payload.value
      const social = action.payload.social
      const current = action.payload.current

      const storeIndex = state.stores.findIndex(
        (store) => store.name === current.name
      )

      const weekIndex = state.stores[storeIndex].weeks.findIndex(
        (week) => week.id === current.week
      )

      const currentWeek = state.stores[storeIndex].weeks[weekIndex]

      const publicationIndex = currentWeek.division.findIndex(
        (publication) => publication.id === id
      )

      if (social === "instagram") {
        currentWeek.division[publicationIndex].distribution.instagram.out =
          value
      }

      if (social === "facebook") {
        currentWeek.division[publicationIndex].distribution.facebook.out = value
      }

      const dist = currentWeek.division[publicationIndex]

      const residueFacebook =
        dist.distribution.facebook.in - dist.distribution.facebook.out

      const residueInstagram =
        dist.distribution.instagram.in - dist.distribution.instagram.out

      currentWeek.division[publicationIndex].residue =
        Number(residueFacebook.toFixed(2)) + Number(residueInstagram.toFixed(2))

      calculateCurrentResidue(currentWeek)
    },
  },
})

export const {
  createNewStore,
  deleteWeek,
  updateDate,
  updatePublicationsDist,
  createWeek,
  updateMasterStore,
  addLastResidue,
  addGlobalResidue,
  updatePublication,
  updateSocialMediaDist,
  updateResiduo,
} = dataSlice.actions

export default dataSlice.reducer
