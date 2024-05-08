import { useEffect, useState, useRef } from 'react'
import { getAllData, createData, deleteData, updateData } from '../api/api_toshokan';

import { Edit } from '../assets/svgcomponent';
import { Trash } from '../assets/Trash';

export const Tipos = () => {
  const [AllType, setAllType] = useState([])
  useEffect(()=>{
    async function GetAllTypes () {
      const DataTipos = (await getAllData(4)).data;
      setAllType(DataTipos);
      console.log(AllType, "Estos son todos los tipos?")
    }
    GetAllTypes();
  }, [])
  
  return (
<div className=" grid bg-gray-800 px-10 text-white py-6"> {/* crear marco 10 columnas en grid */}
  <div className="bg-indigo-800 border-4 max-w-screen-2xl min-w-full border-fuchsia-500/75 px-6 py-4 rounded-md">
    <div className='flex flex-wrap gap-2'>

  {AllType.map((objeto, index)=>(
    <div key={index} className='flex items-center bg-emerald-400 rounded'>
          <span className='bg-emerald-500 py-1 px-2 rounded'> {objeto.nombre} </span>
          
          <button type='button'> <Edit /> </button>
          <button type='button'> <Trash /> </button>
        </div>
      ))}
      </div>
  </div>
</div>
  )
}