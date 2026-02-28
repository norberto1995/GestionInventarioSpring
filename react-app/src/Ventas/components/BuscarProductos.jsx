export default function BuscarProductos({
  productosFiltrados, busquedaProducto, setBusquedaProducto,
  cantidades, setCantidades, agregarProducto, formatMoney, darkMode
}) {
  return (
    <>
      <h6 className="fw-bolder text-uppercase small text-muted mb-4 tracking-widest border-bottom border-opacity-10 pb-2">Catálogo</h6>
      <div className="input-group border rounded-4 overflow-hidden mb-4 bg-body shadow-sm">
        <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-muted"></i></span>
        <input
          className="form-control border-0 shadow-none ps-0"
          placeholder="¿Qué producto busca?"
          value={busquedaProducto}
          onChange={(e) => setBusquedaProducto(e.target.value)}
        />
      </div>

      <div className="table-responsive" style={{ maxHeight: "380px", overflowY: "auto" }}>
        <table className={`table table-sm table-hover align-middle ${darkMode ? 'table-dark' : ''}`}>
          <thead className={`sticky-top ${darkMode ? 'bg-dark' : 'bg-white'}`}>
            <tr className="small text-muted text-uppercase tracking-wider">
              <th className="border-0 pb-3 ps-0">Producto</th>
              <th className="border-0 pb-3 text-end">Precio</th>
              <th className="border-0 pb-3 text-center">Cant</th>
              <th className="border-0 pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map(p => (
              <tr key={p.idProducto} className="border-bottom border-opacity-10">
                <td className="ps-0 py-3">
                  <div className="fw-bold small text-body">{p.nombre}</div>
                  <div className="extra-small text-primary fw-bold">{p.codigo}</div>
                </td>
                <td className="text-end small fw-semibold text-body">{formatMoney(p.precioVenta)}</td>
                <td style={{ width: "70px" }}>
                  <input
                    type="number"
                    className={`form-control form-control-sm text-center border-0 rounded-3 ${darkMode ? 'bg-secondary bg-opacity-25 text-white' : 'bg-light'}`}
                    value={cantidades[p.idProducto] || ""}
                    placeholder="1"
                    onChange={(e) => setCantidades({ ...cantidades, [p.idProducto]: e.target.value })}
                  />
                </td>
                <td className="text-end pe-0">
                  <button className="btn btn-outline-success border-0 rounded-circle p-1" onClick={() => agregarProducto(p)}>
                    <i className="bi bi-plus-circle-fill fs-4"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
