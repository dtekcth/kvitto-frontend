import styling from './styling/header.module.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Header = (): JSX.Element => {
  const [buttonText, setButtonText] = useState('Login')
  const [navigateURL, setNavigateURL] = useState('/login')

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    switch (window.location.pathname) {
      case '/admin': {
        setButtonText('Logout')
        setNavigateURL('/logout')
        break
      }
      default: {
        setButtonText('Admin')
        setNavigateURL('/admin')
      }
    }
  }, [location])

  const onClick = async () => {
    navigate(navigateURL)
  }

  return (
    <div className={styling.header}>
      <h1 className={styling.title}>Utlägg</h1>

      <button onClick={onClick} className={styling.adminbutton}>
        {buttonText}
      </button>
    </div>
  )
}
