import { getAllData, getOneData } from '../api/api_toshokan';
import { useEffect, useState } from 'react'
export const Testing = () => {
  const [listaGet, setListaGet] = useState([]);
  useEffect(() => {
    async function cargarLista() {
      try {
        const respuesta = await getOneData(1, 1);
        const lista = respuesta.data;
        setListaGet(lista);
      } catch (error) {
        console.error("Error al cargar la data: ", error)
      }
    }
    cargarLista();
  }, [])

  return (
    <div className="text-white">
            <h1>Lista de Usuarios</h1>
            <p>{listaGet.nombre} </p>
      <ul>

        {/* {listaGet.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} {usuario.usuario} {usuario.password} {usuario.creacion}
          </li>
        ))} */}
      </ul>
    </div>
  )
}
