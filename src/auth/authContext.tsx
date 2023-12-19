import React, { ReactNode, useReducer } from 'react'
import { AuthAction, AuthReducer, AuthState, initialState } from './authReduce'

const AuthStateContext = React.createContext<AuthState>({
  token: localStorage.getItem('credentials') || '',
  loading: false,
  errorMessage: undefined,
})
const AuthDispatchContext =
  React.createContext<React.Dispatch<AuthAction>>(useAuthDispatch)

export function useAuthState() {
  const context = React.useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }

  return context
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState)

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
