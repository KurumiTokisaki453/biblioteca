import { useEffect, useState, useRef } from 'react'
import { getAllData, createData, deleteData, updateData } from '../api/api_toshokan';
import { useNavigate, useParams } from 'react-router-dom'

import { Edit } from '../assets/svgcomponent';
import {Trash} from "../assets/Trash"

const EditableElement = ({element, onConfirm, onCancel }) => {
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    if (element) {
      setIsEditing(element.nombre);
    } else {
      setIsEditing(null);
    }
  }, [element]);

  const ConfirmEdit = () =>{
    onConfirm({nombre: isEditing});
  }
  return (
<div className="flex flex-col text-white items-center max-w-md mx-auto gap-4 mt-8 pb-8">
  <div className="w-full bg-blue-600 text-white text-center px-4 py-2 rounded-md ">Editar el Género</div>
  <input
    type="text"
    value={isEditing || ''}
    className="w-full px-3 py-2 border rounded-md text-black"
    onChange={(e) => setIsEditing(e.target.value)}
  />
  <div className="flex w-full bg-emerald-400 justify-center">
    <button onClick={ConfirmEdit} className="mr-2 w-full bg-green-500 px-4 py-2 rounded-2xl hover:bg-green-600"> Guardar </button>
    <button onClick={onCancel} className="w-full bg-orange-600 px-4 py-2 rounded-2xl hover:bg-orange-700"> Cancelar </button>
  </div>
</div>

  );
};

const DeleteConfirmation = ({element, onConfirm, onCancel }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancel();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" onClick={handleClickOutside}>
      <div ref={modalRef} className="bg-white p-8 rounded-lg">
        <p className="text-lg mb-4 text-black">¿Estás seguro de que deseas eliminar el Género {element.nombre}?</p>
        <div className="flex justify-between">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2" onClick={onConfirm}>Sí, eliminar</button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export const Generos = () => {
  // Estado para almacenar los campos de entrada adicionales
  const [camposAdicionales, setCamposAdicionales] = useState([{ nombre: ''}]);
  const [AllGender, setAllGender] = useState([]);
  useEffect(()=>{
    async function GetAllGender() {
      const GenerosData = (await getAllData(6)).data;
      console.log(GenerosData, "Estos son los generos")
      setAllGender(GenerosData);
    }
    GetAllGender();
  },[])

  const agregarCampo = () => {
      setCamposAdicionales([...camposAdicionales, { nombre: '' }]);
  };
  const handleChange = (index, event) => {
    const { name, value } = event.target;   // name = llave del diccionario, value= valor del diccionario
    const nuevosCampos = [...camposAdicionales];  //acctualización de campos adicionales?
    nuevosCampos[index][name] = value;    // guarda las variables para poder ingresarlos a los nuevos campos adicionales
    setCamposAdicionales(nuevosCampos);
  };

  const handleSubmit = async ( event) => {
    const camposNoVacios = camposAdicionales.filter((campo) => campo.nombre.trim() !== '');
    try {
      if (camposNoVacios.length>0) {
        await Promise.all(camposNoVacios.map(async (datos) => { // Promise.all = continúa hasta que se envíen todo el grupo de datos (uno x uno)
          await createData(6,datos);
        }));
        console.log(camposNoVacios, "Estos son los campos no vacios")
      } else {
        event.preventDefault(); // evita actualizar la página
        console.log("Campos inferior a 0")
        console.log(camposNoVacios, "Estos son los campos no vacios")
      }
      console.log('Todos los datos se han enviado correctamente');
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }

    // Aquí puedes manejar la lógica para enviar los datos al servidor
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [ShowEdit, setShowEdit] = useState(false);

  const handleEdit = async (primarykey) => {
    setShowEdit(false);
    setSelectedKey(primarykey)
    setShowEdit(true);
  };
  
  const handleSaveEdit = async (primarykey) => {
    await updateData(6, selectedKey.id, primarykey)
    setShowEdit(false);
    setSelectedKey(null);
    window.location.reload();
  };
  
  const handleCancelEdit = () => {
    setShowEdit(false);
    setSelectedKey(null);
  };
  const handleDelete = async (primarykey) => {
    setSelectedKey(primarykey)
    setShowConfirmation(true);
  };

  const DeleteGender = async () => {
    console.log(selectedKey, "Esto es la llave primaria");
    console.log(selectedKey.id, "Ahora eliminaremos según el id")
    await deleteData(6, selectedKey);
    window.location.reload();
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setSelectedKey(null);
  };

  return (
<div className=" grid bg-gray-800 py-5 px-10 text-white"> {/* crear marco 10 columnas en grid */}
  <div className="bg-indigo-800 border-4 max-w-screen-2xl min-w-full border-fuchsia-500/75 rounded-md">
    <div className=" bg-indigo-600 flex flex-wrap gap-4 px-4 py-2 rounded-md mb-4"><h2 className=''>Todos los Géneros creados:</h2> </div>
      <div className='flex flex-wrap gap-4'>
      {showConfirmation && (
        <DeleteConfirmation element={selectedKey} onConfirm={DeleteGender} onCancel={handleCancelDelete} />
      )}
      {AllGender.map((objeto, index)=>(
        <div key={index} className='flex items-center bg-emerald-400 rounded'>
          <span className='bg-emerald-500 py-1 px-2 rounded'> {objeto.nombre} </span>
          
          <button type='button' onClick={() => handleEdit(objeto)}> <Edit /> </button>
          <button type='button' onClick={() => handleDelete(objeto)}> <Trash /> </button>
        </div>
      ))}
      </div>
      {ShowEdit ?
        <EditableElement element={selectedKey} onConfirm={handleSaveEdit} onCancel={handleCancelEdit} /> :
      

    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 pb-8">
      {/* Campos de entrada adicionales */}
      <div className="w-full bg-blue-600 text-white text-center px-4 py-2 rounded-md mb-4">Crear nuevo Género</div>
  
      {camposAdicionales.map((campo, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            name='nombre'
            placeholder={`Género ${index} `}
            value={campo.nombre}
            onChange={(e) => handleChange(index, e)}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>
      ))}
    <div className="flex w-full  justify-center gap-2 ">
      {/* Botón para agregar más campos */}
      <button type="button" onClick={agregarCampo} className="w-full bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 ">Agregar más campos</button>
      <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-2xl hover:bg-green-600">Enviar</button>
      </div>
    </form>
  }
  </div>
</div>
  );
};