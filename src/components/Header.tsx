import { UserData } from '../api/login'
import { useAppSelector } from '../store/store'
import LogoSVG from './Datalogga.svg'
import {
  HeaderDiv,
  LeftHandSide,
  Logo,
  ProfilePic,
  TitleH1,
} from './HeaderStyles'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MenuDropdown, MenuOption } from './MenuDropdown'

export const Header = (): JSX.Element => {
  const [userData, setUserData] = useState<UserData | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  const isAuth = useAppSelector(state => state.auth.isAuth)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user != null) {
      const userObj: UserData = JSON.parse(user)
      setUserData(userObj)
    } else {
      setUserData(null)
    }
  }, [location, isAuth])

  const menuOptions: MenuOption[] = [
    {
      label: 'Form',
      action: () => {
        navigate('/')
      },
    },
    {
      label: 'Admin',
      action: () => {
        navigate('/admin')
      },
    },
  ]

  if (isAuth) {
    menuOptions.push({
      label: 'Logout',
      action: () => {
        navigate('/logout')
      },
    })
  } else {
    menuOptions.push({
      label: 'Login',
      action: () => {
        navigate('/login')
      },
    })
  }

  return (
    <HeaderDiv>
      <TitleH1>
        <Logo src={LogoSVG}></Logo>
        <div>Utlägg</div>
      </TitleH1>
      <LeftHandSide>
        {userData != null ? (
          <ProfilePic src={userData.picture}></ProfilePic>
        ) : (
          <div></div>
        )}
        <MenuDropdown options={menuOptions}></MenuDropdown>
      </LeftHandSide>
    </HeaderDiv>
  )
}
