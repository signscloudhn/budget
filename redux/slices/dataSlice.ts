import { createSlice, current as Currenator } from "@reduxjs/toolkit"
import { initialDataState as initialState } from "../initialStates"
import { weekCreator } from "../../utils/create"
import { weekDeleter, storeDeleter } from "../../utils/delete"
import {
  equivalentUpdater,
  postUpdater,
  storeEnabler,
} from "../../utils/update"
import { newStoreCreator } from "../../utils/create"
import {
  SocialMediaDistUpdater,
  spentUpdater,
  storeDisabler,
  globalResidueAdder,
  lastResidueAdder,
} from "../../utils/update"
import {
  dateUpdater,
  masterStoreUpdater,
  publicationDistUpdater,
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
      const { stores } = state
      const payload = action.payload

      newStoreCreator({ stores, payload })
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

      weekDeleter({ id, stores, weeks })
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

      publicationDistUpdater({
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

    updatePostBudget: (state, action) => {
      const { stores } = state
      const id = action.payload.id
      const current = action.payload.current
      const value = action.payload.value

      postUpdater({ stores, id, current, value })
    },

    updateEquivalent: (state, action) => {
      const { stores } = state

      const id = action.payload.id
      const current = action.payload.current

      equivalentUpdater({
        stores,
        id,
        current,
      })
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

    updateSpent: (state, action) => {
      const { stores } = state
      const id = action.payload.id
      const value = action.payload.value
      const social = action.payload.social
      const current = action.payload.current

      spentUpdater({
        stores,
        id,
        value,
        social,
        current,
      })
      console.log(Currenator(state))
    },

    deleteStore: (state, action) => {
      const { stores } = state
      const name = action.payload.name

      storeDeleter({ stores, name })
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
  updatePostBudget,
  updateEquivalent,
  updateSocialMediaDist,
  updateSpent,
  deleteWeek,
  deleteStore,
  disableStore,
  enableStore,
} = dataSlice.actions

export default dataSlice.reducer
