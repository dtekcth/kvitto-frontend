import './App.css'
import { Form } from './pages/Form.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login.tsx';
import { Header } from './components/Header.tsx';
import { NoPage } from './pages/NoPage.tsx';

function App(): JSX.Element {
  return (
    <div style={{"margin": "auto", "width": "50%"}} className="App">
      <Header/>
        <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Form/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"*"} element={<NoPage/>}/>
          </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default App
