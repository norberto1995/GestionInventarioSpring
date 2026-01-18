import api from "../api/axiosConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListarCliente() {

  

  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const respuesta = await api.get("/gestion-app/clientes");
      setClientes(respuesta.data);
      setClientesFiltrados(respuesta.data); // copia para búsqueda
    } catch (error) {
      console.error("Error cargando clientes", error);
      alert("Error cargando clientes");
    } finally {
      setLoading(false);
    }
  };

  const eliminarCliente = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este cliente?");
    if (!confirmar) return;

    try {
      await api.delete(`/gestion-app/clientes/${id}`);
      const nuevaLista = clientes.filter(c => c.idCliente !== id);
      setClientes(nuevaLista);
      setClientesFiltrados(nuevaLista);
    } catch (error) {
      alert("No se pudo eliminar el cliente");
    }
  };

  // 🔍 BUSCADOR
  const filtrar = (texto) => {
    setBusqueda(texto);

    const resultado = clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      cliente.documento.toString().includes(texto)
    );

    setClientesFiltrados(resultado);
  };

  return (
    <div className="container mt-4">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Lista de Clientes</h4>
        <Link to="/clientes/agregar" className="btn btn-success">
          <i className="bi bi-person-plus me-2"></i> Nuevo Cliente
        </Link>
      </div>

      {/* 🔍 Buscador */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o documento..."
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
                <th>Nombre</th>
                <th>Documento</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Email</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No se encontraron clientes
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map(cliente => (
                  <tr key={cliente.idCliente}>
                    <td>{cliente.idCliente}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.documento}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.direccion}</td>
                    <td>{cliente.email}</td>
                    <td className="text-center">
                      <Link
                        to={`/clientes/editar/${cliente.idCliente}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>

                      <button
                        onClick={() => eliminarCliente(cliente.idCliente)}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
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

