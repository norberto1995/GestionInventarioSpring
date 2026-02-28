import { useEffect, useState } from "react";
import {
  obtenerClientes,
  obtenerProductos,
  registrarVentaApi
} from "../services/ventaService";

export default function useVenta() {

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

  const [loadingFactura, setLoadingFactura] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const [prod, cli] = await Promise.all([
      obtenerProductos(),
      obtenerClientes()
    ]);
    setProductos(prod.data);
    setClientes(cli.data);
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busquedaProducto.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busquedaProducto.toLowerCase())
  );

  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busquedaCliente.toLowerCase()) ||
    c.documento.toLowerCase().includes(busquedaCliente.toLowerCase())
  );

  const agregarProducto = (producto) => {
    const cantidad = Number(cantidades[producto.idProducto]) || 1;

    setDetalleFactura(prev => {
      const existe = prev.find(p => p.idProducto === producto.idProducto);
      if (existe) {
        return prev.map(p =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      }
      return [...prev, { ...producto, cantidad }];
    });

    setCantidades({ ...cantidades, [producto.idProducto]: "" });
  };

  const eliminarProducto = (id) => {
    setDetalleFactura(prev => prev.filter(p => p.idProducto !== id));
  };

  const subtotal = detalleFactura.reduce((s, p) => s + p.precioVenta * p.cantidad, 0);
  const totalIva = detalleFactura.reduce((s, p) => s + (p.precioVenta * p.cantidad * p.iva / 100), 0);

  const descuentoNum = Number(descuento) || 0;
  const pagoNum = Number(pago) || 0;

  const total = subtotal + totalIva - descuentoNum;
  const cambio = pagoNum - total;

  const registrarVenta = async () => {
    if (!clienteSeleccionado || detalleFactura.length === 0) {
      alert("Datos incompletos");
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
      setLoadingFactura(true);

      const respuesta = await registrarVentaApi(ventaDTO);
      const ventaCreada = respuesta.data;

      setDetalleFactura([]);
      setPago("");
      setDescuento("");
      setClienteSeleccionado(null);

      return ventaCreada;

    } catch (error) {
      console.error(error);
      alert("Error al registrar la venta");
    } finally {
      setLoadingFactura(false);
    }
  };

  const formatMoney = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP"
    }).format(valor);

  return {
    productosFiltrados,
    clientesFiltrados,
    detalleFactura,
    cantidades,
    setCantidades,
    busquedaProducto,
    setBusquedaProducto,
    busquedaCliente,
    setBusquedaCliente,
    clienteSeleccionado,
    setClienteSeleccionado,
    formaPago,
    setFormaPago,
    vendedor,
    setVendedor,
    descuento,
    setDescuento,
    pago,
    setPago,
    subtotal,
    totalIva,
    total,
    cambio,
    agregarProducto,
    eliminarProducto,
    registrarVenta,
    loadingFactura,
    formatMoney
  };
}

