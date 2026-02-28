export default function TotalesFactura({ subtotal, totalIva, total, cambio, descuento, setDescuento, pago, setPago, formatMoney, darkMode }) {
  const labelClass = `small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-muted'}`;
  
  return (
    <div className="row g-4 align-items-center">
      <div className="col-md-6">
        <div className="row g-3">

            {/* pendiente descuento  
           
          <div className="col-6">
            <label className={labelClass}>Descuento</label>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-transparent border-end-0">$</span>
              <input className="form-control form-control-sm border-start-0 shadow-none" type="number" value={descuento} onChange={e => setDescuento(e.target.value)} />
            </div>
          </div> */}

          <div className="col-6">
            <label className={labelClass}>Efectivo Recibido</label>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-primary bg-opacity-10 border-primary border-end-0 text-primary">$</span>
              <input className="form-control form-control-sm border-primary border-start-0 shadow-none fw-bold" type="number" value={pago} onChange={e => setPago(e.target.value)} />
            </div>
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
            <span className="h2 mb-0 fw-bolder text-primary">{formatMoney(total)}</span>
          </div>
          {pago > 0 && (
            <div className="d-flex justify-content-between mt-3 pt-3 border-top border-dashed">
              <span className="small fw-bold text-success opacity-75">SU CAMBIO:</span>
              <span className="h5 mb-0 fw-bold text-success">{formatMoney(cambio)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

