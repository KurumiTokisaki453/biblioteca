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

  return (
<div className={`flex ${justify_header} min-h-10 max-h-12 text-white bg-lime-600`}>

  <div className="flex px-4 bg-gray-500">
    <Link className=" flex space-x-3 pr-2 bg-green-900" to="home">
    <div className=" content-center max-w-10 bg-green-500" >
      <img className="box-border " src={Ayano} alt="Descripción de la imagen" />
    </div>
    <div className="content-center">Ayanokouji</div>
    </Link>
  </div>
      
  <div className="p-1 flex flex-row bg-gray-700 pointer-events-auto ">
    <input
      type="text" placeholder="Buscar..."
      className="bg-gray-500 text-white py-2 px-10 rounded-l-lg pl-5 focus:outline-none focus:ring focus:border-blue-300"/>
    <div className="flex items-center grid w-10 justify-items-center rounded-r-lg bg-blue-500 ">
      <img src={SearchIcon} className="h-5 w-5 pointer-events-none" alt="Búsqueda" />
    </div>
  </div>
      
  <div className=" bg-gray-500">
    <Link to="home">
      <img src={menuIcon} className=" size-full p-2 pointer-events-none" alt="Búsqueda" />
    </Link>
  </div>
</div>
  )
};