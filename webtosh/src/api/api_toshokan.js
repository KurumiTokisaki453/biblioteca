import axios from "axios";
// const BASE_URL = "http://192.168.1.3:8000" // movil, red abierta...
const BASE_URL = "http://127.0.0.1:8000/";
// const PROJECT_NAME = "biblioteca"; // debría servir... pero no me sirve por ahora
const APP_NAME = "toshokandesu";

const VERSIONES = {
  1: "v01-usuario",
  2: "v02-autor",
  3: "v03-libro",
  4: "v04-tipo",
  5: "v05-librotipo",
  6: "v06-genero",
  7: "v07-librogenero",
  8: "v08-puntaje",
  9: "v09-nombre",
  10: "v10-libroautor",
  11: "v11-librocapitulo",
  12: "v12-generofilter",
  13: "v13-nombrefilter",
  14: "v14-tipofilter",
  15: "v15-puntajefilter",
  16: "v16-autorfilter",
  17: "v17-capitulofilter",
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
