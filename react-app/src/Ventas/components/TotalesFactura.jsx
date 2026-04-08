export default function TotalesFactura({ 
  subtotal, totalIva, total, cambio, 
  pago, setPago, formatMoney, darkMode , paymentForm
}) {
  const pagoNum = Number(pago) || 0;
  const pagoInsuficiente = paymentForm === 2 && pagoNum > 0 && pagoNum < total;

  const labelClass = `small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-muted'}`;
  
  return (
    <div className="row g-4 align-items-center">
      <div className="col-md-6">
        <div className="row g-3">
          <div className="col-12">
            <label className={labelClass}>Efectivo Recibido</label>
            <div className="input-group">
              <span className={`input-group-text bg-transparent ${pagoInsuficiente ? 'border-danger text-danger' : 'border-primary text-primary'}`}>
                <i className="bi bi-cash-stack"></i>
              </span>
              <input 
                className={`form-control form-control-lg fw-bold shadow-none ${pagoInsuficiente ? 'border-danger text-danger' : 'border-primary'}`} 
                type="number" 
                value={pago} 
                onChange={e => setPago(e.target.value)}
                placeholder="0.00"
              />
            </div>
            {pagoInsuficiente && (
              <div className="text-danger extra-small fw-bold mt-1 animate__animated animate__headShake">
                <i className="bi bi-exclamation-circle-fill me-1"></i>
                El monto debe ser mayor o igual al total
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className={`p-4 rounded-4 border ${darkMode ? 'bg-black bg-opacity-20 border-secondary border-opacity-25' : 'bg-light border-white shadow-sm'}`}>
          <div className="d-flex justify-content-between mb-2 small text-muted">
            <span>Subtotal base:</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3 small text-muted">
            <span>Impuestos (IVA):</span>
            <span>{formatMoney(totalIva)}</span>
          </div>
          
          <div className="d-flex justify-content-between align-items-center pt-3 border-top border-opacity-10">
            <span className="fw-bold h5 mb-0 text-body">TOTAL A PAGAR:</span>
            <span className={`h2 mb-0 fw-bolder ${pagoInsuficiente ? 'text-danger' : 'text-primary'}`}>
              {formatMoney(total)}
            </span>
          </div>

          {pagoNum >= total && pagoNum > 0 && (
            <div className="d-flex justify-content-between mt-3 pt-3 border-top border-dashed animate__animated animate__fadeIn">
              <span className="small fw-bold text-success opacity-75">SU CAMBIO:</span>
              <span className="h5 mb-0 fw-bold text-success">{formatMoney(cambio)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
