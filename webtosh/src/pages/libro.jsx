import { Card } from "../Componentes/card";

export const Libro = () => {
  var titulo = "text-green-200 text-3xl font-semibold break-words hyphens-auto text-center text-wrap whitespace-pre-line"
  return (
<div className="text-white">
  <p className="p-2"> </p>

  <div className="grid grid-cols-8 bg-red-800 text-white "> {/* crear marco 10 columnas en grid */}
    <div className="bg-red-400 col-start-2 col-span-8 border-2 border-fuchsia-500/75 rounded-md">
      <div className={titulo}>
        arriba - texto
      </div>
      <div className="grid grid-cols-5 gap-3 bg-gray-800 p-3">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>    
    </div>
        
    
    
    
    <div className="col-start-1 w-1/2 bg-red-300 ...">02</div>
    <div className="col-end-7 col-span-2 bg-red-500 ...">03</div>
    <div className="col-start-1 col-end-7 bg-red-600 ...">04</div>
  </div>
</div>
  )
  
};