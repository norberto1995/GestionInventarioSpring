import { useNavigate } from "react-router-dom";

export default function Header({ toggleMenu }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  return (
    <div
      className="d-flex align-items-center px-3 text-white"
      style={{ backgroundColor: "#111827", height: "70px" }}
    >
      {/* BOTÓN HAMBURGUESA SOLO EN MÓVIL */}
      <button
        className="btn btn-outline-light d-md-none me-3"
        onClick={toggleMenu}
      >
        ☰
      </button>

      <h4 className="m-0 fw-bold text-uppercase mx-auto">
        Sistema de Gestión
      </h4>

      <button
        onClick={logout}
        className="btn btn-outline-light btn-sm"
      >
        Cerrar sesión
      </button>
    </div>
  );
}






