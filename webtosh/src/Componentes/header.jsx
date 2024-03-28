import Ayano from "../img/Ayanokouji-Kiyotaka-01.jpeg"
import SearchIcon from '../assets/search_fonts_google.svg';
import menuIcon from "../assets/menu_fonts_01.svg"

export const Header = () => {
  var justify_header = "justify-between"
  // var bg_gris = "bg-gray-700"
  // justify_header= "justify-around"
  return (
<div className={`flex ${justify_header} text-white bg-lime-600`}>
      
  <div className="flex px-4 flex-row space-x-4 bg-gray-500">
    <div className="content-center" >
      <img className="box-border h-11 w-11 bg-green-500" src={Ayano} alt="Descripción de la imagen" />
    </div>
    <div className=" justify-center content-center">Ayanokouji</div>
  </div>
      
  <div className="p-2 flex flex-row bg-gray-700 ">
    <input
      type="text" placeholder="Buscar..."
      className="bg-gray-500 text-white py-2 px-10 max-w-96 min-w-24 rounded-l-lg pl-5 focus:outline-none focus:ring focus:border-blue-300"/>
    <div className="flex items-center grid w-10 justify-items-center rounded-r-lg bg-blue-500 ">
      <img src={SearchIcon} className="h-5 w-5 pointer-events-none" alt="Búsqueda" />
    </div>
  </div>
      
  <div className=" bg-gray-500">
    <img src={menuIcon} className=" size-full p-2 pointer-events-none" alt="Búsqueda" />
  </div>
</div>
  )
};