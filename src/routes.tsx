import React from 'react'
import { Login } from './pages/Login'
import { Form } from './pages/Form'
import { Admin } from './pages/Admin'
import { NoPage } from './pages/NoPage'
import { Logout } from './pages/Logout'
import { Auth } from './pages/Auth'

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
    path: '/auth',
    component: <Auth />,
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
