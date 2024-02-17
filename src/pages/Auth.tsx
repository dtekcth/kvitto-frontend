import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsAuth, unsetIsAuth } from '../store/store'
import { getUser } from '../api/login'

export const Auth = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const jwt = getCookie('jwttoken')
    if (jwt != null) {
      dispatch(setIsAuth())
      deleteCookie('jwttoken')
      localStorage.setItem('jwttoken', jwt)

      getUser()
        .then(result => {
          if (result instanceof Error) {
            dispatch(unsetIsAuth())
            navigate('/')
          } else {
            console.log(JSON.stringify(result))
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/admin')
          }
        })
        .catch(() => {
          dispatch(unsetIsAuth())
          navigate('/')
        })
    }
  })

  return (
    <div style={{ margin: 'auto' }}>Please wait, we are signing you in...</div>
  )
}

function getCookie(name: string): string | null {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  console.log(ca)
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function deleteCookie(name: string): void {
  document.cookie = name + '=; Max-Age=-99999999;'
}
