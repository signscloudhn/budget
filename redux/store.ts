import {
  applyMiddleware,
  legacy_createStore as createStore,
  Middleware,
} from "redux"
import rootReducer from "./rootReducer"
import { state } from "../interfaces/store"

const saveToLocalStorage = (state: state) => {
  try {
    if (typeof window !== "undefined") {
      const serialisedState = JSON.stringify(state)
      localStorage.setItem("state", serialisedState)
    }
  } catch (e) {
    console.warn(e)
  }
}

const loadFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const serialisedState = localStorage.getItem("state")
      if (serialisedState === null) return undefined
      return JSON.parse(serialisedState)
    }
  } catch (e) {
    console.warn(e)
  }
}

import { Dispatch } from "redux"
import { setData } from "./slices/dataSlice"
import axios from "axios"
import { useDispatch } from "react-redux"

// const dispatch = useDispatch()

export const fetchThunk = async (dispatch: Dispatch) => {
  try {
    const response = await fetch("http://localhost:4000")
    const data = await response.json()
    console.log(data)
    dispatch(setData(data.budget))
  } catch (e) {
    console.log(e)
  }
}

export const postThunk = async (_: Dispatch, store: state) => {
  try {
    console.log(store)
    await axios.post("http://localhost:4000", store.data)
  } catch (e) {
    console.log(e)
  }
}

export const asyncMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState())
  }
  return next(action)
}

const store = createStore(rootReducer, applyMiddleware(asyncMiddleware))
// store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
