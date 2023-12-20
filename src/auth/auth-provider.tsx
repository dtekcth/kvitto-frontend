import { ReactNode, createContext, useContext } from 'react'
import { Navigate } from 'react-router-dom'

export interface Auth {
  loggedIn: boolean
}

export const AuthContext = createContext<Auth>({ loggedIn: false })

export function useAuth(): Auth {
  return useContext(AuthContext)
}

export function Protected({ children }: { children: ReactNode }) {
  const { loggedIn } = useAuth()
  console.log(loggedIn)
  if (loggedIn) {
    children
  } else {
    return <Navigate to="/login" />
  }
}
