const compararYActualizar = (camposAdicionales, TiposName, setTiposName) => {
  // Copia de camposAdicionales para no modificar el estado directamente
  let nuevosCamposAdicionales = [...camposAdicionales];

  // Iterar sobre cada elemento en camposAdicionales
  nuevosCamposAdicionales.forEach((campo, index) => {
    // Verificar si el nombre y la descripción existen en TiposName
    const existe = TiposName.some((tipo) => tipo.nombre === campo.nombre && tipo.descripcion === campo.descripcion);

    // Si se encuentra una coincidencia, eliminar el elemento correspondiente de camposAdicionales
    if (existe) {
      nuevosCamposAdicionales.splice(index, 1);
    }
  });

  // Actualizar TiposName con los elementos de camposAdicionales y establecer tipos como null o vacío
  setTiposName(nuevosCamposAdicionales.map(campo => ({ ...campo, tipos: null })));
};

