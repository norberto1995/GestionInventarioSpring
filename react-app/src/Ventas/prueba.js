import axios from "axios";
import { useEffect, useState } from "react";

export default function CrearVenta() {

  const UrlProductos = "http://localhost:8080/gestion-app/productos";
  const UrlClientes = "http://localhost:8080/gestion-app/clientes";
  const UrlVentas = "http://localhost:8080/gestion-app/ventas";

  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detalleFactura, setDetalleFactura] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [descuento, setDescuento] = useState("");
  const [pago, setPago] = useState("");
  const [formaPago, setFormaPago] = useState("Efectivo");
  const [vendedor, setVendedor] = useState("Juan");

  useEffect(() => {
    cargarProductos();
    cargarClientes();
  }, []);

  const cargarProductos = async () => {
    const res = await axios.get(UrlProductos);
    setProductos(res.data);
  };

  const cargarClientes = async () => {
    const res = await axios.get(UrlClientes);
    setClientes(res.data);
  };

  // 🔍 FILTROS
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busquedaProducto.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busquedaProducto.toLowerCase())
  );

  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busquedaCliente.toLowerCase()) ||
    c.documento.toLowerCase().includes(busquedaCliente.toLowerCase())
  );

  const agregarProducto = (producto) => {
    const cantidadIngresada = Number(cantidades[producto.idProducto]);
    const cantidadFinal =
      (!cantidadIngresada || cantidadIngresada <= 0) ? 1 : cantidadIngresada;

    setDetalleFactura(prev => {
      const existe = prev.find(p => p.idProducto === producto.idProducto);

      if (existe) {
        return prev.map(p =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: p.cantidad + cantidadFinal }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad: cantidadFinal }];
      }
    });

    setCantidades(prev => ({
      ...prev,
      [producto.idProducto]: ""
    }));
  };

  const eliminarProducto = (id) => {
    setDetalleFactura(prev => prev.filter(p => p.idProducto !== id));
  };

  // 💰 CÁLCULOS
  const subtotal = detalleFactura.reduce(
    (sum, p) => sum + p.precioVenta * p.cantidad, 0
  );

  const totalIva = detalleFactura.reduce(
    (sum, p) => sum + (p.precioVenta * p.cantidad * p.iva / 100), 0
  );

  const totalBruto = subtotal + totalIva;
  const descuentoNum = Number(descuento) || 0;
  const pagoNum = Number(pago) || 0;
  const total = totalBruto - descuentoNum;
  const cambio = pagoNum - total;

  const formatMoney = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP"
    }).format(valor);

  // 🖨️ REGISTRAR VENTA
  const registrarVenta = async () => {
    if (!clienteSeleccionado) {
      alert("Seleccione un cliente");
      return;
    }

    if (detalleFactura.length === 0) {
      alert("Agregue productos");
      return;
    }

    const ventaDTO = {
      clienteId: clienteSeleccionado.idCliente,
      formaPago,
      vendedor,
      pago: pagoNum,
      descuento: descuentoNum,
      detalles: detalleFactura.map(p => ({
        productoId: p.idProducto,
        cantidad: p.cantidad
      }))
    };

    try {
      const res = await axios.post(UrlVentas, ventaDTO);
      alert("Venta registrada correctamente");
      console.log("VENTA:", res.data);

      setDetalleFactura([]);
      setPago("");
      setDescuento("");
      setClienteSeleccionado(null);

    } catch (error) {
      console.error(error);
      alert("Error al registrar la venta");
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">

        {/* IZQUIERDA */}
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">

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
              <select
                className="form-select"
                value={formaPago}
                onChange={e => setFormaPago(e.target.value)}
              >
                <option>Efectivo</option>
                <option>Tarjeta</option>
                <option>Transferencia</option>
              </select>

              <label className="fw-bold mt-3">Vendedor</label>
              <select
                className="form-select"
                value={vendedor}
                onChange={e => setVendedor(e.target.value)}
              >
                <option>Juan</option>
                <option>Carlos</option>
                <option>Pedro</option>
              </select>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={registrarVenta}
              >
                <i className="bi bi-printer"></i> Imprimir
              </button>

            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              {/* igual que antes, sin cambios */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
