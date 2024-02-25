import React from 'react'
import { Login } from './pages/login/Login'
import { Form } from './pages/form/Form'
import { NoPage } from './pages/nopage/NoPage'
import { Logout } from './pages/logout/Logout'
import { Auth } from './pages/auth/Auth'
import { Purchases } from './pages/purchases/Purchases'
import { Committees } from './pages/commitees/Committees'
import { Users } from './pages/users/Users'

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
    path: '/purchases',
    component: <Purchases></Purchases>,
    isPrivate: true,
  },
  {
    path: '/committees',
    component: <Committees></Committees>,
    isPrivate: true,
  },
  {
    path: '/users',
    component: <Users></Users>,
    isPrivate: true,
  },
  {
    path: '/*',
    component: <NoPage></NoPage>,
    isPrivate: false,
  },
]
