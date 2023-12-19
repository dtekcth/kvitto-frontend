import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from './auth/authContext'
import { Login } from './pages/Login'
import { Form } from './pages/Form'
import { Admin } from './pages/Admin'
import { NoPage } from './pages/NoPage'
import { Logout } from './pages/Logout'

interface Props {
  component: ReactNode
  path: string
  isPrivate: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [rest: string]: any
}

export interface AppRouteInterface {
  path: string
  component: React.ReactNode
  isPrivate: boolean
}

export const routes: AppRouteInterface[] = [
  {
    path: '/login',
    component: <Login></Login>,
    isPrivate: false,
  },
  {
    path: '/',
    component: <Form></Form>,
    isPrivate: false,
  },
  {
    path: '/logout',
    component: <Logout />,
    isPrivate: false,
  },
  {
    path: '/admin',
    component: <Admin></Admin>,
    isPrivate: true,
  },
  {
    path: '/*',
    component: <NoPage></NoPage>,
    isPrivate: false,
  },
]

export const AppRoute = ({ component, isPrivate }: Props) => {
  const userDetails = useAuthState()
  console.log(userDetails)
  if (isPrivate && !Boolean(userDetails.token)) {
    return <Navigate to={{ pathname: '/login' }} />
  }
  console.log('should be here')
  return component
}
