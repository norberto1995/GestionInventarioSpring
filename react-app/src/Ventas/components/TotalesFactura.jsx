export default function TotalesFactura({
  subtotal,
  totalIva,
  total,
  cambio,
  descuento,
  setDescuento,
  pago,
  setPago,
  formatMoney
}) {
  return (
    <div className="row mt-3">
      <div className="col-12 col-md-6 mb-3 mb-md-0">
        <input
          className="form-control mb-2"
          placeholder="Descuento"
          value={descuento}
          onChange={e => setDescuento(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Pago del cliente"
          value={pago}
          onChange={e => setPago(e.target.value)}
        />
      </div>

      <div className="col-12 col-md-6 text-start text-md-end">
        <p>Subtotal: {formatMoney(subtotal)}</p>
        <p>IVA: {formatMoney(totalIva)}</p>
        <p><b>Total: {formatMoney(total)}</b></p>
        <p><b>Cambio: {formatMoney(cambio)}</b></p>
      </div>
    </div>
  );
}

