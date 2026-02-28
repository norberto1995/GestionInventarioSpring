import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navegacion({ cerrarMenu, darkMode }) {
  const [openMenus, setOpenMenus] = useState({ 
    clientes: false, 
    productos: false, 
    facturas: false, 
    usuarios: false 
  });
  const location = useLocation();
  const rol = localStorage.getItem("rol");

  const toggleMenu = (menu) => setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  
  const isActive = (path) => location.pathname === path 
    ? "bg-primary text-white shadow-sm fw-bold" 
    : `${darkMode ? 'text-white-50' : 'text-body opacity-75'} hover-link`;

  return (
    <div className={`h-100 d-flex flex-column transition-all ${darkMode ? 'bg-dark border-end border-secondary border-opacity-25' : 'bg-body-tertiary'}`}>
      
      {/* 🚀 LOGO / BRANDING (Link al Dashboard) */}
      <Link to="/dashboard" className="text-decoration-none p-4 text-center d-block animate__animated animate__fadeIn" onClick={cerrarMenu}>
        <div className={`rounded-4 p-3 mb-2 shadow-sm d-inline-block transition-all ${
          darkMode ? 'bg-info bg-opacity-10 border border-info border-opacity-25' : 'bg-primary bg-opacity-10'
        }`}>
          <i className={`bi bi-lightning-charge-fill fs-3 ${darkMode ? 'text-info' : 'text-primary'}`}></i>
        </div>
        <h6 className={`fw-bolder mb-0 tracking-wider ${darkMode ? 'text-white' : 'text-body'}`}>
          POS <span className={darkMode ? 'text-info' : 'text-primary'}>PREMIUM</span>
        </h6>
      </Link>

      {/* Menú de Navegación */}
      <div className="flex-grow-1 px-3 overflow-auto custom-scrollbar">
        <ul className="nav nav-pills flex-column gap-1">
          
          {/* 📊 SECCIÓN DASHBOARD (ACCESO RÁPIDO) */}
          <li className="nav-item mb-2">
            <Link 
              to="/dashboard" 
              onClick={cerrarMenu}
              className={`nav-link d-flex align-items-center py-2 px-3 rounded-3 border-0 transition-all ${
                location.pathname === '/dashboard' 
                ? 'bg-primary text-white shadow-sm fw-bold' 
                : (darkMode ? 'text-white-50' : 'text-body opacity-75')
              }`}
            >
              <i className={`bi bi-speedometer2 me-3 fs-5 ${location.pathname === '/dashboard' ? 'text-white' : (darkMode ? 'text-info' : 'text-primary')}`}></i>
              <span className="small">Panel Principal</span>
            </Link>
          </li>

          <div className={`mx-3 my-2 border-bottom opacity-10 ${darkMode ? 'border-white' : 'border-dark'}`}></div>

          {/* SECCIÓN CLIENTES */}
          <MenuSection titulo="Clientes" icono="bi-people" isOpen={openMenus.clientes} onClick={() => toggleMenu("clientes")} darkMode={darkMode}>
            <SubLink to="/clientes/listar" texto="Listado" active={isActive("/clientes/listar")} onClick={cerrarMenu} />
            <SubLink to="/clientes/agregar" texto="Nuevo Cliente" active={isActive("/clientes/agregar")} onClick={cerrarMenu} />
          </MenuSection>

          {/* SECCIÓN PRODUCTOS */}
          <MenuSection titulo="Productos" icono="bi-box-seam" isOpen={openMenus.productos} onClick={() => toggleMenu("productos")} darkMode={darkMode}>
            <SubLink to="/productos/listar" texto="Inventario" active={isActive("/productos/listar")} onClick={cerrarMenu} />
            {rol === "ROLE_ADMIN" && <SubLink to="/productos/agregar" texto="Cargar" active={isActive("/productos/agregar")} onClick={cerrarMenu} />}
          </MenuSection>

          {/* SECCIÓN VENTAS */}
          <MenuSection titulo="Ventas" icono="bi-receipt" isOpen={openMenus.facturas} onClick={() => toggleMenu("facturas")} darkMode={darkMode}>
            <SubLink to="/venta/crear" texto="Facturar" active={isActive("/venta/crear")} onClick={cerrarMenu} />
            <SubLink to="/venta/listar" texto="Historial" active={isActive("/venta/listar")} onClick={cerrarMenu} />
          </MenuSection>

          {/* SECCIÓN USUARIOS */}
          {rol === "ROLE_ADMIN" && (
            <MenuSection titulo="Usuarios" icono="bi-shield-lock" isOpen={openMenus.usuarios} onClick={() => toggleMenu("usuarios")} darkMode={darkMode}>
              <SubLink to="/usuarios/listar" texto="Gestión" active={isActive("/usuarios/listar")} onClick={cerrarMenu} />
              <SubLink to="/usuarios/crear" texto="Accesos" active={isActive("/usuarios/crear")} onClick={cerrarMenu} />
            </MenuSection>
          )}

        </ul>
      </div>

      {/* 👤 FOOTER INFO DEL USUARIO */}
      <div className="p-3 mt-auto border-top border-opacity-10">
        <div 
          className="rounded-4 p-3 d-flex align-items-center mb-2" 
          style={{ 
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
            border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`
          }}
        >
          <div className={`rounded-circle me-3 d-flex align-items-center justify-content-center shadow-sm ${
            darkMode ? 'bg-info bg-opacity-20 border border-info border-opacity-25' : 'bg-primary bg-opacity-10'
          }`} style={{ width: '42px', height: '42px' }}>
            <i className={`bi bi-person-circle fs-5 ${darkMode ? 'text-info' : 'text-primary'}`}></i>
          </div>

          <div className="overflow-hidden">
            <p className={`mb-0 small fw-bolder text-truncate ${darkMode ? 'text-white' : 'text-body'}`}>
              {rol ? rol.replace("ROLE_", "") : "Invitado"}
            </p>
            <div className="d-flex align-items-center gap-1">
              <span className="rounded-circle bg-success" style={{ width: '8px', height: '8px', boxShadow: '0 0 5px var(--bs-success)' }}></span>
              <p className={`mb-0 extra-small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-success opacity-75'}`}>Online</p>
            </div>
          </div>
        </div>

       
       
      </div>
    </div>
  );
}

// Subcomponente para las Secciones (Dropdowns)
function MenuSection({ titulo, icono, isOpen, onClick, children, darkMode }) {
  return (
    <li className="nav-item">
      <button 
        className={`btn w-100 text-start d-flex align-items-center justify-content-between py-2 px-3 rounded-3 border-0 transition-all ${
          isOpen 
            ? (darkMode ? 'bg-info bg-opacity-10 text-info' : 'bg-primary bg-opacity-10 text-primary') 
            : (darkMode ? 'text-white-50' : 'text-body')
        }`}
        onClick={onClick}
      >
        <div className="d-flex align-items-center">
          <i className={`bi ${icono} me-3 fs-5 ${isOpen ? (darkMode ? 'text-info' : 'text-primary') : 'opacity-50'}`}></i>
          <span className="small fw-bold">{titulo}</span>
        </div>
        <i className={`bi bi-chevron-${isOpen ? 'down' : 'right'} extra-small opacity-50`}></i>
      </button>
      <div className={`collapse ${isOpen ? 'show' : ''}`}>
        <ul className={`nav flex-column ms-4 border-start ps-2 mt-1 ${darkMode ? 'border-info border-opacity-25' : 'border-primary border-opacity-25'}`}>
          {children}
        </ul>
      </div>
    </li>
  );
}

// Subcomponente para los Links individuales
function SubLink({ to, texto, active, onClick }) {
  return (
    <li className="nav-item">
      <Link className={`nav-link py-2 mb-1 small rounded-3 transition-all ${active}`} to={to} onClick={onClick}>
        {texto}
      </Link>
    </li>
  );
}






