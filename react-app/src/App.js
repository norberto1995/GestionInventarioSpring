import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isTokenExpired } from "./utils/auth";

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

import Dashboard from "./pages/Dashboard";  

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("rol");
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🔁 RUTA RAÍZ */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
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
         {/* DASHBOARD (Página de inicio al entrar) */}
          <Route path="dashboard" element={<Dashboard />} />

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
          <Route path="venta/listar" element={<ListarVentas />} />

          {/* USUARIOS */}
          <Route path="usuarios/crear" element={<CrearUsuario />} />
          <Route path="usuarios/listar" element={<ListarUsuarios />} />
          <Route path="usuarios/editar/:id" element={<EditarUsuario />} />


{/* Redirección por defecto dentro del sistema privado */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} /> 
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;




