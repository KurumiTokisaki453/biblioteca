import Kurumi from "../img/tokisaki.jpg"
import { Iconsuma01 } from "../assets/suma.jsx"; import  MoreIcon  from '../assets/more.svg';
import { Trash } from "../assets/Trash.jsx";
import { useEffect, useState, useRef} from 'react'
import { getAllData, getOneData, createData, updateData, deleteData } from '../api/api_toshokan';
import { useNavigate, useParams } from 'react-router-dom'
import {produce} from "immer";

import Decimal from 'decimal.js';
import {DecimalStart, Start, StartVoid } from "../assets/start.jsx"
import { calcularStart } from "../Componentes/calificacion.jsx"
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

export function FormCard() {
  const navegar = useNavigate()
  const paramet = useParams()
  const [TiposName,setTiposName] = useState([]);

  const [Libro, setLibro] = useState([]); const [Libro_Generos, setLibro_Generos] = useState([]); const [Libro_Nombres, setLibro_Nombres] = useState([]); const [Libro_Tipos, setLibro_Tipos] = useState([]); const [Libro_Autores, setLibro_Autores] = useState([]); const [Libro_Capitulos, setLibro_Capitulos] = useState([]);
  async function cargarNameTipo() {
    try {
      const respuesta = await getAllData(VERSIONES[4]); // con estas entradas 3 = link de versión a usar, 2 = el id sobre el único dato
      const lista = respuesta.data;
      setTiposName(lista);
    } catch (error) {
      console.error("Error al cargar los tipos: ", error)
    }
  }

  async function loadgetData_libro(parametroId) { // obtener todos los datos a traves del --ID-- del Libro
    const libro           = (await getOneData(VERSIONES[3], parametroId)).data; setLibro(libro);
    const capitulo_libro  = (await getOneData(VERSIONES[17], parametroId)).data; setLibro_Capitulos(capitulo_libro[0]);
    const nombresal_libro = (await getOneData(VERSIONES[13], parametroId)).data; setLibro_Nombres(nombresal_libro);
    const tipos_libro     = (await getOneData(VERSIONES[14], parametroId)).data; setLibro_Tipos(tipos_libro[0]);
    const generos_libro   = (await getOneData(VERSIONES[12], parametroId)).data; setLibro_Generos(generos_libro);
    const autores_libro   = (await getOneData(VERSIONES[16], parametroId)).data; setLibro_Autores(autores_libro);
  }
  const textareaRef = useRef(null);
  useEffect(() => {   // Cargar los nombres de la base de datos Tipo
    cargarNameTipo();
    if (paramet.id) {
      loadgetData_libro(paramet.id);
    } else {
      Campos_autores();
      Campos_generos();
      Campos_nombres();
    }
  }, [])

  const Autores_ChangeDescripcion = (value, index) => { // Value = Cambios(descripción), index = objeto modificado (cambios)
    setLibro_Autores( produce((draft) => { draft[index].descripcion = value; }) ); }
  const Autores_ChangeNombre = (value, index) => { // Value = Cambios(nombre), index = objeto modificado (cambios)
    setLibro_Autores( produce((draft) => { draft[index].autor_nombre = value;}));}
  const Autores_ChangeApellido = (value, index) => { // Value = Cambios(nombre), index = objeto modificado (cambios)
    setLibro_Autores( produce((draft) => { draft[index].autor_apellido = value;}));}
  const Generos_ChangeNombre = (value, index) => { // Value = Cambios(nombre), index = objeto modificado (cambios)
    setLibro_Generos  ( produce((draft) => { draft[index].nombre_genero = value;}));}
  const Generos_DeleteNombre = (index) => { // Value = Cambios(nombre), index = objeto modificado (cambios)
    setLibro_Generos(Libro_Generos.filter((_, i) => i !== index)); // Filtra el array para excluir el elemento en el índice especificado
    console.log("Estaremos borrando", Libro_Generos)
  ;}
  const Nombre_ChangeNombre = (value, index) => { // Value = Cambios(nombre), index = objeto modificado (cambios)
    setLibro_Nombres  ( produce((draft) => { draft[index].nombre = value;}));}
  const Nombre_ChangeDescripcion = (value, index) => { // Value = Cambios(nombre), index = objeto modificado (cambios)
    setLibro_Nombres  ( produce((draft) => { draft[index].descripcion = value;}));}

  let autoressobrelibro = Array.from({ length: Libro_Autores.length }, (_, index) => (
    <label key={index} className="block bg-indigo-500 text-white" >
      <input type="text" className="bg-yellow-500 text-black w-1/3" value={Libro_Autores[index].descripcion||""} onChange={(e)=>Autores_ChangeDescripcion(e.target.value, index)} />
      <input type="text" className="bg-orange-500 text-black w-1/3" value={Libro_Autores[index].autor_nombre||""} onChange={(e)=>Autores_ChangeNombre(e.target.value, index)} />
      <input type="text" className="bg-orange-500 text-black w-1/3" value={Libro_Autores[index].autor_apellido||""} onChange={(e)=>Autores_ChangeApellido(e.target.value, index)} />
    </label>));
  const Campos_autores = () => { setLibro_Autores([...Libro_Autores, {descripcion: "", autor_nombre: "", autor_apellido: ""}])}
  let generossobrelibro = Array.from({length: Libro_Generos.length }, (_, index) =>(
    <label key={index} className='flex bg-emerald-400 rounded text-white w-1/3 my-1 ' >
      <input type="text" className='ml-1 bg-emerald-500 py-1 px-2 rounded w-full' value={Libro_Generos[index].nombre_genero||""} onChange={(e)=>Generos_ChangeNombre(e.target.value,index)}/>
      <button type='button' className="mr-1 rounded bg-red-100" onClick={() => Generos_DeleteNombre(index)} > <Trash /> </button>
    </label> ));
  const Campos_generos = () => { setLibro_Generos([...Libro_Generos, {}])};
  let nombresobrelibro = Array.from({length: Libro_Nombres.length}, (_,index) => (
    <label key={index} className="text-white my-1 w-full" >
      <input type="text" className="bg-emerald-500 w-1/3  rounded py-1 px-2 " value={Libro_Nombres[index].descripcion||""} onChange={(e)=>Nombre_ChangeDescripcion(e.target.value, index)}/>
      <input type="text" className="bg-emerald-500 w-2/3  rounded py-1 px-2 " value={Libro_Nombres[index].nombre||""} onChange={(e)=>Nombre_ChangeNombre(e.target.value, index)}/>
    </label> ));
  const Campos_nombres = () => { setLibro_Nombres([...Libro_Nombres,{nombre: "", descripcion: "", libro: ""}])}; // Descripción, nombre, id, libro
  
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
  const ActualizarData = async () => {
    if (Libro.id) { 
      const SendLibro = {...Libro}; delete SendLibro.id; await updateData(3, paramet.id, SendLibro)
      const SendCapitulo = {...Libro_Capitulos}; delete SendCapitulo.id; await updateData(11, Libro_Capitulos.id, SendCapitulo );
      for (let i = 0; i < Libro_Nombres.length; i++) {
        const SendNombre = {...Libro_Nombres[i]}; delete SendNombre.id; await updateData(9, Libro_Nombres[i].id,SendNombre);
      };
      const SendTipo = {...Libro_Tipos}; delete SendTipo.id; delete SendTipo.nombre; await updateData(5, Libro_Tipos.id, SendTipo);
      console.log("Actualización completa")
    } else {
      await createData(3, Libro)
    };
  }
  const onSubmit = async () =>{
    console.log(Libro)
    console.log(Libro_Tipos)
    console.log(Libro_Capitulos)
    console.log(Libro_Autores)
    console.log(Libro_Generos)
    console.log(Libro_Nombres)
  }
  const Libro_ChangeTitulo    = (value) => { setLibro({...Libro, titulo: value});}
  const Libro_ChangePerfil    = (value) => { setLibro({...Libro, perfil: value});}
  const Libro_ChangeSiponsis  = (value) => { setLibro({...Libro, sinopsis: value});
  const textarea = textareaRef.current; if (textarea) {textarea.style.height = "auto"; textarea.style.height = `${textarea.scrollHeight}px`}
  ;}
  const Libro_ChangePublicacion= (value) => { setLibro({...Libro, publicacion: value});}
  const Libro_ChangeEstado    = (value) => { setLibro({...Libro, estado: value});}
  const Libro_ChangeIdioma    = (value) => { setLibro({...Libro, idioma: value});}
  const Tipo_SelectChange     = (event) => {  
    const selectedOption = event.target.options[event.target.selectedIndex];
    console.log(selectedOption)
    const id = selectedOption.getAttribute('id');
    const nombre = selectedOption.getAttribute('nombre');
    setLibro_Tipos({...Libro_Tipos, tipo: id, nombre: nombre});};
  const Capitulos_ChangeCapitulo = (value) => { setLibro_Capitulos({...Libro_Capitulos, capitulo: value })}
  const Capitulos_ChangeVolumen = (value) => { setLibro_Capitulos({...Libro_Capitulos, volumen: value })}
  return (
<div className="text-white">

  <div className="grid bg-red-800 text-white py-5 px-10 "> {/* crear marco 10 columnas en grid */}
    <div className="grid grid-cols-1 bg-red-500 border-4 max-w-screen-2xl min-w-full border-fuchsia-500/75 rounded-md">
        {/* Título */}
        <label className="flex px-2 max-w-full py-2 text-green-200 bg-green-600">
          <input type="text" placeholder="Ingresar un título..." value={Libro.titulo || ""} onChange={(e) => Libro_ChangeTitulo(e.target.value)}
          className={tituloclas} required />
        </label>
        {/* Contenido (imagen, sinopsis, detalles) */}
      <div className="grid lg:grid-cols-5 col-span-3 md:grid-cols-2 sm:grid-cols-1 gap-y-4 md:gap-x-4 sm:gap-x-2 lg:gap-x-6 content-center justify-center bg-gray-800 p-6">
        {/* Imagen */}
        <div className="flex flex-col justify-center content-center xl:max-w-1/4 lg:max-w-1/3 md:max-w-full justify-self-center sm:max-w-64 flex bg-gray-600" >
          <div> <img className=" w-full rounded-lg" src={Libro.perfil} alt="Imágen del libro" /> </div>
          <input type="text" placeholder="Ingrese el link de su imágen" value={Libro.perfil || ""} onChange={(e) => Libro_ChangePerfil(e.target.value)} className="rounded text-black" />
        </div>
        {/* sinopsis, publicacion, estado, idioma */}
        <div className="lg:col-span-2 lg:basis-1/3  text-orange-600 bg-emerald-700"> {/* Características */}
          <div className="block"> <span className="mr-1" >Tipo:</span> 
            <select value={Libro_Tipos.tipo} onChange={(e) => Tipo_SelectChange(e)} className="text-black mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {TiposName.map((tipo) => ( <option key={tipo.id} id={tipo.id} nombre={tipo.nombre} value={tipo.id} >{tipo.nombre}</option> ))}
            </select>
          </div>
          <label className="block" ><span>Capítulos:</span> <input type="text" placeholder="Capítulos del libro" value={Libro_Capitulos.capitulo||""} onChange={(e) => Capitulos_ChangeCapitulo(e.target.value)} className="pl-1 rounded w-1/4 h-5"/> </label>
          <label className="block" ><span>Volumenes:</span> <input type="text" placeholder="Volumen del libro" value={Libro_Capitulos.volumen||""} onChange={(e) => Capitulos_ChangeVolumen(e.target.value)} className="pl-1 rounded w-1/4 h-5"/> </label>
          <div className="flex text-white bg-indigo-500"> <h4 className="w-1/3 bg-gray-500">Descripción</h4> <h6 className="w-1/3 bg-gray-500">Nombre</h6> <h6 className="w-1/3 bg-gray-500">Apellido</h6> </div>
          <label className="block" >{autoressobrelibro}</label><button onClick={Campos_autores} ><Iconsuma01 /></button>
          <div className="block bg-red-400 text-center py-1 text-black">Generos:</div>
          <div className='flex flex-wrap mx-1 my-1 justify-evently'>{generossobrelibro}<button onClick={Campos_generos} ><Iconsuma01 /></button></div>
          <label className="block" > <span>Publicación: </span> <input type="text" placeholder="Fecha de Emisión" value={Libro.publicacion||""} onChange={(e)=>Libro_ChangePublicacion(e.target.value)} className="pl-1 rounded w-1/4 h-5"/></label> 
          <label className="block" ><span>Estado:</span> <input type="text" placeholder="Estado del Libro" value={Libro.estado||""} onChange={(e)=>Libro_ChangeEstado(e.target.value)} className="pl-1 rounded w-1/4 h-5"/> </label>
          <label className="block"><span>Idioma:</span><input type="text" placeholder="Idioma del Libro" value={Libro.idioma||""} onChange={(e)=>Libro_ChangeIdioma(e.target.value)} className="pl-1 rounded w-1/4 h-5" /> </label>
          <div className="block bg-red-400 text-center py-1 text-black">Nombres Alternativos:</div>
          <label className="flex flex-wrap mx-1 my-1" >{nombresobrelibro}</label><button onClick={Campos_nombres} ><Iconsuma01 /></button>

          <div className="block" > <span>Nombre Origen:</span> <span>デート・ア・ライブ</span> </div>
          <div className="flex"><span className="pr-1">Puntaje:</span>
            {estrellaLlena}{estrellaDecimal}{estrellaVacia}{start.toString()}
          </div>

        </div>
        <div className="lg:col-span-2 md:col-span-2 md:basis-1/3 flex flex-col text-cian-800 bg-emerald-600"> {/* Sinopsis */}
          <label >
            <span className="block content-center justify-center grid">Sinopsis:</span>
            <textarea ref={textareaRef} type="text" placeholder="Ingrese la Sinopsis de su Libro." className="text-cyan-800 w-full resize-y px-2 py-1 lg:min-h-40 xl:min-h-64 "  value={Libro.sinopsis||""} onChange={(e)=>Libro_ChangeSiponsis(e.target.value)}/>
          </label>
         
        </div>
        <div>
          {(paramet.id) ? <button onClick={ActualizarData} className="self-end p-2 flex-row rounded-lg bg-blue-500" >Actualizar</button>
            :<button onClick={onSubmit} className="self-end p-2 flex-row rounded-lg bg-blue-500" >Guardar</button>}
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
