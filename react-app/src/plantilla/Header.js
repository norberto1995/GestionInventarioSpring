import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  return (
    <div
      className="d-flex align-items-center px-4 text-white"
      style={{ backgroundColor: "#111827", height: "70px", position: "relative" }}
    >
      <h4
        className="m-0 fw-bold text-uppercase position-absolute start-50 translate-middle-x"
      >
        Sistema de Gestión
      </h4>

      <button
        onClick={logout}
        className="btn btn-outline-light btn-sm ms-auto"
      >
        Cerrar sesión
      </button>
    </div>
  );
}




