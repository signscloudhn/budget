import {
  applyMiddleware,
  legacy_createStore as createStore,
  Middleware,
} from "redux"
import rootReducer from "./rootReducer"
import { state } from "../interfaces/store"

import { Dispatch } from "redux"
import { setData } from "./slices/dataSlice"
import axios from "axios"

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

export default store
