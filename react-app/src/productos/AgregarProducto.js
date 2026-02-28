import api from "../api/axiosConfig";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";

export default function AgregarProducto() {
  const navegacion = useNavigate();
  const { darkMode } = useOutletContext();

  const [producto, setProducto] = useState({
    nombre: '', codigo: '', descripcion: '',
    precioCompra: '', precioVenta: '',
    stockActual: '', stockMinimo: '',
    iva: 0, unitMeasureId: "",
    tributeId: "1", // Por defecto IVA
    standardCodeId: "1" // Código estándar por defecto
  });

  const [unidades, setUnidades] = useState([]);

  const {
    nombre, codigo, descripcion,
    precioCompra, precioVenta,
    stockActual, stockMinimo,
    iva, unitMeasureId
  } = producto;

  useEffect(() => {
    const cargarUnidades = async () => {
      try {
        const response = await api.get("/gestion-app/unidades");
        const ordenadas = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setUnidades(ordenadas);
      } catch (error) {
        console.error("Error cargando unidades", error);
      }
    };
    cargarUnidades();
  }, []);

  const onInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/gestion-app/productos", {
        ...producto,
        unitMeasureId: Number(producto.unitMeasureId),
        iva: Number(producto.iva),
        precioCompra: Number(producto.precioCompra),
        precioVenta: Number(producto.precioVenta),
        stockActual: Number(producto.stockActual),
        stockMinimo: Number(producto.stockMinimo)
      });
      navegacion("/productos/listar");
    } catch (error) {
      alert("Error al guardar el producto. Verifique los datos.");
    }
  };

  const labelClass = `form-label small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-muted'}`;

  return (
    <div className="container-fluid py-4 px-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-xxl-10">
          
          <Link to="/productos/listar" className={`text-decoration-none small mb-4 d-inline-flex align-items-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>
            <i className="bi bi-arrow-left-circle-fill me-2 fs-5"></i> Volver al inventario
          </Link>

          <div className="card shadow-sm rounded-4 overflow-hidden border-0 bg-body-tertiary">
            <div className="card-header py-4 px-4 border-bottom border-opacity-10 bg-transparent">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-4 me-3">
                  <i className="bi bi-box-seam-fill text-primary fs-2"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bolder text-body">Nuevo Producto</h3>
                  <p className="text-muted small mb-0">Registro técnico de existencias y precios</p>
                </div>
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={onSubmit}>
                
                {/* SECCIÓN 1: Identificación */}
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <span className="badge bg-primary rounded-pill me-2 px-3">Básico</span>
                    <h6 className="text-uppercase fw-bolder small mb-0 tracking-wider text-body opacity-75">Información General</h6>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-8">
                      <label className={labelClass}>Nombre del Producto</label>
                      <input type="text" className="form-control" name="nombre" required value={nombre} onChange={onInputChange} placeholder="Ej: Tornillo Hexagonal 1/4" />
                    </div>
                    <div className="col-md-4">
                      <label className={labelClass}>Código / SKU</label>
                      <input type="text" className="form-control" name="codigo" value={codigo} onChange={onInputChange} placeholder="REF-001" />
                    </div>
                    <div className="col-12">
                      <label className={labelClass}>Descripción detallada</label>
                      <textarea className="form-control" rows="2" name="descripcion" value={descripcion} onChange={onInputChange} placeholder="Especificaciones técnicas..." />
                    </div>
                  </div>
                </div>

                {/* SECCIÓN 2: Valores y Stock */}
                <div className="row g-5">
                  {/* Columna Precios */}
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center mb-4">
                      <span className="badge bg-success rounded-pill me-2 px-3">Finanzas</span>
                      <h6 className="text-uppercase fw-bolder small mb-0 tracking-wider text-body opacity-75">Costos y Venta</h6>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className={labelClass}>Precio Compra</label>
                        <div className="input-group border rounded-3 overflow-hidden">
                          <span className="input-group-text border-0 bg-light opacity-75">$</span>
                          <input type="number" className="form-control border-0" name="precioCompra" value={precioCompra} onChange={onInputChange} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className={labelClass}>Precio Venta</label>
                        <div className="input-group border rounded-3 overflow-hidden">
                          <span className="input-group-text border-0 bg-primary bg-opacity-10 text-primary fw-bold">$</span>
                          <input type="number" className="form-control border-0" name="precioVenta" value={precioVenta} onChange={onInputChange} />
                        </div>
                      </div>
                      <div className="col-12">
                        <label className={labelClass}>Impuesto IVA (%)</label>
                        <select className="form-select" name="iva" value={iva} onChange={onInputChange}>
                          <option value={0}>Exento (0%)</option>
                          <option value={5}>Bienes procesados (5%)</option>
                          <option value={19}>Tarifa General (19%)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Columna Inventario */}
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center mb-4">
                      <span className="badge bg-info text-dark rounded-pill me-2 px-3">Stock</span>
                      <h6 className="text-uppercase fw-bolder small mb-0 tracking-wider text-body opacity-75">Control de Existencias</h6>
                    </div>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className={labelClass}>Stock Inicial</label>
                        <input type="number" className="form-control" name="stockActual" value={stockActual} onChange={onInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className={labelClass}>Mínimo Alerta</label>
                        <input type="number" className="form-control" name="stockMinimo" value={stockMinimo} onChange={onInputChange} />
                      </div>
                      <div className="col-12">
                        <label className={labelClass}>Unidad de Medida</label>
                        <select className="form-select" name="unitMeasureId" value={unitMeasureId} onChange={onInputChange} required>
                          <option value="">Seleccione unidad...</option>
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
                  <Link to="/productos/listar" className={`text-decoration-none fw-bold me-2 ${darkMode ? 'text-light opacity-50' : 'text-muted'}`}>
                    Descartar
                  </Link>
                  <button type="submit" className="btn btn-primary px-5 py-2 shadow-sm fw-bold rounded-3">
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Crear Producto
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