import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header.tsx'
import { routes, AppRoute, AppRouteInterface } from './routes.tsx'
import { AuthProvider } from './auth/reduce-context.tsx'

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="router">
        <BrowserRouter>
          <Header />
          <AuthProvider>
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
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
