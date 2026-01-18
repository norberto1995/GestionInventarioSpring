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
      setClientesFiltrados(respuesta.data);
    } catch (error) {
      alert("Error cargando clientes");
    } finally {
      setLoading(false);
    }
  };

  const eliminarCliente = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

    await api.delete(`/gestion-app/clientes/${id}`);
    const nuevaLista = clientes.filter((c) => c.idCliente !== id);
    setClientes(nuevaLista);
    setClientesFiltrados(nuevaLista);
  };

  const filtrar = (texto) => {
    setBusqueda(texto);
    setClientesFiltrados(
      clientes.filter(
        (c) =>
          c.nombre.toLowerCase().includes(texto.toLowerCase()) ||
          c.documento.toString().includes(texto)
      )
    );
  };

  return (
    <div className="container-fluid px-3 px-md-5 mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h4 className="mb-0">Lista de Clientes</h4>
        <Link to="/clientes/agregar" className="btn btn-success">
          Nuevo Cliente
        </Link>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o documento..."
          value={busqueda}
          onChange={(e) => filtrar(e.target.value)}
        />
      </div>

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
              {clientesFiltrados.map((cliente) => (
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
                      ✏️
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarCliente(cliente.idCliente)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


