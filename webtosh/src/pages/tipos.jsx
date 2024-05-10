import { useEffect, useState, useRef } from 'react'
import { getAllData, createData, deleteData, updateData } from '../api/api_toshokan';

import { Edit } from '../assets/svgcomponent';
import { Trash } from '../assets/Trash';

const DeleteConfirmation = ({element, onCancel }) => {
  const modalRef = useRef();

  const onConfimCancel = async () => {
    console.log(element.id, "Esto es el elemento")
    await deleteData(4, element.id)
    window.location.reload();
  }

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancel();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" onClick={handleClickOutside}>
      <div ref={modalRef} className="bg-white p-8 rounded-lg">
        <p className="text-lg mb-4 text-black">¿Estás seguro de que deseas eliminar el Tipo {element.nombre}?</p>
        <div className="flex justify-between">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2" onClick={onConfimCancel}>Sí, eliminar</button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export const Tipos = () => {
  const [AllType, setAllType] = useState([])
  const [Selectedtype, setSelectedtype] = useState([]); const [MainElement, setMainElement] = useState([]);
  const [ShowDelete, setShowDelete] = useState(false)

  const showFalse = () => {
    setShowDelete(false);
  }
  const handleDelete = (parametro) => {
    setMainElement(parametro)
    setShowDelete(true)
    setSelectedtype(null)
  }

  useEffect(()=>{
    async function GetAllTypes () {
      const DataTipos = (await getAllData(4)).data;
      setAllType(DataTipos);
    }
    GetAllTypes();
  }, []);

  const handleChange = (event) => {
    const valorCambio = event.target.value
    setSelectedtype(valorCambio)
  };

  const EnviarCambios = async () => { // Esto es del Form --- poner event para evitar que cargue
    // event.preventDefault(); 
    await createData(4, {nombre: Selectedtype})
  }

  return (
<div className=" flex bg-gray-800 px-10 text-white py-4"> {/* crear marco 10 columnas en grid */}
  <div className="flex flex-col bg-indigo-800 border-4 max-w-screen-2xl min-w-full justify-center border-fuchsia-500/75 px-6 py-6 gap-4 rounded-md">
      <div className=" bg-indigo-600 flex px-4 py-2 rounded-md "><h2 className=''>Todos los Tipos creados:</h2> </div>
      {ShowDelete && (
        <DeleteConfirmation element={MainElement} onCancel={showFalse} />
      )}
      <div className='flex flex-wrap gap-2 bg-lime-500 my-2'> {AllType.map((objeto, index)=>(
          <div key={index} className='flex items-center bg-emerald-400 rounded'>
            <span className='bg-emerald-500 py-1 px-2 rounded'> {objeto.nombre} </span> 
            {/* <button type='button' onClick={() => handleEdit(objeto)}> <Edit /> </button> */}
            <button type='button' onClick={() => handleDelete(objeto)}> <Trash /> </button>
          </div>
        ))}</div>
      <form onSubmit={EnviarCambios} className='max-w-full mx-auto bg-red-400 rounded-xl my-2 px-4 gap-2 py-4 grid'>
        <div className="w-full bg-indigo-600 px-6 py-2 rounded-md"><h2 className=''>Crear un nuevo tipo para Libros:</h2> </div>
        <input
            type="text"
            name='nombre'
            placeholder="Ingrese nuevo Tipo"
            value={Selectedtype||""}
            onChange={(e) => handleChange(e)}
            className="w-full px-2 py-2 border rounded-md text-black"
          />
        <button type='submit' className='w-full bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700'>Enviar</button>
      </form>
  </div>
</div>
  )
}