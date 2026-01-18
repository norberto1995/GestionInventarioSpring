import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearUsuarioApi } from "../services/usuarioService";

export default function CrearUsuario() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
    rol: "USER",
    activo: true
  });

  const { username, password, rol } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearUsuarioApi(usuario);
      alert("Usuario creado correctamente");
      navigate("/usuarios/listar");
    } catch (error) {
      alert("Error al crear usuario (¿permisos?)");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Crear Usuario</h4>

      <form onSubmit={onSubmit} className="card p-4">

        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={username}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select
            name="rol"
            className="form-select"
            value={rol}
            onChange={onChange}
          >
            <option value="ADMIN">Administrador</option>
            <option value="USER">Vendedor</option>
          </select>
        </div>

        <button className="btn btn-success">
          Crear Usuario
        </button>

      </form>
    </div>
  );
}
