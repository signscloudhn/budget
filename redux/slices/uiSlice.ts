import { createSlice } from "@reduxjs/toolkit"
import { initialUiState as initialState } from "../initialStates"

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setLoading } = uiSlice.actions

export default uiSlice.reducer
