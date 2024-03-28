import { Card } from "../Componentes/card";

export const Libro = () => {
  return (
<div className="text-white">
  <p className="p-2"> </p>
    <div class="grid grid-cols-10 gap-3 bg-red-800 text-white "> {/* crear marco 10 columnas en grid */}
    <div class="bg-red-400 flex flex-col col-start-2 col-span-8 border-2 border-fuchsia-500/75 rounded-md">
      <div className="text-green-200 text-3xl font-semibold break-words hyphens-auto text-center text-wrap whitespace-pre-line">
        arriba - texto
      </div>
      <div className="flex justify-around bg-gray-800 p-1">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>    
    </div>
        
    
    
    
    <div class="col-start-1 w-1/2 bg-red-300 ...">02</div>
    <div class="col-end-7 col-span-2 bg-red-500 ...">03</div>
    <div class="col-start-1 col-end-7 bg-red-600 ...">04</div>
  </div>
</div>
  )
  
};