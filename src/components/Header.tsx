import LogoSVG from './Datalogga.svg'
import { AdminButton, HeaderDiv, Logo, TitleH1 } from './HeaderStyles'

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
    <HeaderDiv>
      <TitleH1>
        <Logo src={LogoSVG}></Logo>
        <div>Utlägg</div>
      </TitleH1>

      <AdminButton onClick={onClick} className="btn btn-primary">
        {buttonText}
      </AdminButton>
    </HeaderDiv>
  )
}
