import { useState, useEffect } from "react";
import Header from "../plantilla/Header";
import Navegacion from "../plantilla/navegacion";
import { Outlet } from "react-router-dom";

export default function LayoutPrivado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    // Activamos el motor de temas de Bootstrap
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="container-fluid min-vh-100 p-0">
      
      <Header 
        toggleMenu={() => setMenuAbierto(!menuAbierto)} 
        darkMode={darkMode} 
        toggleTheme={() => setDarkMode(!darkMode)} 
      />

      <div className="row g-0" style={{ minHeight: "calc(100vh - 70px)" }}>
        
        {/* SIDEBAR DESKTOP */}
        <div className="col-md-2 d-none d-md-block p-0 shadow-sm border-end bg-body-tertiary">
          <Navegacion darkMode={darkMode} />
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="col-12 col-md-10 p-3 p-md-4">
          <div className="container-fluid animate__animated animate__fadeIn">
            {/* Pasamos darkMode por context por si los hijos lo necesitan */}
            <Outlet context={{ darkMode }} />
          </div>
        </div>
      </div>

      {/* SIDEBAR MÓVIL */}
      {menuAbierto && (
        <>
          <div className="modal-backdrop fade show d-md-none" onClick={() => setMenuAbierto(false)}></div>
          <div 
            className="position-fixed top-0 start-0 vh-100 shadow-lg animate__animated animate__slideInLeft bg-body-tertiary" 
            style={{ width: "260px", zIndex: 1060 }}
          >
            <Navegacion darkMode={darkMode} cerrarMenu={() => setMenuAbierto(false)} />
          </div>
        </>
      )}
    </div>
  );
}





