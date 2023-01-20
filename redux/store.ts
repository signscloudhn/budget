import { legacy_createStore as createStore } from "redux"
import rootReducer from "./rootReducer"
import { state } from "../interfaces/tienda"

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
    // return undefined
  }
}

const store = createStore(rootReducer, loadFromLocalStorage())
store.subscribe(() => saveToLocalStorage(store.getState()))
// console.log(store.getState())

export default store
