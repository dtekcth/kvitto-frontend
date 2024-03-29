import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsAuth, unsetIsAuth } from '../../store/store'
import { getUser } from '../../api/login'

export const Auth = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [noAccount, setNoAccount] = useState(false)

  useEffect(() => {
    const jwt = getCookie('jwttoken')
    if (jwt != null) {
      deleteCookie('jwttoken')
      if (jwt == 'noaccount') {
        setNoAccount(true)
        dispatch(unsetIsAuth())
        return
      }
      deleteCookie('jwttoken')
      localStorage.setItem('jwttoken', jwt)

      getUser()
        .then(result => {
          if (result instanceof Error) {
            dispatch(unsetIsAuth())
            navigate('/')
          } else {
            dispatch(setIsAuth())
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
          }
        })
        .catch(() => {
          dispatch(unsetIsAuth())
          navigate('/')
        })
    }
  })

  return (
    <div>
      {noAccount ? (
        <div>You lack permissions to do anything.</div>
      ) : (
        <div>Signing you in...</div>
      )}
    </div>
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
