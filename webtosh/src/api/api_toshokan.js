import axios from "axios";
const BASE_URL = "http://192.168.1.5:8000" // movil, red abierta...
// const BASE_URL = "http://127.0.0.1:8000/";
// const PROJECT_NAME = "biblioteca"; // debría servir... pero no me sirve por ahora
const APP_NAME = "toshokandesu";

const VERSIONES = {
  1: "v01-usuario",       // {nombre, perfil, usuario, password, creacion}
  2: "v02-autor",         // {nombre, apellido, nacimiento, perfil}
  3: "v03-libro",         // {titulo, perfil, sinopsis, publicacion, estado, idioma}
  4: "v04-tipo",          // {nombre}
  5: "v05-librotipo",     // {libro(id), tipo(id)}
  6: "v06-genero",        // {nombre}
  7: "v07-librogenero",   // {libro, genero}
  8: "v08-puntaje",       // {usuario, libro, calificacion, fecha_calificacion}
  9: "v09-nombre",        // {libro, nombre, descripcion}
  10: "v10-libroautor",   // {descripcion, libro, autor, ..., autor_nombre, autor_apellido}
  11: "v11-librocapitulo",  // {libro, capitulo, volumen}
  12: "v12-generofilter",   // {nombre, nombre_genero}
  13: "v13-nombrefilter",   // libro, nombre, descripcion
  14: "v14-tipofilter",     // {nombre, tipo_nombre}
  15: "v15-puntajefilter",  // {usuario, libro, calificacion, fecha_calificacion}
  16: "v16-autorfilter",    // {nombre, apellido, nacimiento, perfil}
  17: "v17-capitulofilter", // {libro, capitulo, volumen}
}

const createAxiosInstance = (version) => {
  const versionPath = VERSIONES[version];
  const baseURL = `${BASE_URL}/${APP_NAME}/${versionPath}/${APP_NAME}/`;
  
  return axios.create({
    baseURL,
  });
};

export const getAllData = (version)           => createAxiosInstance(version).get("/")
export const createData = (version, data)     => createAxiosInstance(version).post("/", data);
export const getOneData = (version, id)       => createAxiosInstance(version).get("/"+id+"/");
export const updateData = (version, id, data) => createAxiosInstance(version).put("/"+id+"/", data);
export const deleteData = (version, id)       => createAxiosInstance(version).delete("/"+id);
