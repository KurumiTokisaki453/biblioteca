import Ayano from "../img/Ayanokouji-Kiyotaka-01.jpeg"
import SearchIcon from '../assets/search_fonts_google.svg';
import menuIcon from "../assets/menu_fonts_01.svg"
import { Link, useLocation } from "react-router-dom"

export function Header () {
  var justify_header = "justify-between"
  // var bg_gris = "bg-gray-700"
  // justify_header= "justify-around"
  const location = useLocation();
  const rutaActual = location.pathname;
  let LinkTo01 = rutaActual.charAt(1).toUpperCase()+rutaActual.substring(2);
  console.log(LinkTo01,"Es esto mi ruta actual...")
  return (
<div lang="es" className={`flex ${justify_header} min-h-10 max-h-12 text-white bg-lime-800`}>
      
  <div className="grid content-center px-2 bg-gray-500">
    <Link className="flex sm:flex md:flex lg:hidden xl:hidden" to="home ">
      <div >
        <img src={menuIcon} className=" size-full p-2 pointer-events-none" alt="Búsqueda" />
        {/* Contenido visible en pantallas pequeñas y medianas */}
      </div>
    </Link>
      <div className="flex space-x-3 px-3 bg-cyan-600 hidden sm:hidden md:hidden lg:flex xl:flex ">
        <Link className="bg-lime-500 px-1 " to="home" > <div className="bg-red-500" >Home</div> </Link>
        <Link className="bg-lime-500 px-1 " to="portal" > <div className="bg-blue-700 ">Portal</div> </Link>
        <Link className="bg-lime-500 px-1 " to="fportada" > <span>FormPortd</span> </Link>
        <Link className="bg-lime-500 px-1 " to="gender" > <span>Gender</span> </Link>
        <Link className="bg-lime-500 px-1 " to="type" > <span>Type</span> </Link>
        <Link className="bg-lime-500 px-1 " to="testing" > <div className="bg-black">Testing</div> </Link>
        <Link className="bg-lime-500 px-1 " to="formcard" > <div className="bg-black">FormCard</div> </Link>
      </div>
  </div>

  <div className="p-1 flex flex-row justify-self-center bg-gray-700 pointer-events-auto ">
    <input
      type="text" placeholder="Buscar..."
      className="bg-gray-500 text-white py-2 px-10 rounded-l-lg pl-5 focus:outline-none focus:ring focus:border-blue-300"/>
    <div className="flex items-center grid w-10 justify-items-center rounded-r-lg bg-blue-500 ">
      <img src={SearchIcon} className="h-5 w-5 pointer-events-none" alt="Búsqueda" />
    </div>
  </div>

  <div className="flex justify-self-center bg-gray-500">
    <Link className=" flex bg-green-900" to="home">
      <div className=" content-center max-w-10 bg-green-500" >
        <img className="box-border " src={Ayano} alt="Descripción de la imagen" />
      </div>
      <div className="max-w-24 mr-4 ml-2 content-center bg-gray-400"><span className="line-clamp-2 align-middle leading-5 hyphens-auto bg-red-400">Ayanokouji Kiyotaka</span></div>
    </Link>
  </div>
</div>
  )
};