import React, { ReactNode } from 'react'

import { Navigate } from 'react-router-dom'
import { setIsAuth, useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux'

interface Props {
  component: ReactNode
  path: string
  isPrivate: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [rest: string]: any
}

export const AppRoute = ({ component, isPrivate }: Props) => {
  let isAuth = useAppSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()
  if (localStorage.getItem('jwttoken') != null) {
    dispatch(setIsAuth())
    isAuth = true
  }

  if (isPrivate && !isAuth) {
    return <Navigate to={'/login'} />
  }
  return component
}
