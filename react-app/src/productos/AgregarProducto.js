import api from "../api/axiosConfig";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AgregarProducto() {

  let navegacion = useNavigate();

  const [producto, setProducto] = useState({
    nombre: '',
    codigo: '',
    descripcion: '',
    precioCompra: '',
    precioVenta: '',
    stockActual: '',
    stockMinimo: '',
    iva: ''
  });

  const { nombre, codigo, descripcion, precioCompra, precioVenta, stockActual, stockMinimo, iva } = producto;

  const onInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/gestion-app/productos", producto);
      navegacion("/productos/listar");
    } catch (error) {
      alert("No tienes permisos o ocurrió un error");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="text-center my-3">
        <h2>Agregar Producto</h2>
      </div>

      <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: "700px" }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="nombre" required value={nombre} onChange={onInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Codigo</label>
          <input type="text" className="form-control" name="codigo" value={codigo} onChange={onInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripcion</label>
          <input type="text" className="form-control" name="descripcion" value={descripcion} onChange={onInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio Compra</label>
          <input type="text" className="form-control" name="precioCompra" value={precioCompra} onChange={onInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio Venta</label>
          <input type="text" className="form-control" name="precioVenta" value={precioVenta} onChange={onInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock Actual</label>
          <input type="text" className="form-control" name="stockActual" value={stockActual} onChange={onInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock Minimo</label>
          <input type="text" className="form-control" name="stockMinimo" value={stockMinimo} onChange={onInputChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">IVA</label>
          <input type="text" className="form-control" name="iva" value={iva} onChange={onInputChange} />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-sm me-3">Guardar</button>
          <a href="/productos/listar" className="btn btn-danger btn-sm">Regresar</a>
        </div>
      </form>
    </div>
  );
}
