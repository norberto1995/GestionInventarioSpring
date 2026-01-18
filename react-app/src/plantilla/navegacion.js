import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navegacion() {

  const [clientesOpen, setClientesOpen] = useState(false);
  const [productosOpen, setProductosOpen] = useState(false);
  const [facturasOpen, setFacturasOpen] = useState(false);
  const [usuariosOpen, setUsuariosOpen] = useState(false);


  const rol = localStorage.getItem("rol"); // 👈 CLAVE

  return (
    <div
      className="d-flex flex-column vh-100 p-3 text-white"
      style={{ backgroundColor: "#1f2933" }}
    >

      <h5 className="text-center mb-3 fw-bold">DASHBOARD</h5>
      <hr className="border-secondary" />

      <div className="text-center mb-3">
        <img
          src="https://logo.svgcdn.com/token-branded/free.png"
          alt="Logo Dashboard"
          className="img-fluid rounded-circle"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
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
            Clientes
          </button>

          {clientesOpen && (
            <ul className="nav flex-column ms-3 mt-2 rounded p-2" style={{ backgroundColor: "#2d3748" }}>
              <li className="nav-item">
                <Link className="nav-link text-light py-1" to="/clientes/listar">
                  Listar clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light py-1" to="/clientes/agregar">
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
            Productos
          </button>

          {productosOpen && (
            <ul className="nav flex-column ms-3 mt-2 rounded p-2" style={{ backgroundColor: "#2d3748" }}>
              <li className="nav-item">
                <Link className="nav-link text-light py-1" to="/productos/listar">
                  Listar productos
                </Link>
              </li>


              {rol === "ROLE_ADMIN" && (
                <li className="nav-item">
                  <Link className="nav-link text-light py-1" to="/productos/agregar">
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
            Facturas
          </button>

          {facturasOpen && (
            <ul className="nav flex-column ms-3 mt-2 rounded p-2" style={{ backgroundColor: "#2d3748" }}>
              <li className="nav-item">
                <Link className="nav-link text-light py-1" to="/venta/crear">
                  Crear factura
                </Link>
              </li>

               <li className="nav-item">
                <Link className="nav-link text-light py-1" to="/venta/listar">
                  Listar Facturas
                </Link>
              </li>

            </ul>
          )}
        </li>

        {/* USUARIOS (SOLO ADMIN) */}
        {rol === "ROLE_ADMIN" && (
          <li className="nav-item">
            <button
              className="btn w-100 text-start text-white"
              style={{ backgroundColor: "#374151" }}
              onClick={() => setUsuariosOpen(!usuariosOpen)}
            >
              Usuarios
            </button>

            {usuariosOpen && (
              <ul
                className="nav flex-column ms-3 mt-2 rounded p-2"
                style={{ backgroundColor: "#2d3748" }}
              >
                <li className="nav-item">
                  <Link className="nav-link text-light py-1" to="/usuarios/listar">
                    Listar usuarios
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-light py-1" to="/usuarios/crear">
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

