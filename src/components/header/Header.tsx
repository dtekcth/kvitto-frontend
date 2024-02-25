import { UserData } from '../../api/login'
import { useAppSelector } from '../../store/store'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import DataLogga from '../Datalogga.svg'

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MenuOption } from '../menu-dropdown/MenuDropdown'
import { ProfilePic } from './HeaderStyles'
import { useMediaQuery } from '@uidotdev/usehooks'

export const Header = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<UserData | null>(null)
  const [expanded, setExpanded] = useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()

  const isSmallDevice = useMediaQuery('only screen and (max-width : 1000px)')

  const isAuth = useAppSelector(state => state.auth.isAuth)
  console.log(expanded)
  const a = document.getElementById('navbar')
  if (a) {
    if (a.offsetHeight) {
      document.documentElement.style.setProperty(
        '--nav-height',
        a.offsetHeight + 'px',
      )
    }
  }

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

  const handleCollapsed = (expanded: boolean) => {
    console.log(expanded)
    setExpanded(expanded)
  }

  return (
    <Navbar
      onToggle={handleCollapsed}
      expand="lg"
      className="bg-body-tertiary"
      id="navbar"
    >
      <Container>
        <Navbar.Brand href="/">
          <ProfilePic src={DataLogga}></ProfilePic>
        </Navbar.Brand>

        {isSmallDevice ? (
          <div>
            {userData ? (
              <>
                <Nav>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
                <ProfilePic src={userData.picture}></ProfilePic>
              </>
            ) : (
              <></>
            )}

            <Navbar.Toggle
              style={{ marginLeft: '30px' }}
              aria-controls="basic-navbar-nav"
            />
          </div>
        ) : (
          <></>
        )}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Form</Nav.Link>
            <Nav.Link href="/purchases">Purchases</Nav.Link>
            <Nav.Link href="/committees">Committees</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {!isSmallDevice ? (
          <Nav>
            {userData ? (
              <>
                <Nav>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
                <ProfilePic src={userData.picture}></ProfilePic>
              </>
            ) : (
              <></>
            )}
          </Nav>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  )
}
