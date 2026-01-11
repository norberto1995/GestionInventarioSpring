import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useNavigate , useParams } from 'react-router-dom';



export default function EditarCliente() {

  const urlBase="https://serene-nurturing-production.up.railway.app/gestion-app/clientes";

    let navegacion = useNavigate();
    const { id } = useParams();
const [cliente, setCliente] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    direccion: '',
    email: ''
})

const{ nombre, documento, telefono, direccion, email} = cliente;

useEffect(() => {
    cargarCliente();
}, [])

const cargarCliente = async () => {
    const resultado = await axios.get(`${urlBase}/${id}`);
    setCliente(resultado.data);
}
const onInputChange=(e)=>{
    setCliente({...cliente, [e.target.name]: e.target.value});
}

const onSubmit= async (e)=>{
    e.preventDefault();
    
    await axios.put(`${urlBase}/${id}`, cliente);
    navegacion("/clientes/listar");
}



  return (
    <div className='container'>


            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Editar Cliente</h2>

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