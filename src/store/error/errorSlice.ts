import { createSlice } from '@reduxjs/toolkit'

interface ErrorState {
  error: string
  success: string
}

const initialState: ErrorState = {
  success: '',
  error: ''
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    _setSuccess: (state, action) => {
      state.success = action.payload
    },

    // Use method from action instead
    _setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { _setError, _setSuccess } = errorSlice.actions
export default errorSlice.reducer