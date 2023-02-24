import { combineReducers } from "redux"
import dataReducer from "./slices/dataSlice"
import statusReducer from "./slices/statusSlice"

const rootReducer = combineReducers({
  data: dataReducer,
  status: statusReducer,
})

export default rootReducer
