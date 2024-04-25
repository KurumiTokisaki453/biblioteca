import Kurumi from "../img/tokisaki.jpg"
import Decimal from 'decimal.js';
import {DecimalStart, Start, StartVoid } from "../assets/start.jsx"
import { useEffect, useState, version } from 'react'
import { getAllData, getOneData, createData, updateData, deleteData } from '../api/api_toshokan';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { calcularStart } from "../Componentes/calificacion.jsx"
// const Dwecimal = require('decimal.js');
const VERSIONES = {
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
}
export function FPortada() {
  const {
    register,
    handleSubmit,
    formState : {errors},
    setValue
  } = useForm();
  const navegar = useNavigate()
  const paramet = useParams()
  const [imageUrl, setImageUrl] = useState('');
  const [TiposName, setTiposName] = useState([]);
  const [AutorLbro, setAutorLbro] = useState([]);

  useEffect(() => {   // Cargar los nombres de la base de datos Tipo
    async function cargarNameTipo() {
      try {
        const respuesta = await getAllData(VERSIONES[4]); // con estas entradas 3 = link de versión a usar, 2 = el id sobre el único dato
        const lista = respuesta.data;
        console.log(lista, "Esto es la lista de los tipos")
        setTiposName(lista);
      } catch (error) {
        console.error("Error al cargar los tipos: ", error)
      }
    }
    cargarNameTipo();
  }, [])
  useEffect(() => {
    async function loadGetLibro() {
      // if (true){
        const {data : {titulo, perfil, sinopsis, publicacion, estado, idioma},} = await getOneData(VERSIONES[3], 4); // Contrario a 4 es paramet.id
        // Settear los valores de la data (guardarlo hacía onsubmit, handlesubmit, data...)
        setValue('titulo', titulo); setValue('perfil', perfil); setImageUrl(perfil); setValue('sinopsis', sinopsis); setValue('publicacion',publicacion); setValue('estado',estado); setValue('idioma',idioma);
      }
      loadGetLibro();
    async function loadGetTipo() {
      const {data: {libro, tipo, tipo_nombre}} = await getOneData(VERSIONES[5], 1);
      setValue('tipo_libro', libro)
      setValue('tipo_tipo', tipo)
      setValue('tipo_nombre', tipo_nombre)
      const {data: {id, autor_nombre, descripcion}} = await getOneData(VERSIONES[10], 2);
      const autoresXlibro = [{id, autor_nombre, descripcion}];
      console.log(autoresXlibro, "Esto es autoresxLibro");
      setAutorLbro([autoresXlibro])
      setValue('autorlibro_descripcion', descripcion);
      setValue('autorlibro_autor', autor_nombre);
      console.log("Esto es de AutorLbro: ",AutorLbro.descripcion, AutorLbro)
      // console.log('Contenido del libro: ', libro, tipo, tipo_nombre)
    }
    loadGetTipo();
  }, [])
  const onSubmit = handleSubmit(async data => {
    console.log(data, "Esto es la data original a enviar")
    if (paramet.id) {
      console.log(paramet.id, data, "Esto es la data de onSubmit")
    } else {
      const LibroData = {titulo: data.titulo, perfil: data.perfil, sinopsis: data.sinopsis, publicacion: data.publicacion, estado: data.estado, idioma: data.idioma};
      // console.log(LibroData, "eSTO ES LA DAta de libro a enviar")
      // await updateData(VERSIONES[3], num, LibroData);
      // await createData(VERSIONES[3], data);
    }
  })


    
    // console.log(useForm());

    // console.log('Sinopsis:', sinopsis);

  const [Nombre, setNombre] = useState([]);
  useEffect(() => {
    async function cargarNombre() {
      try {
        // GetOneData usa axios para conectarse a mi base de datos
        const respuesta = await getOneData(VERSIONES[13], VERSIONES[4]); // con estas entradas 3 = link de versión a usar, 2 = el id sobre el único dato
        const lista = respuesta.data;
        setNombre(lista);
      } catch (error) {
        console.error("Error al cargar la data: ", error)
      }
    }
    cargarNombre();
  }, [])

  const [Genero, setGenero] = useState([]);
  useEffect(() => {
    async function cargarGenero() {
      try {
        // GetOneData usa axios para conectarse a mi base de datos
        const respuesta = await getOneData(VERSIONES[12], VERSIONES[4]); // con estas entradas 3 = link de versión a usar, 2 = el id sobre el único dato
        const lista = respuesta.data;
        setGenero(lista);
      } catch (error) {
        console.error("Error al cargar la data: ", error)
      }
    }
    cargarGenero();
  }, [])

  // console.log(Nombre, "Esto es Nombres Alternativos")
  // console.log(TipoID, "Esto es Tipo de Libro")
  // console.log(Genero, "Esto es Generos del libro")

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
<div className="text-white">

  <div className="grid bg-red-800 text-white py-5 px-10 "> {/* crear marco 10 columnas en grid */}
    <div className="grid grid-cols-3 bg-red-500 border-4 max-w-screen-2xl min-w-full border-fuchsia-500/75 rounded-md">
        {/* Título */}
        <label className="col-span-3 flex px-2 max-w-full py-2 text-green-200 bg-green-600">
          <input type="text" placeholder="Ingresar un título..." {...register("titulo", {require: true})}
          className={tituloclas} required />{errors.titulo && <span>El título es necesario.</span>}
        </label>
        {/* Contenido (imagen, sinopsis, detalles) */}
      <div className="grid grid-cols-5 col-span-3 space-x-6 content-center bg-gray-800 p-6">
        {/* Imagen */}
        <div className="content-center max-w-1/4 bg-gray-600" >
          {imageUrl ? (
              <div> <img className="rounded-lg" src={imageUrl} alt="Imágen del libro" /> </div> // Muestra imagen si tengo link
          ) : <label >
          <input type="text" placeholder="Ingrese el link de su imágen" {...register("perfil", {require: true})} className="" />
          </label>
          }
        </div>
        {/* sinopsis, publicacion, estado, idioma */}
        <div className="col-span-2 basis-1/3  text-orange-600 bg-emerald-700"> {/* Características */}
          <div className="block"> <span className="mr-1" >Tipo:</span> 
            <select {...register('id_tipo')} className="text-black mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {TiposName.map((tipo) => ( <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option> ))}
            </select>
          </div>
          <div className="block" > <span>Capítulos:</span> <span>Libroid.capitulo</span> </div>
          <span>Escritor:</span> <span>Yuichiro Higashide</span>
          {/* {AutorLbro.map((index) => (<label key={index.id} className="block"> <span >{index.descripcion}</span> <span>{index.autor_nombre}</span> </label> ))} */}
          <div className="block" ><span>Ilustrador:</span> <span>NOCO</span></div>
          <div className="block" > <span>Géneros:</span> <span>Mecha Sobrenatural Acción Escolar</span> </div>
          <div className="block" > <span>Última de publicación:</span> <span>Libroid.ul_publicacion</span> </div>
          <label className="block" > <span>Publicación: </span> <input type="text" placeholder="Fecha de Emisión" {...register("publicacion")} className="pl-1 rounded w-1/4 h-5"/></label> 
          <div className="block" > <span>Nombre Inglés:</span> <span>Date a Bullet</span> </div>
            <label className="block" ><span>Estado:</span> <input type="text" placeholder="Estado del Libro" {...register("estado")} className="pl-1 rounded w-1/4 h-5"/> </label>
            <label className="block"><span>Idioma:</span><input type="text" placeholder="Idioma del Libro" {...register("idioma")} className="pl-1 rounded w-1/4 h-5" /> </label>
          <div className="block" > <span>Nombre Origen:</span> <span>デート・ア・ライブ</span> </div>
          <div className="block" > <span>Enlace Original:</span> <span>link sss</span> </div>
          <div className="flex"><span className="pr-1">Puntaje:</span>
            {estrellaLlena}{estrellaDecimal}{estrellaVacia}{start.toString()}
          </div>

        </div>
        <div className="col-span-2 basis-1/3 flex flex-col text-cian-800 bg-emerald-600"> {/* Sinopsis */}
          <label >
            <span className="block">Sinopsis:</span>
            <textarea type="text" placeholder="Ingrese la Sinopsis de su Libro." {...register('sinopsis')} className="text-cyan-800 w-full resize-y"></textarea>
          </label>
         
        </div>
        <form action="" onSubmit={onSubmit}>

          <button onSubmit={onSubmit} className="self-end p-2 flex-row rounded-lg bg-blue-500" >Guardar</button>
        </form>
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
</div>
  )
}
