import useVenta from "./hooks/useVenta";

import DatosFactura from "./components/DatosFactura";
import BuscarProductos from "./components/BuscarProductos";
import TablaDetalle from "./components/TablaDetalle";
import TotalesFactura from "./components/TotalesFactura";

export default function CrearVenta() {
  const venta = useVenta();

  return (
    <div className="container-fluid p-3 p-md-4">
      <div className="row g-3">

        {/* IZQUIERDA */}
        <div className="col-12 col-md-4">
          <div className="card shadow h-100">
            <div className="card-body">

              <DatosFactura {...venta} />
              <BuscarProductos {...venta} />

            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className="col-12 col-md-8">
          <div className="card shadow h-100">
            <div className="card-body">

              <TablaDetalle {...venta} />
              <TotalesFactura {...venta} />

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}






