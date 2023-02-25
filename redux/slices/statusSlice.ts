import { createSlice } from "@reduxjs/toolkit"
import { initialStatusState as initialState } from "../initialStates"

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setInitial: (state) => {
      state.loading = "idle"
      state.error = null
    },
    setPending: (state) => {
      state.loading = "pending"
    },
    setError: (state, action) => {
      state.loading = "rejected"
      state.error = action.payload
    },
    setSuccess: (state) => {
      state.loading = "success"
    },
  },
})

export const { setPending, setError, setSuccess, setInitial } =
  statusSlice.actions

export default statusSlice.reducer
