import api from "../api/axiosConfig";
import React, {  useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom';



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
})


const{ nombre, codigo, descripcion, precioCompra, precioVenta, stockActual, stockMinimo, iva} = producto;

useEffect(() => {

const cargarProducto = async () => {
   const resultado = await api.get(`/gestion-app/productos/${id}`);
    setProducto(resultado.data);
};

    cargarProducto();
}, [id])


const onInputChange=(e)=>{
    setProducto({...producto, [e.target.name]: e.target.value});
}

const onSubmit= async (e)=>{
    e.preventDefault();

    await api.put(`/gestion-app/productos/${id}`, producto);
    navegacion("/productos/listar");
}



  return (
    <div className='container'>


            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Editar Producto</h2>

            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control"
                        id='nombre' name='nombre' required={true} value={nombre}  onChange={(e)=>onInputChange(e)}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="codigo" className="form-label">Codigo</label>
                    <input type="text" className="form-control" id="codigo" name='codigo' value={codigo}  onChange={(e)=>onInputChange(e)} />
                </div>

                 <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                    <input type="text" className="form-control" id="descripcion" name='descripcion' value={descripcion}  onChange={(e)=>onInputChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="precioCompra" className="form-label">precioCompra</label>
                    <input type="text" className="form-control" id="precioCompra" name='precioCompra' value={precioCompra}  onChange={(e)=>onInputChange(e)} />
                </div>
                 <div className="mb-3">
                    <label htmlFor="precioVenta" className="form-label">Precio Venta</label>
                    <input type="text" className="form-control" id="precioVenta" name='precioVenta' value={precioVenta}  onChange={(e)=>onInputChange(e)} />
                </div>

                  <div className="mb-3">
                    <label htmlFor="stockActual" className="form-label">stockActual</label>
                    <input type="text" className="form-control" id="stockActual" name='stockActual' value={stockActual}  onChange={(e)=>onInputChange(e)} />
                </div>

                  <div className="mb-3">
                    <label htmlFor="stockMinimo" className="form-label">stockMinimo</label>
                    <input type="text" className="form-control" id="stockMinimo" name='stockMinimo' value={stockMinimo}  onChange={(e)=>onInputChange(e)} />
                </div>

                  <div className="mb-3">
                    <label htmlFor="iva" className="form-label">IVA</label>
                    <input type="text" className="form-control" id="iva" name='iva' value={iva}  onChange={(e)=>onInputChange(e)} />
                </div>

               
                <div className='text-center'>
                    <button type='submit' className="btn btn-primary btn-sm me-3">Guardar</button>
                    <a href='/clientes/listar' className='btn btn-danger btn-sm'>Regresar</a>

                </div>

            </form>


        </div>
  );
}