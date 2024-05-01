import React, { useState } from 'react';

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
