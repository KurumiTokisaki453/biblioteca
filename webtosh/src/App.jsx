import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from './Componentes/header'
import { Footer } from './Componentes/footer'
import { Libro } from './pages/libro'
import { Testing } from './pages/testing'
import './App.css'
import { Portal } from "./pages/portada";


function App() {
  return (
    <BrowserRouter>
    <div>
      {/* <Navigation/> */}
      <Header/>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>} />
          <Route path="/home" element={<Libro/>} />
          <Route path='/portal' element={<Portal />} />
          <Route path="/testing" element={<Testing />} />
          {/* <Route path='/2' element={<NewPage/>} /> */}
        </Routes>
      </div>
      <Footer/>
    </div>
  </BrowserRouter>
  )
}

export default App
