import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // React-dom rutas,navegación
import './App.css' // Css, Tailwind...
import { Header } from './Componentes/header' // Header general
import { Footer } from './Componentes/footer' // Footer General
import { Home } from './pages/home' // Home, página principal
import { Generos } from "./pages/generos"; // Todo sobre los Géneros, CRUD
import { Tipos } from './pages/tipos';
import { Testing01 } from './pages/testing' // 
import { Portal } from "./pages/portada";
import { FPortada } from "./pages/FPortada";

function App() {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      {/* <Navigation/> */}
      <Header/>
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>} />
          <Route path="/home" element={<Home/>} />
          <Route path='/gender' element={<Generos />} />
          <Route path='/type' element={<Tipos />} />
          <Route path='/portal' element={<Portal />} />
          <Route path='/fportada' element={<FPortada/>} />
          <Route path="/testing" element={<Testing01 />} />
          <Route path="/testing/:id" element={<Testing01 />} />
          {/* <Route path='/2' element={<NewPage/>} /> */}
        </Routes>
      </div>
      <Footer/>
    </div>
  </BrowserRouter>
  )
}

export default App
