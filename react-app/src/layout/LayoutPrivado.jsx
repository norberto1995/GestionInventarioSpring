import { useState } from "react";
import Header from "../plantilla/Header";
import Navegacion from "../plantilla/navegacion";
import { Outlet } from "react-router-dom";

export default function LayoutPrivado() {

  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="container-fluid min-vh-100 p-0">

      {/* HEADER */}
      <Header toggleMenu={() => setMenuAbierto(!menuAbierto)} />

      <div className="row g-0" style={{ minHeight: "calc(100vh - 70px)" }}>

        {/* SIDEBAR DESKTOP */}
        <div className="col-md-2 d-none d-md-block p-0">
          <Navegacion />
        </div>

        {/* CONTENIDO */}
        <div className="col-12 col-md-10 p-3">
          <Outlet />
        </div>

      </div>

      {/* SIDEBAR MÓVIL (OFFCANVAS) */}
      {menuAbierto && (
        <div
          className="position-fixed top-0 start-0 vh-100"
          style={{ width: "250px", zIndex: 1050 }}
        >
          <Navegacion cerrarMenu={() => setMenuAbierto(false)} />
        </div>
      )}
    </div>
  );
}





