import api from "../api/axiosConfig";
import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';




export default function AgregarCliente() {

   let navegacion = useNavigate();

   const [cliente, setCliente] = useState({
       nombre: '',
       documento: '',
       telefono: '',
       direccion: '',
       email: ''
   })

    const{ nombre, documento, telefono, direccion, email} = cliente;

    const onInputChange=(e)=>{
        setCliente({...cliente, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/gestion-app/clientes", cliente);
      navegacion("/clientes/listar");
    } catch (error) {
      alert("No tienes permisos o ocurrió un error");
      console.error(error);
    }
  };
        







  return (
    <div className='container'>


            <div className='container text-center' style={{ margin: "10px" }}>
                <h2>Agregar Cliente</h2>

            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control"
                        id='nombre' name='nombre' required={true} value={nombre}  onChange={(e)=>onInputChange(e)}/>

                </div>
                <div className="mb-3">
                    <label htmlFor="documento" className="form-label">Documento</label>
                    <input type="text" className="form-control" id="documento" name='documento' value={documento}  onChange={(e)=>onInputChange(e)} />
                </div>

                 <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input type="number" step="any" className="form-control" id="telefono" name='telefono' value={telefono}  onChange={(e)=>onInputChange(e)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="direccion" name='direccion' value={direccion}  onChange={(e)=>onInputChange(e)} />
                </div>
                 <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" name='email' value={email}  onChange={(e)=>onInputChange(e)} />
                </div>

               
                <div className='text-center'>
                    <button type='submit' className="btn btn-primary btn-sm me-3">Guardar</button>
                    <a href='/clientes/listar' className='btn btn-danger btn-sm'>Regresar</a>

                </div>

            </form>


        </div>
  );
}