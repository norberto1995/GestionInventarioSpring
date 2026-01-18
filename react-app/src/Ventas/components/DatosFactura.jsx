
import { imprimirFactura } from "../../utils/imprimirFactura";


export default function DatosFactura({
  busquedaCliente,
  setBusquedaCliente,
  clientesFiltrados,
  clienteSeleccionado,
  setClienteSeleccionado,
  formaPago,
  setFormaPago,
  vendedor,
  setVendedor,
  registrarVenta
}) {
  return (
    <>
      <h6 className="border-bottom pb-2">Datos de la factura</h6>

      <label className="fw-bold mt-2">Cliente</label>
      <div className="position-relative">
        <input
          className="form-control"
          placeholder="Buscar por nombre o documento"
          value={clienteSeleccionado ? clienteSeleccionado.nombre : busquedaCliente}
          onChange={(e) => {
            setBusquedaCliente(e.target.value);
            setClienteSeleccionado(null);
          }}
        />

        {busquedaCliente && !clienteSeleccionado && (
          <div className="list-group position-absolute w-100 shadow">
            {clientesFiltrados.map(c => (
              <button
                key={c.idCliente}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  setClienteSeleccionado(c);
                  setBusquedaCliente("");
                }}
              >
                {c.nombre} — {c.documento}
              </button>
            ))}
          </div>
        )}
      </div>

      <label className="fw-bold mt-3">Forma de pago</label>
      <select className="form-select" value={formaPago} onChange={e => setFormaPago(e.target.value)}>
        <option>Efectivo</option>
        <option>Tarjeta</option>
        <option>Transferencia</option>
      </select>

      <label className="fw-bold mt-3">Vendedor</label>
      <select className="form-select" value={vendedor} onChange={e => setVendedor(e.target.value)}>
        <option>Juan</option>
        <option>Carlos</option>
        <option>Pedro</option>
      </select>

      <button
        className="btn btn-primary w-100 mt-3"
        onClick={async () => {
          const ventaCreada = await registrarVenta(); // registrar la venta
          if (ventaCreada) {
            imprimirFactura(ventaCreada); // imprimir factura A4
          }
        }}
      >
        <i className="bi bi-printer"></i> Registrar e Imprimir
      </button>
    </>
  );
}
