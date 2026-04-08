import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

export default function ListarNotasCredito() {
  const [notas, setNotas] = useState([]);
  const [notasFiltradas, setNotasFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [detalleVisible, setDetalleVisible] = useState(null);

  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    try {
      const res = await api.get("/gestion-app/notas-credito");
      const datos = Array.isArray(res.data) ? res.data : [];
      setNotas(datos);
      setNotasFiltradas(datos);
    } catch (error) {
      console.error("Error al cargar notas:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Lógica de búsqueda rectificada
  const filtrar = (texto) => {
    setBusqueda(texto);
    const termino = texto.toLowerCase().trim();
    
    const resultado = notas.filter((n) => {
      return (
        n.idNotaCredito?.toString().includes(termino) ||
        (n.numeroNotaCredito && n.numeroNotaCredito.toLowerCase().includes(termino)) ||
        n.venta?.idVenta?.toString().includes(termino) ||
        (n.venta?.numeroFacturaElectronica && n.venta.numeroFacturaElectronica.toLowerCase().includes(termino)) ||
        (n.cliente?.nombre && n.cliente.nombre.toLowerCase().includes(termino))
      );
    });
    setNotasFiltradas(resultado);
  };

  const renderEstadoBadge = (estado) => {
    const base = "badge rounded-pill px-2 py-1";
    if (estado === "VALIDADA") return <span className={`${base} bg-success`}>OK</span>;
    if (estado === "ERROR") return <span className={`${base} bg-danger`}>ERR</span>;
    return <span className={`${base} bg-warning text-dark`}>PEND</span>;
  };

  return (
    <div className="container mt-4 animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-primary">Historial de Notas de Crédito</h4>
      </div>

      {/* 🔍 Buscador con Lupa */}
      <div className="mb-4">
        <div className="input-group shadow-sm">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder="Buscar por NC, Factura, ID o Cliente..."
            value={busqueda}
            onChange={(e) => filtrar(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center"><div className="spinner-border text-primary"></div></div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>NC #</th>
                <th>Factura Ref.</th>
                <th>Cliente</th>
                <th>Total NC</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notasFiltradas.length === 0 ? (
                <tr><td colSpan="6" className="text-center text-muted p-4">No se encontraron notas de crédito</td></tr>
              ) : (
                notasFiltradas.map((n) => (
                  <React.Fragment key={n.idNotaCredito}>
                    <tr>
                      <td><strong>{n.numeroNotaCredito || n.idNotaCredito}</strong></td>
                      <td>
                        <small className="text-muted d-block">Venta #{n.venta?.idVenta}</small>
                        <span className="text-primary small">{n.venta?.numeroFacturaElectronica}</span>
                      </td>
                      <td>{n.cliente?.nombre || "N/A"}</td>
                      <td className="fw-bold text-danger">
                        {n.total?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
                      </td>
                      <td className="text-center">{renderEstadoBadge(n.estadoElectronico)}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          
                          {/* 👁️ Ver Detalle */}
                          <button 
                            className={`btn btn-sm ${detalleVisible === n.idNotaCredito ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setDetalleVisible(detalleVisible === n.idNotaCredito ? null : n.idNotaCredito)}
                            title="Ver detalle"
                          >
                            <i className={`bi ${detalleVisible === n.idNotaCredito ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                          </button>

                          {/* 📄 PDF Factus */}
                          {n.public_url && (
                            <button className="btn btn-outline-success btn-sm" onClick={() => window.open(n.public_url, "_blank")} title="Ver PDF Factus">
                              <i className="bi bi-file-earmark-check"></i>
                            </button>
                          )}

                          {/* 🛡️ DIAN (Usando campo QR) */}
                          {n.qr && (
                            <button 
                              className="btn btn-outline-dark btn-sm"
                              onClick={() => window.open(n.qr, "_blank")}
                              title="Verificar en DIAN"
                            >
                              <i className="bi bi-shield-check"></i>
                            </button>
                          )}

                          {/* 🧾 Ver Factura Original */}
                          {n.venta?.publicUrl && (
                            <button className="btn btn-outline-info btn-sm" onClick={() => window.open(n.venta.publicUrl, "_blank")} title="Ver Factura Original">
                              <i className="bi bi-receipt"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* 📂 Detalle Desplegable */}
                    {detalleVisible === n.idNotaCredito && (
                      <tr className="animate__animated animate__fadeIn">
                        <td colSpan="6" className="bg-light p-3">
                          <div className="border rounded shadow-sm bg-white p-3">
                            <div className="d-flex justify-content-between mb-2">
                               <h6 className="fw-bold text-secondary">Productos en la Nota</h6>
                               <span className="badge bg-info text-dark">{n.tipo}</span>
                            </div>
                            <table className="table table-sm table-bordered">
                              <thead className="table-secondary">
                                <tr>
                                  <th>Producto</th>
                                  <th className="text-center">Cant.</th>
                                  <th className="text-end">Precio Unit.</th>
                                  <th className="text-end">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {n.detalles?.map((d) => (
                                  <tr key={d.idDetalleNotaCredito}>
                                    <td>{d.producto?.nombre}</td>
                                    <td className="text-center">{d.cantidad}</td>
                                    <td className="text-end">${d.precioUnitario?.toLocaleString()}</td>
                                    <td className="text-end fw-bold">${d.totalLinea?.toLocaleString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="mt-2 p-2 bg-light rounded border-start border-4 border-warning">
                              <strong>Motivo:</strong> {n.motivo}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}