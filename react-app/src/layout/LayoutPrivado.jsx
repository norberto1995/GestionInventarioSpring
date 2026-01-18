import Header from "../plantilla/Header";
import Navegacion from "../plantilla/navegacion";
import { Outlet } from "react-router-dom";

export default function LayoutPrivado() {
  return (
    <div className="container-fluid min-vh-100">

      {/* HEADER */}
      <div className="row">
        <div className="col-12 p-0">
          <Header />
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="row flex-grow-1">
        <div className="col-2 p-0">
          <Navegacion />
        </div>

        <div className="col-10 p-3">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
