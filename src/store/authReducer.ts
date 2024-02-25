import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
  isAuth: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuth: false,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsAuth: state => {
      state.isAuth = true
    },
    unsetIsAuth: state => {
      state.isAuth = false
    },
  },
})

export const authReducer = authSlice.reducer
