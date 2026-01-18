import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("rol", res.data.rol);

      navigate("/productos/listar");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "380px", borderRadius: "15px" }}
      >
        {/* LOGO / TÍTULO */}
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-dark text-white d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: "60px", height: "60px" }}
          >
            <i className="bi bi-shield-lock fs-3"></i>
          </div>
          <h4 className="fw-bold">Sistema de Gestión</h4>
          <p className="text-muted mb-0">Iniciar sesión</p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={form.username}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={onChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center mt-3 text-muted small">
          © 2026 Sistema de Gestión
        </div>
      </div>
    </div>
  );
}


