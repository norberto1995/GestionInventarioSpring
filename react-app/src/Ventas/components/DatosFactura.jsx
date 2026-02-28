export default function DatosFactura({
  busquedaCliente, setBusquedaCliente, clientesFiltrados, clienteSeleccionado,
  setClienteSeleccionado, formaPago, setFormaPago, vendedor, setVendedor,
  registrarVenta, loadingFactura, darkMode
}) {

  const handleRegistrar = async () => {
    const ventaCreada = await registrarVenta();
    if (!ventaCreada) return;
    if (ventaCreada.estadoElectronico === "VALIDADA" && ventaCreada.publicUrl) {
      window.open(ventaCreada.publicUrl, "_blank");
    } else {
      alert("La factura no fue validada correctamente.");
    }
  };

  const inputClass = `form-control ${darkMode ? 'bg-secondary bg-opacity-10 border-secondary text-white' : 'bg-light border-0 shadow-none'}`;
  const selectClass = `form-select form-select-sm ${darkMode ? 'bg-secondary bg-opacity-25 border-secondary text-white' : 'bg-light border-0 shadow-none'}`;

  return (
    <>
      <h6 className="fw-bolder text-uppercase small text-muted mb-4 tracking-widest border-bottom border-opacity-10 pb-2">Facturación Electrónica</h6>
      
      <div className="mb-4 position-relative">
        <label className={`form-label small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-muted'}`}>Cliente Destinatario</label>
        <div className="input-group border rounded-3 overflow-hidden">
          <span className="input-group-text bg-transparent border-0"><i className="bi bi-person-badge text-primary"></i></span>
          <input
            className={`form-control border-0 shadow-none ${clienteSeleccionado ? 'fw-bold text-success' : ''}`}
            placeholder="Nombre o NIT..."
            value={clienteSeleccionado ? clienteSeleccionado.nombre : busquedaCliente}
            onChange={(e) => { setBusquedaCliente(e.target.value); setClienteSeleccionado(null); }}
            disabled={loadingFactura}
          />
        </div>

        {busquedaCliente && !clienteSeleccionado && (
          <div className={`list-group position-absolute w-100 shadow-lg mt-1 rounded-3 overflow-hidden z-3`} style={{ zIndex: 1050 }}>
            {clientesFiltrados.map(c => (
              <button key={c.idCliente} className={`list-group-item list-group-item-action py-3 border-0 ${darkMode ? 'bg-dark text-white border-bottom border-secondary border-opacity-25' : 'bg-white'}`} 
                onClick={() => { setClienteSeleccionado(c); setBusquedaCliente(""); }}>
                <div className="fw-bold small">{c.nombre}</div>
                <div className="text-muted extra-small">{c.documento}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6">
          <label className={`form-label small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-muted'}`}>Pago</label>
          <select className={selectClass} value={formaPago} onChange={e => setFormaPago(e.target.value)} disabled={loadingFactura}>
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>Transferencia</option>
          </select>
        </div>
        <div className="col-6">
          <label className={`form-label small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-muted'}`}>Vendedor</label>
          <select className={selectClass} value={vendedor} onChange={e => setVendedor(e.target.value)} disabled={loadingFactura}>
            <option>Juan</option>
            <option>Carlos</option>
            <option>Pedro</option>
          </select>
        </div>
      </div>

      <button
        className={`btn ${loadingFactura ? 'btn-secondary' : 'btn-primary'} w-100 py-3 rounded-4 shadow fw-bolder border-0 mt-2`}
        onClick={handleRegistrar}
        disabled={loadingFactura}
      >
        {loadingFactura ? (
          <><span className="spinner-border spinner-border-sm me-2"></span>PROCESANDO...</>
        ) : (
          <><i className="bi bi-lightning-charge-fill me-2"></i> FACTURAR AHORA</>
        )}
      </button>
    </>
  );
}