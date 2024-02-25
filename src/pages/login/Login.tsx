import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import { getLogin, getUser } from '../../api/login'

export interface LoginForm {
  username: string
  password: string
}

export const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const isAuth = useAppSelector(state => state.auth.isAuth)
  getUser().then(result => {
    console.log(result)
  })
  if (isAuth) {
    navigate('/')
  } else {
    getLogin()
  }

  return <div></div>
}
