// import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { unsetIsAuth } from '../../store/store'
import { getLogout } from '../../api/login'

export const Logout = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(unsetIsAuth())
    const token = localStorage.getItem('jwttoken')
    if (token) {
      console.log(token)
      getLogout(token)
    }
    localStorage.removeItem('jwttoken')
    localStorage.removeItem('user')
    navigate('/')
  }, [])

  return <div>Goodbye!</div>
}
