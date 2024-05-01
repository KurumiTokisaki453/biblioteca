import Kurumi from "../img/tokisaki.jpg"
import Decimal from 'decimal.js';
import {DecimalStart, Start, StartVoid } from "../assets/start.jsx"
import { useEffect, useState } from 'react'
import { getAllData, getOneData } from '../api/api_toshokan';

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
  11: 11, // "v11-librosuper",
  12: 12, // "v12-generofilter",
  13: 13, // "v13-nombresfilter",
  14: 14,
  15: 15,
  16: 16,
}
export function Portal() {
  let tabla = 3;
  let libroKey = 4;
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

  const [TipoID, setTipoID] = useState([]);
  useEffect(() => {
    async function cargarTipo() {
      try {
        // GetOneData usa axios para conectarse a mi base de datos
        const respuesta = await getOneData(VERSIONES[5], VERSIONES[1]); // con estas entradas 3 = link de versión a usar, 2 = el id sobre el único dato
        const lista = respuesta.data;
        setTipoID(lista);
      } catch (error) {
        console.error("Error al cargar la data: ", error)
      }
    }
    cargarTipo();
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

  const [Libroid, setLibroid] = useState([]);
  useEffect(() => {
    async function cargarLista() {
      try {
        // GetOneData usa axios para conectarse a mi base de datos
        const respuesta = await getOneData(tabla, libroKey); // con estas entradas 3 = link de versión a usar, 2 = el id sobre el único dato
        const lista = respuesta.data;
        setLibroid(lista);
      } catch (error) {
        console.error("Error al cargar la data: ", error)
      }
    }
    cargarLista();
  }, [])
  // console.log(Nombre, "Esto es Nombres Alternativos")
  // console.log(TipoID, "Esto es Tipo de Libro")
  // console.log(Genero, "Esto es Generos del libro")
  // console.log(Libroid, "Esto son los libros")

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
  var titulo = " text-3xl tracking-tight text-left line-clamp-2 hover:line-clamp-3 font-semibold break-words hyphens-auto text-wrap whitespace-pre-line"
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
    <div className="bg-red-500 border-4 border-fuchsia-500/75 rounded-md">
      
      <div className="px-2 py-1 text-green-200">
        <span className={titulo}>Date a Bullet Novela Ligera en Español{Libroid.titulo} </span>
      </div>

      <div className="flex flex-row space-x-6 content-center bg-gray-800 p-6">
        <div className="content-center w-1/3" >
          <img className="box-border bg-green-500" src={Kurumi} alt="Descripción" />
        </div>
        <div className="basis-1/3 bg-emerald-700"> {/* Características */}
          <span>Tipo:</span> <span>Novela Ligera</span><br />
          <span>Capítulo:</span> <span>{Libroid.capitulo}</span><br />
          <span>Escritor:</span> <span>Yuichiro Higashide</span><br />
          <span>Ilustrador:</span> <span>NOCO</span><br />
          <span>Géneros:</span> <span>Mecha Sobrenatural Acción Escolar</span><br />
          <span>Fecha de publicación:</span> <span>{Libroid.publicacion}</span><br />
          <span>Última de publicación:</span> <span>{Libroid.ul_publicacion}</span><br />
          <span>Estado:</span> <span>{Libroid.estado}</span><br />
          <span>Nombre Inglés:</span> <span>Date a Bullet</span><br />
          <span>Nombre Origen:</span> <span>デート・ア・ライブ</span><br />
          <span>Enlace Original:</span> <span>link sss</span><br />
          <div className="flex"><span className="pr-1">Puntaje:</span>
            {estrellaLlena}{estrellaDecimal}{estrellaVacia}{start.toString()}
          </div>

        </div>
        <div className="basis-1/3 bg-emerald-600"> {/* Sinopsis */}
          <span>Sinopsis:</span>
          <p > {Libroid.sinopsis} Esta es una historia protagonizada por aquella chica que es conocida por todos como el peor espíritu, Kurumi Tokisaki. En cierta ocasión, se encontró con una joven con amnesia que la había llevado ante otras tantas chicas conocidas como Quasí-espíritus, las cuales estaban dispuestas a matarse entre sí. A partir de ahí, empieza la historia de Kurumi que no había sido contada hasta ahora.</p>
        </div>
      </div>
      
      <div className="bg-yellow-800 text-lg rounded-lg flex flex-col w-1/2 m-auto h-auto justify-center content-center space-x-2">
        <span className="px-4">Enlaces de Visualización: </span>
        <div className="px-2 space-x-2"><a className="underline text-pink-300 hover:text-sky-400 decoration-cyan-300 text-ellipsis underline-offset-2 overflow-hidden after:content-['_↗🛫'] " href="https://novelasligera.com/novela/la-vida-despues-de-la-muerte/">The Beginning After The End</a>
          <span className="cursor-pointer hover:text-blue-500" title="Actualización: 10-10-2024"  >Último Capítulo: 350/474</span>
        <span>Web: <a className="text-pink-300 hover:text-sky-400 after:content-['_↗'] ..." href="https://novelasligera.com/" target="_blank">novelasligera</a></span> </div>
      </div>
        <div className="text-gray-600 ml-10 text-lg">
          <span className=" bg-gray-100  ">Relacionados: </span>
        </div>
      <div className="flex px-center justify-center content-center bg-orange-500 ">
        <div className="bg-emerald-500 flex max-w-screen-xl content-center py-4 overflow-x-auto gap-4 px-4 py-1 " >
          <div className="min-w-52 max-w-64"> <img className="box-border" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={imgur01} alt="Kurumi Tokisaki 01" /> </div>
          
        </div>
      </div>
    </div>
  </div>
</div>
  )
}









