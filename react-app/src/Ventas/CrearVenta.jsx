import useVenta from "./hooks/useVenta";
import DatosFactura from "./components/DatosFactura";
import BuscarProductos from "./components/BuscarProductos";
import TablaDetalle from "./components/TablaDetalle";
import TotalesFactura from "./components/TotalesFactura";
import { useOutletContext } from "react-router-dom";

export default function CrearVenta() {
  const venta = useVenta();
  const { darkMode } = useOutletContext();

  return (
    <div className={`container-fluid min-vh-100 p-3 p-md-4 animate__animated animate__fadeIn ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className="row g-4">
        {/* PANEL IZQUIERDO: Configuración y Búsqueda */}
        <div className="col-12 col-lg-4">
          <div className={`card border-0 shadow-sm rounded-4 mb-4 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`}>
            <div className="card-body p-4">
              <DatosFactura {...venta} darkMode={darkMode} />
            </div>
          </div>
          <div className={`card border-0 shadow-sm rounded-4 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`}>
            <div className="card-body p-4">
              <BuscarProductos {...venta} darkMode={darkMode} />
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: Detalle de la Venta actual */}
        <div className="col-12 col-lg-8">
          <div className={`card border-0 shadow-sm rounded-4 h-100 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`}>
            <div className="card-body p-4 d-flex flex-column">
              <div className="flex-grow-1">
                <TablaDetalle {...venta} darkMode={darkMode} />
              </div>
              <div className="mt-auto pt-4 border-top border-opacity-10">
                <TotalesFactura {...venta} darkMode={darkMode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






