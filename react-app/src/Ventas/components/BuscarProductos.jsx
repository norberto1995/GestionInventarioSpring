export default function BuscarProductos({
  productosFiltrados,
  busquedaProducto,
  setBusquedaProducto,
  cantidades,
  setCantidades,
  agregarProducto,
  formatMoney
}) {
  return (
    <>
      <h6 className="border-bottom mt-4 pb-2">Adicionar productos</h6>

      <input
        className="form-control mb-2"
        placeholder="Buscar por código o nombre"
        value={busquedaProducto}
        onChange={(e) => setBusquedaProducto(e.target.value)}
      />

      <table className="table table-sm table-hover">
        <thead className="table-dark">
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map(p => (
            <tr key={p.idProducto}>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{formatMoney(p.precioVenta)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  className="form-control form-control-sm"
                  style={{ width: "80px" }}
                  value={cantidades[p.idProducto] || ""}
                  onChange={(e) =>
                    setCantidades({
                      ...cantidades,
                      [p.idProducto]: e.target.value
                    })
                  }
                />
              </td>
              <td>
                <i
                  className="bi bi-plus-square text-success"
                  style={{ cursor: "pointer" }}
                  onClick={() => agregarProducto(p)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
