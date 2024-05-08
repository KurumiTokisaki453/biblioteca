import { getAllData } from "../api/api_toshokan";
import { useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import Kurumi from "../img/tokisaki.jpg"
import FondoCard from "../img/sky_shiny_02.png"

export const Home = () => {
  // const paramet = useParams()
  const [Libros, setLibros] = useState([])
  useEffect(() => {
    async function CargarAllLibros() { // obtener todos los datos a traves del --ID-- del Libro
      const AllLibros = (await getAllData(3)).data;
      const Libro = AllLibros.map(Libro=>{ return {id: Libro.id, titulo: Libro.titulo, perfil: Libro.perfil}});
      console.log(Libro, "Esto es mi mapeado de libro")
      setLibros(Libro);
    }
    CargarAllLibros();
  }, [])
  let card01="bg-cover bg-center max-w-64  rounded-t-lg rounded-b-lg w-full h-full text-green-200 text-lg font-semibold break-words hyphens-auto text-center text-wrap whitespace-pre-line"
  var titulo = "text-green-200 text-3xl font-semibold break-words hyphens-auto text-center text-wrap whitespace-pre-line"
  let tituloclas = "text-3xl tracking-tight text-left line-clamp-2 hover:line-clamp-3 font-semibold break-words hyphens-auto text-wrap whitespace-pre-line"

  console.log(Libros, "Estos son los libros")
  return (
  <div className=" grid bg-red-800 py-5 px-10 text-white"> {/* crear marco 10 columnas en grid */}
    <div className="grid border-4 max-w-screen-2xl min-w-full bg-red-400 border-fuchsia-500/75 rounded-md">
      {/* grid grid-cols-3 border-4 max-w-screen-2xl min-w-full*/}
      {/* <div className={titulo}>
        arriba - texto
      </div> */}
      <div className="flex px-2 max-w-full py-2 bg-cyan-700 text-green-200 bg-green-600">
          <h2 className={tituloclas}> Arriba - Texto </h2>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-gray-800 p-3">
        {Libros.map((objeto, index)=>(
          <Link key={index} className={card01} to={`/testing/${objeto.id}`}> <div className={card01} style={{ backgroundImage: `url(${FondoCard})` }}> <div >
            {(objeto.titulo) ? <div className="flex items-center justify-center min-h-14"> <h3 title={objeto.titulo} className=" line-clamp-2 overflow-hidden">{objeto.titulo}</h3> </div> : <span>Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu</span> }
            {(objeto.perfil) ? <div className="grid justify-items-center"><img className="box-border rounded-b-lg bg-green-500" src={objeto.perfil} alt="Descripción" /></div>:
            <div className="justify-center" > <img className="box-border rounded-b-lg bg-green-500" src={Kurumi} alt="Descripción" /> </div>} </div> 
            </div>
          </Link>
        ))}
      </div>    
        
    
    
    
    {/* <div className="col-start-1 w-1/2 bg-red-300 ...">02</div>
    <div className="col-end-7 col-span-2 bg-red-500 ...">03</div>
    <div className="col-start-1 col-end-7 bg-red-600 ...">04</div> */}
  </div>
</div>
  )
  
};