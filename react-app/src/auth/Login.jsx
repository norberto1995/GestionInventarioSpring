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
  const [showPassword, setShowPassword] = useState(false); // Extra: Ver contraseña

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

      navigate("/");
    } catch (err) {
      setError("Credenciales inválidas. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 p-3"
      style={{
        background: "radial-gradient(circle at top right, #1e293b, #0f172a)",
      }}
    >
      <div
        className="card border-0 shadow-lg animate__animated animate__fadeIn"
        style={{ 
            width: "400px", 
            borderRadius: "24px", 
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <div className="card-body p-4 p-md-5">
          {/* LOGO / TÍTULO */}
          <div className="text-center mb-5">
            <div
              className="rounded-4 bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: "64px", height: "64px" }}
            >
              <i className="bi bi-shield-lock-fill text-primary fs-2"></i>
            </div>
            <h3 className="fw-bolder text-white mb-1">Bienvenido</h3>
            <p className="text-white-50 small">Gestión de Inventario & Ventas</p>
          </div>

          {/* MENSAJE DE ERROR */}
          {error && (
            <div className="alert alert-danger border-0 bg-danger bg-opacity-10 text-danger small text-center mb-4 py-2 animate__animated animate__shakeX">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {/* FORMULARIO */}
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label text-white-50 small fw-bold">Usuario</label>
              <div className="input-group bg-dark bg-opacity-25 rounded-3 border border-secondary border-opacity-25">
                <span className="input-group-text bg-transparent border-0 text-white-50">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 text-white shadow-none py-2"
                  name="username"
                  placeholder="admin"
                  value={form.username}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-white-50 small fw-bold">Contraseña</label>
              <div className="input-group bg-dark bg-opacity-25 rounded-3 border border-secondary border-opacity-25">
                <span className="input-group-text bg-transparent border-0 text-white-50">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control bg-transparent border-0 text-white shadow-none py-2"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  required
                />
                <button 
                  className="btn border-0 text-white-50 shadow-none" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm mt-2"
              disabled={loading}
              style={{ transition: 'all 0.3s ease' }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Verificando...
                </>
              ) : (
                "Acceder al Sistema"
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="text-center mt-5 text-white-50 extra-small">
            <small>© 2026 Admin Panel • V 2.0.4</small>
          </div>
        </div>
      </div>
    </div>
  );
}


