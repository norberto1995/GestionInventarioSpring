import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

export default function ListarVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [detalleVisible, setDetalleVisible] = useState(null);

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const respuesta = await api.get("/gestion-app/ventas");
      const datos = Array.isArray(respuesta.data) ? respuesta.data : [];
      setVentas(datos);
      setVentasFiltradas(datos);
    } catch (error) {
      console.error("Error cargando ventas", error);
    } finally {
      setLoading(false);
    }
  };

  const reintentarFactus = async (idVenta) => {
    try {
      await api.post(`/gestion-app/ventas/${idVenta}/reintentar-factus`);
      await cargarVentas(); // refrescar lista
    } catch (error) {
      console.error("Error reintentando factura", error);
      alert("No se pudo reintentar el envío");
    }
  };

  const filtrar = (texto) => {
    setBusqueda(texto);
    const resultado = ventas.filter(
      (venta) =>
        venta.idVenta.toString().includes(texto) ||
        (venta.cliente?.nombre ?? "")
          .toLowerCase()
          .includes(texto.toLowerCase())
    );
    setVentasFiltradas(resultado);
  };

  const renderEstadoBadge = (estado) => {
    const base = "badge rounded-pill px-2 py-1";

    switch (estado) {
      case "VALIDADA":
        return <span className={`${base} bg-success`}>OK</span>;
      case "ERROR":
        return <span className={`${base} bg-danger`}>ERR</span>;
      case "PENDIENTE":
        return <span className={`${base} bg-warning text-dark`}>PEND</span>;
      default:
        return <span className={`${base} bg-secondary`}>N/A</span>;
    }
  };

  return (
    <div className="container mt-4">

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Lista de Ventas</h4>
      </div>

      {/* Buscador */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por ID o cliente..."
          value={busqueda}
          onChange={(e) => filtrar(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th className="d-none d-md-table-cell">Fecha</th>
                <th className="d-none d-md-table-cell">Total</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {ventasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No se encontraron ventas
                  </td>
                </tr>
              ) : (
                ventasFiltradas.map((venta) => (
                  <React.Fragment key={venta.idVenta}>
                    <tr>
                      <td>{venta.idVenta}</td>

                      <td>{venta.cliente?.nombre ?? "N/A"}</td>

                      <td className="d-none d-md-table-cell">
                        {venta.fecha
                          ? new Date(venta.fecha).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="d-none d-md-table-cell">
                        {venta.total?.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </td>

                      <td className="text-center">
                        {renderEstadoBadge(venta.estadoElectronico)}
                      </td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">

                          {/* Ver detalle */}
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              setDetalleVisible(
                                detalleVisible === venta.idVenta
                                  ? null
                                  : venta.idVenta
                              )
                            }
                          >
                            <i className="bi bi-eye"></i>
                          </button>

                          {/* Reintentar si ERROR */}
                          {venta.estadoElectronico === "ERROR" && (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => reintentarFactus(venta.idVenta)}
                            >
                              <i className="bi bi-arrow-repeat"></i>
                            </button>
                          )}

                          {/* Factura validada */}
                          {venta.estadoElectronico === "VALIDADA" &&
                            venta.publicUrl && (
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={() =>
                                  window.open(venta.publicUrl, "_blank")
                                }
                              >
                                <i className="bi bi-receipt"></i>
                              </button>
                            )}

                          {/* QR DIAN */}
                          {venta.estadoElectronico === "VALIDADA" &&
                            venta.qr && (
                              <button
                                className="btn btn-outline-dark btn-sm"
                                onClick={() =>
                                  window.open(venta.qr, "_blank")
                                }
                              >
                                <i className="bi bi-qr-code"></i>
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>

                    {/* Detalle */}
                    
                    {detalleVisible === venta.idVenta && (
                      <tr>
                        <td colSpan="6">
                          <div className="p-3 bg-light border rounded shadow-sm">
                            <div className="table-responsive">
                              <table className="table table-sm table-bordered mt-2">
                                <thead className="table-secondary">
                                  <tr>
                                    <th>Producto</th>
                                    <th>Cant.</th>
                                    <th>Precio</th>
                                    <th>IVA</th>
                                    <th>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {venta.detalles?.map((d) => (
                                    <tr key={d.idDetalle}>
                                      <td>{d.producto?.nombre ?? "N/A"}</td>
                                      <td>{d.cantidad}</td>
                                      <td>
                                        {d.precioUnitario?.toLocaleString(
                                          "es-CO",
                                          {
                                            style: "currency",
                                            currency: "COP",
                                          }
                                        )}
                                      </td>
                                      <td>
                                        {d.valorIva?.toLocaleString("es-CO", {
                                          style: "currency",
                                          currency: "COP",
                                        })}
                                      </td>
                                      <td>
                                        {d.totalLinea?.toLocaleString("es-CO", {
                                          style: "currency",
                                          currency: "COP",
                                        })}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
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







