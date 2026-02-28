export default function TablaDetalle({ detalleFactura, eliminarProducto, formatMoney, darkMode }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
             <i className="bi bi-cart-check-fill text-primary"></i>
          </div>
          <h5 className="fw-bolder mb-0 text-body">Detalle de Venta</h5>
        </div>
        <span className={`badge rounded-pill px-3 py-2 ${darkMode ? 'bg-light text-dark' : 'bg-dark'}`}>
          {detalleFactura.length} Ítems
        </span>
      </div>

      <div className="table-responsive">
        <table className={`table table-hover align-middle ${darkMode ? 'table-dark table-borderless' : ''}`}>
          <thead>
            <tr className="small text-muted text-uppercase tracking-wider">
              <th className="border-0 pb-3" style={{width: '80px'}}>Cod</th>
              <th className="border-0 pb-3">Descripción</th>
              <th className="border-0 pb-3 text-center">Cant</th>
              <th className="border-0 pb-3 text-end">Precio</th>
              <th className="border-0 pb-3 text-end">Subtotal</th>
              <th className="border-0 pb-3"></th>
            </tr>
          </thead>
          <tbody className="border-top-0">
            {detalleFactura.map(p => (
              <tr key={p.idProducto} className="border-bottom border-opacity-10">
                <td className="small text-muted">{p.codigo}</td>
                <td>
                  <div className="fw-bold text-body">{p.nombre}</div>
                  <div className="extra-small text-muted">IVA {p.iva}%</div>
                </td>
                <td className="text-center">
                  <span className={`badge rounded-3 px-2 py-1 border ${darkMode ? 'bg-secondary bg-opacity-25 border-secondary' : 'bg-white text-dark border-light shadow-sm'}`}>
                    {p.cantidad}
                  </span>
                </td>
                <td className="text-end small text-muted">{formatMoney(p.precioVenta)}</td>
                <td className="text-end fw-bold text-body">{formatMoney((p.precioVenta * p.cantidad) * (1 + p.iva / 100))}</td>
                <td className="text-center text-end">
                  <button 
                    className="btn btn-link text-danger p-0 border-0" 
                    onClick={() => eliminarProducto(p.idProducto)}
                  >
                    <i className="bi bi-trash3-fill fs-5"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {detalleFactura.length === 0 && (
          <div className="text-center py-5 opacity-50">
            <i className="bi bi-bag-plus fs-1 d-block mb-2"></i>
            <p className="small">La lista de venta está vacía</p>
          </div>
        )}
      </div>
    </>
  );
}
