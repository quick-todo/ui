import { createSlice } from '@reduxjs/toolkit'

interface ErrorState {
  error: string
  success: string
}

const initialState: ErrorState = {
  success: 'Success!!',
  error: ''
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload
    },

    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { setError } = errorSlice.actions
export default errorSlice.reducer