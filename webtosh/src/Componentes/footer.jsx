
export function Footer () {
  return (
<footer className="flex justify-around p-2 bg-gray-700 text-emerald-200">
  {/* <!-- Sección 1: Logotipo e imágenes --> */}
  <div className=" content-center">
    <img src="https://bibliotecadigital.bnp.gob.pe/assets/images/home/bnp-white.png" alt="Logotipo de la empresa"/>
    {/* <!-- Agrega aquí otros logos o imágenes relevantes --> */}
  </div>

  {/* <!-- Sección 2: Datos personales --> */}
  <div className="content-center">
    <h3>Datos Personales</h3>
    <p>Nombre: Cristhian P. H. T.</p>
    <p>Ubicación: Perú, Arequipa, Arequipa</p>
    <p>Teléfono: +51 9517727330</p>
    <p>Correo Electrónico: xxforestal452@gmail.com</p>
  </div>

  {/* <!-- Sección 3: Datos de la empresa --> */}
  <div className="content-center">
    <h3>Biblioteca Kurum</h3>
    <p>Derechos de autor © 2024. Todos los derechos reservados.</p>
  </div>
</footer>
  )
};