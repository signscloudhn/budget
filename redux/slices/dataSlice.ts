import { createSlice } from "@reduxjs/toolkit"
import { initialDataState as initialState } from "../initialStates"
import { weekCreator } from "../../utils/create"
import { weekDeleter, storeDeleter } from "../../utils/delete"
import {
  equivalentUpdater,
  postUpdater,
  storeEnabler,
} from "../../utils/update"
import { newStoreCreator } from "../../utils/create"
import { weekDateUpdater, fillSocialMedia } from "../../utils/update"
import { state } from "../../interfaces/store"
import {
  SocialMediaDistUpdater,
  spentUpdater,
  storeDisabler,
  globalResidueAdder,
  lastResidueAdder,
} from "../../utils/update"
import {
  weekStoreDateUpdater,
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
      const { stores, weeks } = state
      const payload = action.payload

      newStoreCreator({ stores, weeks, payload })
    },

    createWeek: (state) => {
      const { stores, weeks } = state
      const lastWeek = weeks[weeks.length - 1]

      weekCreator({ weeks, stores, lastWeek })
    },

    deleteWeek: (state, action) => {
      const id = action.payload.id
      const { stores, weeks } = state

      weekDeleter({ id, stores, weeks })
    },

    updateWeekNumber: (state, action) => {
      const weekIndex = state.weeks.findIndex(
        (week) => week.id === action.payload.weekId
      )

      state.weeks[weekIndex].number = action.payload.value
    },

    updateWeekDate: (state, action) => {
      const { weeks } = state
      const { id, date } = action.payload

      weekDateUpdater({ weeks, id, date })
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

    updateWeekStoreDate: (state, action) => {
      const { stores } = state
      const id = action.payload.id
      const name = action.payload.name
      const value = action.payload.value

      weekStoreDateUpdater({ stores, id, name, value })
    },

    updatePublicationsDist: (state, action) => {
      const { stores } = state
      const name = action.payload.name
      const weekId = action.payload.weekId
      const publications = action.payload.publications

      publicationDistUpdater({
        stores,
        name,
        weekId,
        publications,
      })
    },

    updateMasterStore: (state, action) => {
      const { stores } = state
      const budgetInitial = action.payload.budgetInitial
      const globalResidue = action.payload.globalResidue
      const currentStoreIndex = action.payload.storeIndex
      const currentWeekIndex = action.payload.weekStoreIndex

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

    fillSocialMediaDist: (state, action) => {
      const { stores } = state
      const { name, weekId } = action.payload

      fillSocialMedia({ stores, weekId, name })
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
  updateWeekNumber,
  updateWeekDate,
  addLastResidue,
  addGlobalResidue,
  updateMasterStore,
  updateWeekStoreDate,
  updatePublicationsDist,
  updatePostBudget,
  updateEquivalent,
  updateSocialMediaDist,
  fillSocialMediaDist,
  updateSpent,
  deleteWeek,
  deleteStore,
  disableStore,
  enableStore,
} = dataSlice.actions

export default dataSlice.reducer
