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
        <div className="container mt-4">
            <h4 className="mb-3">Lista de Ventas</h4>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar por ID de venta o nombre de cliente..."
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
                                <th>ID Venta</th>
                                <th>Cliente</th>
                                <th>Documento</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Acciones</th>
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
                                            <td>{venta.cliente?.nombre ?? "Sin Cliente"}</td>
                                            <td>{venta.cliente?.documento ?? "N/A"}</td>
                                            <td>{venta.fecha ? new Date(venta.fecha).toLocaleDateString() : "N/A"}</td>
                                            <td>{venta.total?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() =>
                                                        setDetalleVisible(detalleVisible === venta.idVenta ? null : venta.idVenta)
                                                    }
                                                >
                                                    {detalleVisible === venta.idVenta ? "Ocultar Detalles" : "Ver Detalles"}
                                                </button>
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => imprimirFactura(venta)}
                                                >
                                                    <i className="bi bi-printer"></i> Imprimir
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Aquí renderizas los detalles solo si está visible */}
                                        {detalleVisible === venta.idVenta && (
                                            <tr>
                                                <td colSpan="6">
                                                    <table className="table table-sm table-bordered mt-2">
                                                        <thead className="table-secondary">
                                                            <tr>
                                                                <th>Producto</th>
                                                                <th>Cantidad</th>
                                                                <th>Precio Unitario</th>
                                                                <th>IVA</th>
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {venta.detalles?.map((d) => (
                                                                <tr key={d.idDetalle}>
                                                                    <td>{d.producto?.nombre ?? "N/A"}</td>
                                                                    <td>{d.cantidad}</td>
                                                                    <td>{d.precioUnitario?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                                                                    <td>{d.iva?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                                                                    <td>{d.total?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Detalles expandibles */}
                    {detalleVisible && (
                        <div className="card p-3 mb-3">
                            <h5>Detalles de la Venta {detalleVisible}</h5>
                            <table className="table table-bordered">
                                <thead className="table-secondary">
                                    <tr>
                                        <th>ID Detalle</th>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unitario</th>
                                        <th>IVA</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ventasFiltradas
                                        .find((v) => v.idVenta === detalleVisible)
                                        ?.detalles?.map((d) => (
                                            <tr key={d.idDetalle}>
                                                <td>{d.idDetalle}</td>
                                                <td>{d.producto?.nombre ?? "N/A"}</td>
                                                <td>{d.cantidad}</td>
                                                <td>{d.precioUnitario?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                                                <td>{d.iva?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                                                <td>{d.total?.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}




