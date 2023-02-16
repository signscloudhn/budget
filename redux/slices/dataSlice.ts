import { createSlice } from "@reduxjs/toolkit"
import { initialDataState as initialState } from "../initialStates"
import {
  lastResidueAdder,
  weekCreator,
  globalResidueAdder,
} from "../../utils/create"
import { findStoreIndexWithName } from "../../utils/indexFinder"
import { weekDeleter } from "../../utils/delete"
import { storeEnabler } from "../../utils/update"
import {
  publicationUpdater,
  SocialMediaDistUpdater,
  residueUpdater,
  storeDisabler,
} from "../../utils/update"
import {
  dateUpdater,
  masterStoreUpdater,
  updatePublicationDist,
} from "../../utils/update"

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.stores = action.payload.stores
      state.weeks = action.payload.weeks
    },

    createNewStore: (state, action) => {
      const storeExist = state.stores.filter(
        (store) => store.name === action.payload.name
      )

      if (storeExist.length === 0) {
        state.stores.push(action.payload)
      }
    },

    createWeek: (state) => {
      const { stores, weeks } = state
      const lastWeek = weeks[weeks.length - 1]
      const newWeekId = lastWeek.id + 1

      weekCreator({ weeks, stores, newWeekId, lastWeek })
    },

    deleteWeek: (state, action) => {
      const id = action.payload.id
      const { stores, weeks } = state
      const weekIndex = weeks.findIndex((week) => week.id === Number(id))

      weekDeleter({ id, stores, weeks, weekIndex })
    },

    addLastResidue: (state, action) => {
      const name = action.payload.name
      const id = action.payload.id
      const { stores } = state

      lastResidueAdder({ name, id, stores })
    },

    addGlobalResidue: (state, action) => {
      const { stores } = state
      const name = action.payload.name
      const id = action.payload.id

      globalResidueAdder({ name, id, stores })
    },

    updateDate: (state, action) => {
      const { stores } = state
      const id = action.payload.id
      const name = action.payload.name
      const value = action.payload.value

      dateUpdater({ stores, id, name, value })
    },

    updatePublicationsDist: (state, action) => {
      const { stores } = state
      const storeIndex = action.payload.storeIndex
      const weekIndex = action.payload.weekIndex
      const publications = action.payload.publications

      updatePublicationDist({
        stores,
        storeIndex,
        weekIndex,
        publications,
      })
    },

    updateMasterStore: (state, action) => {
      const { stores } = state
      const budgetInitial = action.payload.budgetInitial
      const globalResidue = action.payload.globalResidue
      const currentStoreIndex = action.payload.currentStoreIndex
      const currentWeekIndex = action.payload.currentWeekIndex

      masterStoreUpdater({
        stores,
        budgetInitial,
        globalResidue,
        currentStoreIndex,
        currentWeekIndex,
      })
    },

    updatePublication: (state, action) => {
      const { stores } = state
      const id = action.payload.id
      const current = action.payload.current
      const value = action.payload.value

      publicationUpdater({ stores, id, current, value })
    },

    updateSocialMediaDist: (state, action) => {
      const { stores } = state
      const id = action.payload.id
      const value = action.payload.value
      const social = action.payload.social
      const current = action.payload.current

      SocialMediaDistUpdater({
        stores,
        id,
        value,
        social,
        current,
      })
    },

    updateResiduo: (state, action) => {
      const { stores } = state
      const id = action.payload.id
      const value = action.payload.value
      const social = action.payload.social
      const current = action.payload.current

      residueUpdater({
        stores,
        id,
        value,
        social,
        current,
      })
    },

    deleteStore: (state, action) => {
      const name = action.payload.name

      const storeIndex = findStoreIndexWithName(state.stores, name)

      state.stores.splice(storeIndex, 1)
    },

    disableStore: (state, action) => {
      const { stores } = state
      const name = action.payload.name

      storeDisabler({ name, stores })
    },

    enableStore: (state, action) => {
      const { stores, weeks } = state
      const name = action.payload.name

      storeEnabler({ stores, weeks, name })
    },
  },
})

export const {
  setData,
  createNewStore,
  createWeek,
  addLastResidue,
  addGlobalResidue,
  updateMasterStore,
  updateDate,
  updatePublicationsDist,
  updatePublication,
  updateSocialMediaDist,
  updateResiduo,
  deleteWeek,
  deleteStore,
  disableStore,
  enableStore,
} = dataSlice.actions

export default dataSlice.reducer
