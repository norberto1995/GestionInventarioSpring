export default function TablaDetalle({ detalleFactura, eliminarProducto, formatMoney }) {
  return (
    <>
      <h5>Detalle de la factura</h5>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Cod</th>
            <th>Producto</th>
            <th>Cant</th>
            <th>Precio</th>
            <th>IVA</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {detalleFactura.map(p => (
            <tr key={p.idProducto}>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.cantidad}</td>
              <td>{formatMoney(p.precioVenta)}</td>
              <td>{p.iva}%</td>
              <td>{formatMoney((p.precioVenta * p.cantidad) * (1 + p.iva / 100))}</td>
              <td>
                <i
                  className="bi bi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => eliminarProducto(p.idProducto)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
