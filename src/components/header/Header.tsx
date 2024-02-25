import { UserData } from '../../api/login'
import { useAppSelector } from '../../store/store'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import DataLogga from '../Datalogga.svg'

import { useEffect, useState } from 'react'
import { ProfilePic } from './HeaderStyles'
import { useMediaQuery } from '@uidotdev/usehooks'
import { SMALL_MEDIA_QUERY } from '../../styles'
import { useNavigate } from 'react-router-dom'

export const Header = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<UserData | null>(null)
  const navigate = useNavigate()

  const isSmallDevice = useMediaQuery(SMALL_MEDIA_QUERY)

  const isAuth = useAppSelector(state => state.auth.isAuth)

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
  }, [isAuth])

  const onSelect = (uri: string | null) => {
    if (uri) {
      navigate(uri)
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="navbar">
      <Container>
        <Navbar.Brand as="div">
          <ProfilePic src={DataLogga}></ProfilePic>
        </Navbar.Brand>

        {isSmallDevice ? (
          <div>
            {userData ? (
              <>
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
          <Nav className="me-auto" onSelect={onSelect}>
            <Nav.Link as="div" href="/">
              Form
            </Nav.Link>
            <Nav.Link as="div" href="/purchases">
              Purchases
            </Nav.Link>

            <Nav.Link as="div" href="/committees">
              Committees
            </Nav.Link>
            <Nav.Link as="div" href="/users">
              Users
            </Nav.Link>
            {isSmallDevice ? (
              <>
                <hr className="hr" />
                {userData ? (
                  <>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link href="/login">Login</Nav.Link>
                )}
              </>
            ) : (
              <></>
            )}
          </Nav>
          {!isSmallDevice ? (
            <>
              {userData ? (
                <>
                  <Nav>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                  </Nav>
                  <ProfilePic src={userData.picture}></ProfilePic>
                </>
              ) : (
                <Nav>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              )}
            </>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
