import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

export default function ListarUsuarios() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const res = await api.get("/usuarios");
    setUsuarios(res.data);
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;

    await api.delete(`/usuarios/${id}`);
    setUsuarios(usuarios.filter(u => u.id !== id));
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">
        <h4>Usuarios</h4>
        <Link to="/usuarios/crear" className="btn btn-success">
          Nuevo usuario
        </Link>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.rol}</td>
              <td className="text-center">
                <Link
                  to={`/usuarios/editar/${u.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  ✏️
                </Link>

                <button
                  onClick={() => eliminarUsuario(u.id)}
                  className="btn btn-danger btn-sm"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
