import { useNavigate } from "react-router-dom";

export default function Header({ toggleMenu, darkMode, toggleTheme }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header 
      className="d-flex align-items-center px-4 shadow-sm border-bottom bg-body-tertiary"
      style={{ height: "70px", zIndex: 1030 }}
    >
      <button className="btn btn-outline-secondary d-md-none me-3" onClick={toggleMenu}>
        <i className="bi bi-list fs-4"></i>
      </button>

      <div className="me-auto d-none d-sm-block">
        <h5 className="m-0 fw-bolder tracking-tight">SISTEMA DE GESTIÓN</h5>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button 
          onClick={toggleTheme} 
          className="btn border-0 rounded-circle p-2"
          title="Cambiar Tema"
        > 
          <i className={`bi ${darkMode ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-secondary'} fs-5`}></i>
        </button>

        <div className="vr mx-2 opacity-25"></div>

        <button onClick={logout} className="btn btn-danger btn-sm px-3 rounded-pill d-flex align-items-center gap-2 shadow-sm fw-bold">
          <i className="bi bi-box-arrow-right"></i>
          <span className="d-none d-md-inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}






