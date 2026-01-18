import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { imprimirFactura } from "../utils/imprimirFactura";

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
      setVentas([]);
      setVentasFiltradas([]);
    } finally {
      setLoading(false);
    }
  };

  const filtrar = (texto) => {
    setBusqueda(texto);
    const resultado = ventas.filter((venta) =>
      venta.idVenta.toString().includes(texto) ||
      (venta.cliente?.nombre ?? "").toLowerCase().includes(texto.toLowerCase())
    );
    setVentasFiltradas(resultado);
  };

  return (
    <div className="container-fluid mt-3">
      <h4 className="mb-3">Lista de Ventas</h4>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por ID o cliente..."
        value={busqueda}
        onChange={(e) => filtrar(e.target.value)}
      />

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
                <th className="d-none d-md-table-cell">Documento</th>
                <th>Fecha</th>
                <th>Total</th>
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
                        {venta.cliente?.documento ?? "N/A"}
                      </td>
                      <td>
                        {venta.fecha
                          ? new Date(venta.fecha).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        {venta.total?.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </td>
                      <td className="text-center">
                        <div className="d-flex flex-wrap justify-content-center gap-1">
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() =>
                              setDetalleVisible(
                                detalleVisible === venta.idVenta
                                  ? null
                                  : venta.idVenta
                              )
                            }
                          >
                            {detalleVisible === venta.idVenta
                              ? "Ocultar"
                              : "Detalles"}
                          </button>

                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => imprimirFactura(venta)}
                          >
                            <i className="bi bi-printer"></i>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* DETALLE EXPANDIBLE */}
                    {detalleVisible === venta.idVenta && (
                      <tr>
                        <td colSpan="6">
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
                                        { style: "currency", currency: "COP" }
                                      )}
                                    </td>
                                    <td>
                                      {d.iva?.toLocaleString("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                      })}
                                    </td>
                                    <td>
                                      {d.total?.toLocaleString("es-CO", {
                                        style: "currency",
                                        currency: "COP",
                                      })}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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





