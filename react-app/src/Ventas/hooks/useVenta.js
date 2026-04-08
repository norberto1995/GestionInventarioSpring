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

  const [paymentForm, setPaymentForm] = useState("1"); // 1 = Contado, 2 = Crédito
  const [paymentMethodCode, setPaymentMethodCode] = useState("10"); // 10 = Efectivo
  const [paymentDueDate, setPaymentDueDate] = useState(""); 
  const [observation, setObservation] = useState("");

  const [loadingFactura, setLoadingFactura] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const [prod, cli] = await Promise.all([
      obtenerProductos(),
      obtenerClientes()
    ]);
    setProductos(prod.data || []);
    setClientes(cli.data || []);
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
    // 1. Validaciones básicas
    if (!clienteSeleccionado || detalleFactura.length === 0) {
      alert("Debes seleccionar un cliente y al menos un producto.");
      return null;
    }

    // 2. VALIDACIÓN DE PAGO (Efectivo recibido debe ser suficiente)

    if(paymentForm ==="1") {
      if (pagoNum < total) {
      alert(`El monto recibido (${pagoNum}) es menor al total de la venta (${total}). Por favor verifica el pago.`);
      return null;
    }
    }
   

    // 3. Validación de fecha para Crédito
    if (paymentForm === "2") {
      if (!paymentDueDate) {
        alert("La fecha de vencimiento es obligatoria para ventas a crédito.");
        return null;
      }
      const hoy = new Date().toISOString().split('T')[0];
      if (paymentDueDate < hoy) {
        alert("La fecha de vencimiento no puede ser anterior a hoy.");
        return null;
      }
    }

    const ventaDTO = {
      clienteId: clienteSeleccionado.idCliente,
      descuento: descuentoNum,
      totalRecibido: pagoNum,
      detalles: detalleFactura.map(p => ({
        productoId: p.idProducto,
        cantidad: p.cantidad,
        descuento: 0 
      })),
      paymentForm,
      paymentMethodCode,
      paymentDueDate: paymentForm === "2" ? paymentDueDate : null,
      observation
    };

    try {
      setLoadingFactura(true);
      const respuesta = await registrarVentaApi(ventaDTO);
      
      // Limpiar formulario tras éxito
      setDetalleFactura([]);
      setPago("");
      setDescuento("");
      setClienteSeleccionado(null);
      setObservation("");
      setPaymentDueDate("");
      
      return respuesta.data;
    } catch (error) {
      console.error(error);
      alert("Error al registrar la venta");
      return null;
    } finally {
      setLoadingFactura(false);
    }
  };

  return {
    productosFiltrados, clientesFiltrados, detalleFactura,
    cantidades, setCantidades, busquedaProducto, setBusquedaProducto,
    busquedaCliente, setBusquedaCliente, clienteSeleccionado, setClienteSeleccionado,
    descuento, setDescuento, pago, setPago,
    subtotal, totalIva, total, cambio,
    paymentForm, setPaymentForm,
    paymentMethodCode, setPaymentMethodCode,
    paymentDueDate, setPaymentDueDate,
    observation, setObservation,
    agregarProducto, eliminarProducto, registrarVenta,
    loadingFactura, formatMoney: (v) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(v)
  };
}
