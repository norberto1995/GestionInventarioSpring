export default function DatosFactura({
  busquedaCliente, setBusquedaCliente, clientesFiltrados, clienteSeleccionado,
  setClienteSeleccionado, paymentForm, setPaymentForm, 
  paymentMethodCode, setPaymentMethodCode, paymentDueDate, setPaymentDueDate,
  observation, setObservation, registrarVenta, loadingFactura, darkMode
}) {

  const handleRegistrar = async () => {
    const ventaCreada = await registrarVenta();
    if (!ventaCreada) return;
    
    if (ventaCreada.estadoElectronico === "VALIDADA" && ventaCreada.publicUrl) {
      window.open(ventaCreada.publicUrl, "_blank");
    } else {
      alert("Venta registrada, pero la factura electrónica no pudo ser validada automáticamente.");
    }
  };

  const inputClass = `form-control form-control-sm ${darkMode ? 'bg-secondary bg-opacity-10 border-secondary text-white' : 'bg-light border-0 shadow-none'}`;
  const selectClass = `form-select form-select-sm ${darkMode ? 'bg-secondary bg-opacity-25 border-secondary text-white' : 'bg-light border-0 shadow-none'}`;

  return (
    <div className="p-1">
      <h6 className="fw-bolder text-uppercase small text-muted mb-3 border-bottom border-opacity-10 pb-2">
        <i className="bi bi-receipt me-2"></i>Facturación Electrónica
      </h6>
      
      {/* Selector de Cliente */}
      <div className="mb-3 position-relative">
        <label className="extra-small fw-bold text-muted mb-1 d-block text-uppercase">Cliente</label>
        <div className="input-group input-group-sm border rounded-3 overflow-hidden">
          <span className="input-group-text bg-transparent border-0"><i className="bi bi-person-vcard text-primary"></i></span>
          <input
            className={`form-control border-0 shadow-none ${clienteSeleccionado ? 'fw-bold text-success' : ''}`}
            placeholder="Buscar por nombre o NIT..."
            value={clienteSeleccionado ? clienteSeleccionado.nombre : busquedaCliente}
            onChange={(e) => { setBusquedaCliente(e.target.value); setClienteSeleccionado(null); }}
            disabled={loadingFactura}
          />
        </div>

        {busquedaCliente && !clienteSeleccionado && (
          <div className="list-group position-absolute w-100 shadow-lg mt-1 rounded-3 z-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {clientesFiltrados.map(c => (
              <button key={c.idCliente} className={`list-group-item list-group-item-action py-2 ${darkMode ? 'bg-dark text-white border-secondary' : 'bg-white'}`} 
                onClick={() => { setClienteSeleccionado(c); setBusquedaCliente(""); }}>
                <div className="fw-bold small">{c.nombre}</div>
                <div className="text-muted extra-small">{c.documento}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="row g-2 mb-3">
        {/* Forma de Pago */}
        <div className="col-6">
          <label className="extra-small fw-bold text-muted mb-1 d-block text-uppercase">Tipo</label>
          <select className={selectClass} value={paymentForm} onChange={e => setPaymentForm(e.target.value)} disabled={loadingFactura}>
            <option value="1">Contado</option>
            <option value="2">Crédito</option>
          </select>
        </div>

        {/* Método de Pago */}
        <div className="col-6">
          <label className="extra-small fw-bold text-muted mb-1 d-block text-uppercase">Método</label>
          <select className={selectClass} value={paymentMethodCode} onChange={e => setPaymentMethodCode(e.target.value)} disabled={loadingFactura}>
            <option value="10">Efectivo</option>
            <option value="47">Transferencia</option>
            <option value="42">Consignación</option>
            <option value="49">Tarjeta Débito</option>
            <option value="48">Tarjeta Crédito</option>

          </select>
        </div>
      </div>

      {/* Fecha de Vencimiento Dinámica */}
      {paymentForm === "2" && (
        <div className="mb-3 animate__animated animate__fadeInDown">
          <label className="extra-small fw-bold text-primary mb-1 d-block text-uppercase">Vencimiento de Factura</label>
          <input 
            type="date" 
            className={`${inputClass} border-primary border-opacity-50`} 
            value={paymentDueDate} 
            onChange={e => setPaymentDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} // HTML5 validation
          />
        </div>
      )}

      {/* Observaciones */}
      <div className="mb-4">
        <label className="extra-small fw-bold text-muted mb-1 d-block text-uppercase">Notas de la factura</label>
        <textarea 
          className={inputClass} 
          rows="2" 
          placeholder="Ej: Entregar en portería..."
          value={observation}
          onChange={e => setObservation(e.target.value)}
          disabled={loadingFactura}
        ></textarea>
      </div>

      <button
        className={`btn ${loadingFactura ? 'btn-secondary' : 'btn-primary'} w-100 py-3 rounded-4 shadow-sm fw-bolder border-0`}
        onClick={handleRegistrar}
        disabled={loadingFactura}
      >
        {loadingFactura ? (
          <><span className="spinner-border spinner-border-sm me-2"></span>PROCESANDO...</>
        ) : (
          <><i className="bi bi-lightning-charge-fill me-2"></i> EMITIR FACTURA</>
        )}
      </button>
    </div>
  );
}