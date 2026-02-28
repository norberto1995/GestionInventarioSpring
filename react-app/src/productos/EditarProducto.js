import api from "../api/axiosConfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useOutletContext } from "react-router-dom";

export default function EditarProducto() {
  const navegacion = useNavigate();
  const { id } = useParams();
  const { darkMode } = useOutletContext();

  const [producto, setProducto] = useState({
    nombre: "", codigo: "", descripcion: "",
    precioCompra: "", precioVenta: "",
    stockActual: "", stockMinimo: "",
    iva: 0, unitMeasureId: ""
  });

  const [unidades, setUnidades] = useState([]);

  const {
    nombre, codigo, descripcion,
    precioCompra, precioVenta,
    stockActual, stockMinimo,
    iva, unitMeasureId
  } = producto;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const responseUnidades = await api.get("/gestion-app/unidades");
        const ordenadas = responseUnidades.data.sort((a, b) => a.name.localeCompare(b.name));
        setUnidades(ordenadas);

        const responseProducto = await api.get(`/gestion-app/productos/${id}`);
        const data = responseProducto.data;

        setProducto({
          nombre: data.nombre || "",
          codigo: data.codigo || "",
          descripcion: data.descripcion || "",
          precioCompra: data.precioCompra || "",
          precioVenta: data.precioVenta || "",
          stockActual: data.stockActual || "",
          stockMinimo: data.stockMinimo || "",
          iva: Number(data.iva) || 0,
          unitMeasureId: data.unidadMedida?.id?.toString() || ""
        });
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    };
    cargarDatos();
  }, [id]);

  const onInputChange = (e) => setProducto({ ...producto, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/gestion-app/productos/${id}`, {
        ...producto,
        precioCompra: Number(producto.precioCompra),
        precioVenta: Number(producto.precioVenta),
        stockActual: Number(producto.stockActual),
        stockMinimo: Number(producto.stockMinimo),
        iva: Number(producto.iva),
        unidadMedida: { id: Number(producto.unitMeasureId) }
      });
      navegacion("/productos/listar");
    } catch (error) {
      alert("Ocurrió un error al actualizar");
    }
  };

  const labelClass = `form-label small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-muted'}`;

  return (
    <div className="container-fluid py-4 px-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-xxl-10">
          
          <Link to="/productos/listar" className={`text-decoration-none small mb-4 d-inline-flex align-items-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>
            <i className="bi bi-chevron-left me-1"></i> Cancelar y volver
          </Link>

          <div className="card shadow-sm rounded-4 overflow-hidden border-0 bg-body-tertiary">
            <div className="card-header py-4 px-4 border-bottom border-opacity-10 bg-transparent">
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 p-3 rounded-4 me-3">
                  <i className="bi bi-pencil-square text-warning fs-2"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bolder text-body">Editar Producto</h3>
                  <p className="text-muted small mb-0">Actualizando SKU: <span className="fw-bold">{codigo || id}</span></p>
                </div>
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={onSubmit}>
                
                {/* SECCIÓN 1: Identificación */}
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <span className="badge bg-warning text-dark rounded-pill me-2 px-3">General</span>
                    <h6 className="text-uppercase fw-bolder small mb-0 tracking-wider text-body opacity-75">Datos del Producto</h6>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-8">
                      <label className={labelClass}>Nombre Comercial</label>
                      <input type="text" className="form-control" name="nombre" required value={nombre} onChange={onInputChange} />
                    </div>
                    <div className="col-md-4">
                      <label className={labelClass}>Código de Referencia</label>
                      <input type="text" className="form-control" name="codigo" value={codigo} onChange={onInputChange} />
                    </div>
                    <div className="col-12">
                      <label className={labelClass}>Descripción Técnica</label>
                      <input type="text" className="form-control" name="descripcion" value={descripcion} onChange={onInputChange} />
                    </div>
                  </div>
                </div>

                {/* SECCIÓN 2: Doble Columna Financiera/Logística */}
                <div className="row g-5">
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center mb-4">
                      <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill me-2 px-3">Costos</span>
                      <h6 className="text-uppercase fw-bolder small mb-0 tracking-wider text-body opacity-75">Precios e IVA</h6>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className={labelClass}>Precio Compra</label>
                        <div className="input-group">
                          <span className="input-group-text border-end-0 bg-light opacity-75">$</span>
                          <input type="number" className="form-control" name="precioCompra" value={precioCompra} onChange={onInputChange} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className={labelClass}>Precio Venta</label>
                        <div className="input-group">
                          <span className="input-group-text border-end-0 bg-warning bg-opacity-10 text-warning fw-bold">$</span>
                          <input type="number" className="form-control" name="precioVenta" value={precioVenta} onChange={onInputChange} />
                        </div>
                      </div>
                      <div className="col-12">
                        <label className={labelClass}>IVA (%)</label>
                        <select className="form-select" name="iva" value={iva} onChange={(e) => setProducto({ ...producto, iva: Number(e.target.value) })}>
                          <option value={0}>Sin IVA (0%)</option>
                          <option value={5}>Tarifa Reducida (5%)</option>
                          <option value={19}>Tarifa General (19%)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="d-flex align-items-center mb-4">
                      <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 rounded-pill me-2 px-3">Logística</span>
                      <h6 className="text-uppercase fw-bolder small mb-0 tracking-wider text-body opacity-75">Inventario</h6>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className={labelClass}>Stock Actual</label>
                        <input type="number" className="form-control" name="stockActual" value={stockActual} onChange={onInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className={labelClass}>Stock Mínimo</label>
                        <input type="number" className="form-control border-danger border-opacity-25" name="stockMinimo" value={stockMinimo} onChange={onInputChange} />
                      </div>
                      <div className="col-12">
                        <label className={labelClass}>Unidad de Medida</label>
                        <select className="form-select" name="unitMeasureId" value={unitMeasureId} onChange={onInputChange} required>
                          <option value="">Seleccione...</option>
                          {unidades.map((u) => (
                            <option key={u.id} value={u.id}>{u.name} ({u.code})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer de Acciones */}
                <div className={`mt-5 p-4 rounded-4 d-flex justify-content-end align-items-center gap-3 ${darkMode ? 'bg-black bg-opacity-20' : 'bg-body'}`}>
                  <button type="button" onClick={() => navegacion("/productos/listar")} className={`btn px-4 fw-bold ${darkMode ? 'btn-outline-light opacity-50' : 'btn-light text-muted'}`}>
                    Descartar
                  </button>
                  <button type="submit" className="btn btn-warning px-5 py-2 shadow-sm fw-bold rounded-3 text-dark">
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Actualizar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}