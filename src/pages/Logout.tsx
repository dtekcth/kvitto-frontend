// import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { logout } from '../auth/authReduce'
import { useAuthDispatch } from '../auth/authContext'
import { useNavigate } from 'react-router-dom'

export const Logout = (): JSX.Element => {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    logout(dispatch)
    navigate('/')
  }, [])

  return <div>Goodbye!</div>
}
