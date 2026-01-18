import api from "../api/axiosConfig";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarProducto() {

  let navegacion = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const cargarProducto = async () => {
      const resultado = await api.get(`/gestion-app/productos/${id}`);
      setProducto(resultado.data);
    };
    cargarProducto();
  }, [id]);

  const onInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/gestion-app/productos/${id}`, producto);
    navegacion("/productos/listar");
  };

  return (
    <div className="container-fluid">
      <div className="text-center my-3">
        <h2>Editar Producto</h2>
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
          <a href="/clientes/listar" className="btn btn-danger btn-sm">Regresar</a>
        </div>
      </form>
    </div>
  );
}
