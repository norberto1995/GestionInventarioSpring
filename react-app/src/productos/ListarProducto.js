import api from "../api/axiosConfig";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListarProducto() {

 

  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);


  const rol = localStorage.getItem("rol");
const esAdmin = rol === "ROLE_ADMIN";

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const respuesta = await api.get("/gestion-app/productos");

      setProductos(respuesta.data);
      setProductosFiltrados(respuesta.data);
    } catch (error) {
      console.error("Error cargando productos", error);
      alert("Error cargando productos");
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      await api.delete(`/gestion-app/productos/${id}`);
      const nuevaLista = productos.filter(p => p.idProducto !== id);
      setProductos(nuevaLista);
      setProductosFiltrados(nuevaLista);
    } catch (error) {
      alert("No se pudo eliminar el producto");
    }
  };

  // 🔍 BUSCADOR por código o nombre
  const filtrar = (texto) => {
    setBusqueda(texto);

    const resultado = productos.filter(producto =>
      producto.codigo.toString().includes(texto) ||
      producto.nombre.toLowerCase().includes(texto.toLowerCase())
    );

    setProductosFiltrados(resultado);
  };

  return (
    <div className="container mt-4">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Lista de Productos</h4>


       {esAdmin && (
  <Link to="/productos/agregar" className="btn btn-success">
    <i className="bi bi-box-seam me-2"></i> Nuevo Producto
  </Link>
)}


      </div>

      {/* 🔍 Buscador */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por código o nombre..."
          value={busqueda}
          onChange={(e) => filtrar(e.target.value)}
        />
      </div>

      {/* Tabla */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Compra</th>
                <th>Venta</th>
                <th>Stock</th>
                <th>Stock Mín.</th>
                <th>IVA</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center text-muted">
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                productosFiltrados.map(producto => (
                  <tr key={producto.idProducto}>
                    <td>{producto.idProducto}</td>
                    <td>{producto.codigo}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>${producto.precioCompra}</td>
                    <td>${producto.precioVenta}</td>
                    <td>{producto.stockActual}</td>
                    <td>{producto.stockMinimo}</td>
                    <td>{producto.iva}%</td>

                   <td className="text-center">
  {esAdmin && (
    <>
      <Link
        to={`/productos/editar/${producto.idProducto}`}
        className="btn btn-primary btn-sm me-2"
      >
        <i className="bi bi-pencil-square"></i>
      </Link>

      <button
        onClick={() => eliminarProducto(producto.idProducto)}
        className="btn btn-danger btn-sm"
      >
        <i className="bi bi-trash"></i>
      </button>
    </>
  )}
</td>


                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}
