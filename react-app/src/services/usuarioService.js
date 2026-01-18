import api from "../api/axiosConfig";

export const crearUsuarioApi = (usuario) =>
  api.post("/usuarios", usuario);

export const listarUsuariosApi = () =>
  api.get("/usuarios");
