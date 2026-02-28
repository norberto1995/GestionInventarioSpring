import api from "../../api/axiosConfig";


export const obtenerProductos = () =>
  api.get("/gestion-app/productos");

export const obtenerClientes = () =>
  api.get("/gestion-app/clientes");

export const registrarVentaApi = (ventaDTO) =>
  api.post("/gestion-app/ventas", ventaDTO);

// Agrega esto a tu ventaService.js
export const obtenerVentas = () => 
  api.get("/gestion-app/ventas"); // Asumiendo que este es el endpoint de tu historial