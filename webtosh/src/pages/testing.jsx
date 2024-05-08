import Decimal from 'decimal.js';
import {DecimalStart, Start, StartVoid } from "../assets/start.jsx"
import { useEffect, useState, version } from 'react'
import { getOneData } from '../api/api_toshokan';
import { useNavigate, useParams } from 'react-router-dom'
import { calcularStart } from "../Componentes/calificacion.jsx"

export const Testing = () => {
  // Estado para almacenar los campos de entrada adicionales
  const [camposAdicionales, setCamposAdicionales] = useState([{ nombre: '', descripcion: '' }]);
  
  // Función para agregar campos de entrada adicionales
  const agregarCampo = () => {
    // Verificar si el último campo está vacío antes de agregar uno nuevo
    // const ultimoCampo = camposAdicionales[camposAdicionales.length - 1];
    // if (ultimoCampo.nombre.trim() !== '' || ultimoCampo.descripcion.trim() !== '') {
      setCamposAdicionales([...camposAdicionales, { nombre: '', descripcion: '' }]);
    // }
  };
  const handleChange = (index, event) => {
    const { name, value } = event.target;   // name = llave del diccionario, value= valor del diccionario
    const nuevosCampos = [...camposAdicionales];  //acctualización de campos adicionales?
    nuevosCampos[index][name] = value;    // guarda las variables para poder ingresarlos a los nuevos campos adicionales
    setCamposAdicionales(nuevosCampos);
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // evita actualizar la página
    console.log(camposAdicionales, "Estos son los campos adicionales...");
    const camposNoVacios = camposAdicionales.filter((campo) => campo.nombre.trim() !== '' && campo.descripcion.trim() !== '');
    console.log(camposNoVacios, "Estos son los campos sin vacios adicionales...");
    // Aquí puedes manejar la lógica para enviar los datos al servidor
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 pb-8">
      {/* Campos de entrada adicionales */}
      {camposAdicionales.map((campo, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            name='nombre'
            placeholder={`Nombre ${index} `}
            value={campo.nombre}
            onChange={(e) => handleChange(index, e)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            name='descripcion'
            placeholder={`Descripción ${index} `}
            value={campo.descripcion}
            onChange={(e) => handleChange(index, e)}
            className="w-full px-3 py-2 mt-2 border rounded-md"
          />
        </div>
      ))}
  
      {/* Botón para agregar más campos */}
      <button type="button" onClick={agregarCampo} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4">Agregar más</button>
  
      {/* Botón de enviar */}
      <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Enviar</button>
    </form>
  );
};

// const Dwecimal = require('decimal.js');
const VERSIONES = {  // Link de django
  1: 1,   // "v01-usuario",
  2: 2,   // "v02-autor",
  3: 3,   // "v03-libro",
  4: 4,   // "v04-tipo",
  5: 5,   // "v05-librotipo",
  6: 6,   // "v06-genero",
  7: 7,   // "v07-librogenero",
  8: 8,   // "v08-puntaje",
  9: 9,   // "v09-nombre",
  10: 10, // "v10-libroautor",
  11: 11, // "v11-librocapitulo",
  12: 12, // "v12-generofilter",
  13: 13, // "v13-nombresfilter",
  14: 14, // "v14-librotipo",
  15: 15, // "v15-libropuntaje",
  16: 16, // "v16-autorfilter",
  17: 17, // "v17-capitulofilter",
}
export function Testing01() {

  const navegar = useNavigate()
  const paramet = useParams()
  console.log(paramet, "Esto es el paramet, y el id es: ", paramet.id)
  const [Libro, setLibro] = useState([]);
  const [Libro_Generos, setLibro_Generos] = useState([]); const [Libro_Nombres, setLibro_Nombres] = useState([]); const [Libro_Tipos, setLibro_Tipos] = useState([]); const [Libro_Autores, setLibro_Autores] = useState([]); const [Libro_Capitulos, setLibro_Capitulos] = useState([]);

  useEffect(() => {
    async function loadgetData_libro() { // obtener todos los datos a traves del --ID-- del Libro
      if (paramet.id){
        const libro = (await getOneData(3, paramet.id)).data;
        setLibro(libro)
        const generos_libro = (await getOneData(12, paramet.id)).data;
        setLibro_Generos(generos_libro);
        const nombresal_libro = (await getOneData(13, paramet.id)).data;
        setLibro_Nombres(nombresal_libro);
        const tipos_libro = (await getOneData(14, paramet.id)).data;
        setLibro_Tipos(tipos_libro);
        const autores_libro = (await getOneData(16, paramet.id)).data;
        setLibro_Autores(autores_libro);
        const capitulo_libro = (await getOneData(17, paramet.id)).data;
        setLibro_Capitulos(capitulo_libro);
      }
    }
    loadgetData_libro();
  }, [])
 
  // Diccionario para buscar estrellas
  const Sestrellas = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }
  // start = Objeto decimal por Decimal(), calcular = Decimal primitivo
  let start; let startInt; let startFloat;
  if (calcularStart()>0) {
    start = new Decimal(calcularStart());
    // StartInt = Entero de ( Objeto decimal a primitivo de js)
    startInt = Math.floor(start.toNumber());
    // StartFloat = (minus=resta de objetos)(busqueda en biblioteca Sestrellas)
    startFloat = start.minus(Sestrellas[startInt]);
    // console.log(parseFloat(startFloat.toString()), "StartFloat"); // Output: 0.493
    // console.log(startInt, "Start int");  // Eliminar cosole logs
  } else { start = 0; startInt = 0; startFloat = 0;}
  var tituloclas = " text-3xl tracking-tight text-left line-clamp-2 hover:line-clamp-3 font-semibold break-words hyphens-auto text-wrap whitespace-pre-line"
  let img01="https://m.media-amazon.com/images/I/91-tAXfHPCL._SY342_.jpg"

  // const { entrada } = props;
  let estrellaLlena = []; let estrellaDecimal = []; let estrellaVacia = [];
  if (startInt>0) {
    estrellaLlena = Array.from({ length: startInt }, (_, index) => (
      <div key={index}><Start/></div> ));
  } else {estrellaLlena = <div><StartVoid/><StartVoid/><StartVoid/><StartVoid/><StartVoid/></div>}
  let restante = 5-startInt;
  if (startFloat>0) {
    restante -= 1;
    estrellaVacia = Array.from({ length: restante }, (_, index) => (
      <div key={index}><StartVoid/></div> ));
    estrellaDecimal = <div ><DecimalStart value={startFloat} /></div>;
  } else {
    estrellaVacia = Array.from({ length: restante }, (_, index) => (
      <div key={index}><StartVoid/></div> ));
  }

  let imgur01 = "https://i.imgur.com/uQe1MyF.jpeg"
  // Crear un array de longitud 'entrada' y llenarlo con elementos <div>

  return (
  <div className="grid bg-red-800 text-white py-5 px-10 "> {/* crear marco 10 columnas en grid */}
    <div className="grid grid-cols-3 bg-red-500 border-4 max-w-screen-2xl min-w-full border-fuchsia-500/75 rounded-md">
        {/* Título */}
        <label className="col-span-3 flex px-2 max-w-full py-2 text-green-200 bg-green-600">
          <h2 className={tituloclas}> {Libro.titulo} </h2>
        </label> 
        {/* Contenido (imagen, sinopsis, detalles) */}
      <div className="grid grid-cols-5 col-span-3 space-x-6 content-center bg-gray-800 p-6">
        {/* Imagen */}
        <div className="content-center max-w-1/4 bg-gray-600" >
          <img className='rounded-lg' src={Libro.perfil} alt="Imágen del libro" />
        </div>
        {/* sinopsis, publicacion, estado, idioma */}
        <div className="col-span-2 basis-1/3  text-orange-600 bg-emerald-700"> {/* Características */}
          {Libro_Tipos.map((objeto, index) => ( <div className='block' key={index}><span className='mr-1'>Tipo: </span> <span>{objeto.tipo_nombre}</span> </div> ))}
          {Libro_Capitulos.map((objetos, index) => ( <div key={index}>
            {objetos.capitulo && <> <span>Capítulos: </span> <span> {objetos.capitulo} </span></> }
            {objetos.volumen && <> <span>| Volúmenes: </span> <span> {objetos.volumen} </span></> }</div>
          ))}
          {/* <div className="block" > <span>Capítulos:</span> <span className="pl-1 rounded w-1/4 h-5" > {Libro_Capitulos[0].capitulo} | {Libro_Capitulos[0].volumen} </span> </div> */}
          {Libro_Autores.map((objeto,indexacion) => ( <div key={indexacion} className="block" >
            <span> {objeto.descripcion}: </span><span> {objeto.autor_nombre.toLowerCase()} {objeto.autor_apellido.toLowerCase()} </span>
          </div>))}
          <div className="block" > <span>Generos: </span>
            {Libro_Generos.map((objeto,indexacion)=> ( <span key={indexacion} > {objeto.nombre_genero} </span> ))}
          </div>
          <div className="block" > <span>Última de publicación:</span> <span>ul_publicacion</span> </div>
          <div className="block" > <span>Publicación: </span> <span className="pl-1 rounded w-1/4 h-5">{Libro.publicacion}</span> </div> 
          <div className="block" > <span>Estado:</span> <span className="pl-1 rounded w-1/4 h-5" > {Libro.estado} </span> </div>
          <div className="block" > <span>Idioma:</span> <span className="pl-1 rounded w-1/4 h-5" > {Libro.idioma} </span> </div>
          {Libro_Nombres.map((objeto,indexacion) => ( <div key={indexacion} className="block" >
            <span> {objeto.descripcion}: </span><span> {objeto.nombre} </span>
          </div>))}
          <div className="flex"><span className="pr-1">Puntaje:</span>
            {estrellaLlena}{estrellaDecimal}{estrellaVacia}{start.toString()}
          </div>

        </div>
        <div className="col-span-2 basis-1/3 flex flex-col text-cian-800 bg-emerald-600"> {/* Sinopsis */}
            <span className="block">Sinopsis: </span>
            <p> {Libro.sinopsis} </p>
        </div>
          {/* <p > {Libroid.sinopsis} Esta es una historia protagonizada por aquella chica que es conocida por todos como el peor espíritu, Kurumi Tokisaki. En cierta ocasión, se encontró con una joven con amnesia que la había llevado ante otras tantas chicas conocidas como Quasí-espíritus, las cuales estaban dispuestas a matarse entre sí. A partir de ahí, empieza la historia de Kurumi que no había sido contada hasta ahora.</p> */}
      </div>
      {/* Enlaces Externos */}
      <div className="col-span-3 bg-yellow-800 text-lg rounded-lg w-1/2 m-auto h-auto justify-center content-center space-x-2">
        <span className="px-4">Enlaces de Visualización: </span>
        <div className="px-2 space-x-2"><a className="underline text-pink-300 hover:text-sky-400 decoration-cyan-300 text-ellipsis underline-offset-2 overflow-hidden after:content-['_↗🛫'] " href="https://novelasligera.com/novela/la-vida-despues-de-la-muerte/">The Beginning After The End</a>
          <span className="cursor-pointer hover:text-blue-500" title="Actualización: 10-10-2024"  >Último Capítulo: 350/474</span>
        <span>Web: <a className="text-pink-300 hover:text-sky-400 after:content-['_↗'] ..." href="https://novelasligera.com/" target="_blank">novelasligera</a></span> </div>
      </div>
      <div className="col-span-3 px-center justify-center content-center bg-orange-500 ">
        <div className="text-gray-600 ml-10 text-lg">
          <span className=" bg-gray-100  ">Relacionados: </span>
        </div>
        <div className="grid grid-rows-1 grid-flow-col bg-emerald-500 justify-evenly py-4 overflow-x-auto gap-4 px-4 " >
          <div className="min-w-52 max-w-64 "> <img className="box-border" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64 "> <img className="box-border " src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64 "> <img className="box-border" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64 "> <img className="box-border" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64 "> <img className="box-border" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64 "> <img className="box-border" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64 "> <img className="box-border" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64 "> <img className="box-border" src={imgur01} alt="Kurumi Tokisaki 01" /> </div>
          
        </div>
      </div>
    </div>
  </div>
  )
}