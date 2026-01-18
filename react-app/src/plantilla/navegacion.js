import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navegacion({ cerrarMenu }) {

  const [clientesOpen, setClientesOpen] = useState(false);
  const [productosOpen, setProductosOpen] = useState(false);
  const [facturasOpen, setFacturasOpen] = useState(false);
  const [usuariosOpen, setUsuariosOpen] = useState(false);

  const rol = localStorage.getItem("rol");

  const cerrar = () => {
    if (cerrarMenu) cerrarMenu();
  };

  return (
    <div
      className="h-100 d-flex flex-column p-3 text-white"
      style={{ backgroundColor: "#1f2933" }}
    >
      <h5 className="text-center fw-bold mb-3">DASHBOARD</h5>
      <hr className="border-secondary" />


      <div className="text-center mb-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828673.png"
          alt="Panel"
          style={{ width: "80px" }}
        />
      </div>


      <ul className="nav nav-pills flex-column gap-2">

        {/* CLIENTES */}
        <li className="nav-item">
          <button
            className="btn w-100 text-start text-white"
            style={{ backgroundColor: "#374151" }}
            onClick={() => setClientesOpen(!clientesOpen)}
          >
            👤 Clientes
          </button>

          {clientesOpen && (
            <ul className="nav flex-column ms-3 mt-2 p-2 rounded"
              style={{ backgroundColor: "#2d3748" }}>
              <li className="nav-item">
                <Link
                  className="nav-link text-light py-1"
                  to="/clientes/listar"
                  onClick={cerrar}
                >
                  Listar clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light py-1"
                  to="/clientes/agregar"
                  onClick={cerrar}
                >
                  Agregar cliente
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* PRODUCTOS */}
        <li className="nav-item">
          <button
            className="btn w-100 text-start text-white"
            style={{ backgroundColor: "#374151" }}
            onClick={() => setProductosOpen(!productosOpen)}
          >
            📦 Productos
          </button>

          {productosOpen && (
            <ul className="nav flex-column ms-3 mt-2 p-2 rounded"
              style={{ backgroundColor: "#2d3748" }}>
              <li className="nav-item">
                <Link
                  className="nav-link text-light py-1"
                  to="/productos/listar"
                  onClick={cerrar}
                >
                  Listar productos
                </Link>
              </li>

              {rol === "ROLE_ADMIN" && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-light py-1"
                    to="/productos/agregar"
                    onClick={cerrar}
                  >
                    Agregar producto
                  </Link>
                </li>
              )}
            </ul>
          )}
        </li>

        {/* FACTURAS */}
        <li className="nav-item">
          <button
            className="btn w-100 text-start text-white"
            style={{ backgroundColor: "#374151" }}
            onClick={() => setFacturasOpen(!facturasOpen)}
          >
            🧾 Facturas
          </button>

          {facturasOpen && (
            <ul className="nav flex-column ms-3 mt-2 p-2 rounded"
              style={{ backgroundColor: "#2d3748" }}>
              <li className="nav-item">
                <Link
                  className="nav-link text-light py-1"
                  to="/venta/crear"
                  onClick={cerrar}
                >
                  Crear factura
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light py-1"
                  to="/venta/listar"
                  onClick={cerrar}
                >
                  Listar facturas
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* USUARIOS (ADMIN) */}
        {rol === "ROLE_ADMIN" && (
          <li className="nav-item">
            <button
              className="btn w-100 text-start text-white"
              style={{ backgroundColor: "#374151" }}
              onClick={() => setUsuariosOpen(!usuariosOpen)}
            >
              👥 Usuarios
            </button>

            {usuariosOpen && (
              <ul className="nav flex-column ms-3 mt-2 p-2 rounded"
                style={{ backgroundColor: "#2d3748" }}>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light py-1"
                    to="/usuarios/listar"
                    onClick={cerrar}
                  >
                    Listar usuarios
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light py-1"
                    to="/usuarios/crear"
                    onClick={cerrar}
                  >
                    Crear usuario
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

      </ul>
    </div>
  );
}








