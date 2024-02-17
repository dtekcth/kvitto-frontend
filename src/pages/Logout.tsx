// import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { unsetIsAuth } from '../store/store'

export const Logout = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(unsetIsAuth())
    localStorage.removeItem('jwttoken')
    localStorage.removeItem('user')
    navigate('/')
  }, [])

  return <div>Goodbye!</div>
}
