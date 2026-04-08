import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function CrearNotaCredito() {
  const { idVenta } = useParams();
  const navigate = useNavigate();
  
  const [venta, setVenta] = useState(null);
  const [itemsADevolver, setItemsADevolver] = useState([]); 
  const [motivo, setMotivo] = useState("2");
  const [anulacionTotal, setAnulacionTotal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false); 

  useEffect(() => {
    const cargarDetalleVenta = async () => {
      try {
        const res = await api.get(`/gestion-app/ventas/${idVenta}`);
        setVenta(res.data);
        const inicializarItems = res.data.detalles.map(d => ({
          productoId: d.producto.idProducto,
          nombre: d.producto.nombre,
          cantidadMax: d.cantidad, 
          cantidadADevolver: d.cantidad,
          precioUnitario: d.precioUnitario
        }));
        setItemsADevolver(inicializarItems);
      } catch (error) {
        console.error("Error cargando venta", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDetalleVenta();
  }, [idVenta]);

  const handleCantidadChange = (id, valor) => {
    const nuevaCantidad = parseInt(valor) || 0;
    setItemsADevolver(prev => prev.map(item => 
      item.productoId === id 
        ? { ...item, cantidadADevolver: Math.min(Math.max(0, nuevaCantidad), item.cantidadMax) } 
        : item
    ));
  };

  const calcularTotalDevolucion = () => {
    return itemsADevolver.reduce((acc, item) => acc + (item.cantidadADevolver * item.precioUnitario), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;

    setEnviando(true);
    
    const notaCreditoDTO = {
      ventaId: parseInt(idVenta),
      anulacionTotal: anulacionTotal,
      motivo: motivo === "2" ? "Anulación de factura electrónica" : "Devolución parcial de bienes",
      items: itemsADevolver.map(item => ({
        productoId: item.productoId,
        cantidad: item.cantidadADevolver,
        descuento: 0
      }))
    };

    try {
      // Enviamos la petición al backend
      const res = await api.post("/gestion-app/notas-credito", notaCreditoDTO);
      const notaCreada = res.data;

      // 1. Abrir inmediatamente la visualización de Factus/DIAN
      if (notaCreada.public_url) {
        window.open(notaCreada.public_url, "_blank");
      } else if (notaCreada.qr) {
        window.open(notaCreada.qr, "_blank");
      }

      alert("Nota de Crédito creada con éxito");

      // 2. Redirigir a la ruta que me indicaste
      navigate("/notas-credito/listar");

    } catch (error) {
      console.error(error);
      alert("Error al crear la nota de crédito. Verifique la conexión con la DIAN.");
      setEnviando(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-warning"></div></div>;

  return (
    <div className="container mt-4 animate__animated animate__fadeIn">
      <div className="card shadow border-0">
        <div className="card-header bg-warning text-dark fw-bold d-flex justify-content-between align-items-center">
          <span>Crear Nota de Crédito - Factura # {idVenta}</span>
          <span className="badge bg-dark">DIAN / Factus</span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Tipo de Nota</label>
                <select 
                    className="form-select border-warning" 
                    value={anulacionTotal ? "total" : "parcial"} 
                    onChange={(e) => {
                        const esTotal = e.target.value === "total";
                        setAnulacionTotal(esTotal);
                        if (esTotal) {
                            setMotivo("2");
                            setItemsADevolver(prev => prev.map(i => ({...i, cantidadADevolver: i.cantidadMax})));
                        } else {
                            setMotivo("1");
                        }
                    }}
                >
                  <option value="total">Anulación Total</option>
                  <option value="parcial">Devolución Parcial</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Motivo DIAN</label>
                <select className="form-select" value={motivo} onChange={(e) => setMotivo(e.target.value)}>
                  <option value="2">Anulación de factura electrónica</option>
                  <option value="1">Devolución parcial de los bienes</option>
                  <option value="3">Rebaja total aplicada</option>
                </select>
              </div>
            </div>

            <div className="table-responsive mb-3">
              <table className="table table-hover align-middle border">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cant. Original</th>
                    <th className="text-center" style={{width: '150px'}}>Cant. a Devolver</th>
                    <th className="text-end">Precio Unit.</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsADevolver.map((item) => (
                    <tr key={item.productoId}>
                      <td>{item.nombre}</td>
                      <td className="text-center">{item.cantidadMax}</td>
                      <td>
                        <input 
                          type="number" 
                          className={`form-control form-control-sm text-center ${!anulacionTotal ? 'border-primary' : ''}`}
                          value={item.cantidadADevolver}
                          max={item.cantidadMax}
                          min={0}
                          disabled={anulacionTotal}
                          onChange={(e) => handleCantidadChange(item.productoId, e.target.value)}
                        />
                      </td>
                      <td className="text-end">${item.precioUnitario.toLocaleString()}</td>
                      <td className="text-end">${(item.cantidadADevolver * item.precioUnitario).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded border">
              <div>
                <span className="fw-bold text-muted">Total Devolución: </span>
                <span className="h3 text-danger mb-0 ms-2">
                  ${calcularTotalDevolucion().toLocaleString("es-CO")}
                </span>
              </div>
              <div className="gap-2 d-flex">
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-warning fw-bold px-4 shadow-sm"
                  disabled={enviando || calcularTotalDevolucion() === 0}
                >
                  {enviando ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Procesando...</>
                  ) : 'Confirmar Nota de Crédito'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}