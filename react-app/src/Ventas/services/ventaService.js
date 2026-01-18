import api from "../../api/axiosConfig";


export const obtenerProductos = () =>
  api.get("/gestion-app/productos");

export const obtenerClientes = () =>
  api.get("/gestion-app/clientes");

export const registrarVentaApi = (ventaDTO) =>
  api.post("/gestion-app/ventas", ventaDTO);

