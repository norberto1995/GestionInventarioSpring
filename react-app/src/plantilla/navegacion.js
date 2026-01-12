import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navegacion() {

 const [clientesOpen, setClientesOpen] = useState(false);
  const [productosOpen, setProductosOpen] = useState(false);


  return (
     
<div className="d-flex flex-column p-3 bg-light" style={{height: "100vh", width: "250px"}}>
      <h4>DASHBOARD</h4>
      <hr/>

      <ul className="nav nav-pills flex-column mb-2">

        {/* CLIENTES */}
        <li className="nav-item">
          <button
            className="btn btn-secondary w-100 text-start"
            onClick={() => setClientesOpen(!clientesOpen)}
          >
            Clientes
          </button>

          {clientesOpen && (
            <ul className="nav flex-column ms-3 mt-2">
              <li className="nav-item mb-1">
                <Link className="nav-link" to="/clientes/listar">
                  Listar clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clientes/agregar">
                  Agregar cliente
                </Link>
              </li>
            </ul>
          )}
        </li>

        <hr />

        {/* PRODUCTOS */}
        <li className="nav-item">
          <button
            className="btn btn-secondary w-100 text-start"
            onClick={() => setProductosOpen(!productosOpen)}
          >
            Productos
          </button>

          {productosOpen && (
            <ul className="nav flex-column ms-3 mt-2">
              <li className="nav-item mb-1">
                <Link className="nav-link" to="/productos/listar">
                  Listar productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos/agregar">
                  Agregar producto
                </Link>
              </li>
            </ul>
          )}
        </li>

      </ul>
      
    </div>


       );
}