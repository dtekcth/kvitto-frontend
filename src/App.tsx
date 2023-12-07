import './App.css'
import { Form } from './pages/Form.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login.tsx';
import { Header } from './components/Header.tsx';
import { NoPage } from './pages/NoPage.tsx';
import { Admin } from './pages/Admin.tsx';

function App(): JSX.Element {
  return (
    <div className="App">
      <Header/>
        <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Form/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/admin"} element={<Admin/>}/>
              <Route path={"*"} element={<NoPage/>}/>
          </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App
