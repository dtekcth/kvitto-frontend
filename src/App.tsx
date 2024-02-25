import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header.tsx'
import { routes, AppRouteInterface } from './routes.tsx'
import { AppRoute } from './components/AppRoute.tsx'
import { useDispatch } from 'react-redux'
import { unsetIsAuth } from './store/store.ts'
import { getUser } from './api/login.tsx'
import { useEffect } from 'react'

function App(): JSX.Element {
  const dispatch = useDispatch()
  useEffect(() => {
    getUser()
      .then(result => {
        if (result instanceof Error) {
          dispatch(unsetIsAuth())
          localStorage.removeItem('jwttoken')
          localStorage.removeItem('user')
        }
      })
      .catch(() => {
        dispatch(unsetIsAuth())
        localStorage.removeItem('jwttoken')
        localStorage.removeItem('user')
      })
  })

  return (
    <div className="App">
      <div className="router">
        <BrowserRouter>
          <Header />

          <Routes>
            {routes.map((route: AppRouteInterface) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <AppRoute
                    path={route.path}
                    component={route.component}
                    isPrivate={route.isPrivate}
                  ></AppRoute>
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
