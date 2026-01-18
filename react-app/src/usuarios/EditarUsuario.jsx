import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";

export default function EditarUsuario() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    username: "",
    rol: ""
  });

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    const res = await api.get(`/usuarios/${id}`);
    setUsuario(res.data);
  };

  const onInputChange = e => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await api.put(`/usuarios/${id}`, usuario);
    navigate("/usuarios/listar");
  };

  return (
    <div className="container mt-4">
      <h4>Editar Usuario</h4>

      <form onSubmit={onSubmit}>
        <input
          className="form-control mb-2"
          name="username"
          value={usuario.username}
          onChange={onInputChange}
          disabled
        />

        <select
          className="form-select mb-3"
          name="rol"
          value={usuario.rol}
          onChange={onInputChange}
        >
          <option value="ROLE_ADMIN">ADMIN</option>
          <option value="ROLE_VENDEDOR">VENDEDOR</option>
        </select>

        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}
