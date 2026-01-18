import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import LayoutPrivado from "./layout/LayoutPrivado";

import ListarCliente from "./clientes/ListarCliente";
import AgregarCliente from "./clientes/AgregarCliente";
import EditarCliente from "./clientes/EditarCliente";

import ListarProducto from "./productos/ListarProducto";
import AgregarProducto from "./productos/AgregarProducto";
import EditarProducto from "./productos/EditarProducto";

import CrearVenta from "./Ventas/CrearVenta";
import CrearUsuario from "./usuarios/CrearUsuario";

import ListarUsuarios from "./usuarios/ListarUsuarios";
import EditarUsuario from "./usuarios/EditarUsuario";
import ListarVentas from "./Ventas/ListarVentas";




function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔁 RUTA RAÍZ */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/productos/listar" /> : <Navigate to="/login" />
          }
        />

        {/* 🔓 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 SISTEMA PRIVADO */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <LayoutPrivado />
            </ProtectedRoute>
          }
        >
          {/* CLIENTES */}
          <Route path="clientes/listar" element={<ListarCliente />} />
          <Route path="clientes/agregar" element={<AgregarCliente />} />
          <Route path="clientes/editar/:id" element={<EditarCliente />} />

          {/* PRODUCTOS */}
          <Route path="productos/listar" element={<ListarProducto />} />
          <Route path="productos/agregar" element={<AgregarProducto />} />
          <Route path="productos/editar/:id" element={<EditarProducto />} />

          {/* VENTAS */}
          <Route path="venta/crear" element={<CrearVenta />} />
          <Route path="venta/listar" element={<ListarVentas/>}/>

          {/* USUARIOS (SOLO ADMIN EN BACKEND) */}
          <Route path="usuarios/crear" element={<CrearUsuario />} />

          <Route path="usuarios/listar" element={<ListarUsuarios />} />
          <Route path="usuarios/editar/:id" element={<EditarUsuario />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



