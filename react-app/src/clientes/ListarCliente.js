
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";





export default function ListarCliente() {

  const UrlBase = "http://localhost:8080/gestion-app/clientes";

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    cargarClientes();
  }, []);
    const cargarClientes = async () => {  
        const respuesta = await axios.get(UrlBase);
        console.log("Cargando los clientes:");
        console.log(respuesta.data);
        setClientes(respuesta.data);
    }


     const eliminarCliente = async (id) => {
        await axios.delete(`${UrlBase}/${id}`);
        cargarClientes();
    }




  return (
    <div className='container'>
            <div className='container text-center d-flex justify-content-between align-items-center' style={{ margin: "30px" }} >
                <h3>Listar Clientes</h3>
                <Link to="/clientes/agregar" className='btn btn-success'>Nuevo Cliente</Link>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Email</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {

                        //ITERAMOS CLIENTES

                        clientes.map((cliente, indice) => (

                            <tr key={cliente.idCliente}>
                                <th scope="row">{cliente.idCliente}</th>
                                <td>{cliente.nombre} </td>
                                <td>{cliente.documento} </td>
                                <td>{cliente.telefono} </td>
                                <td>{cliente.direccion} </td>
                                <td>{cliente.email} </td>

                                <td className='text-center'>
                                    <div>
                                      <Link to={`/clientes/editar/${cliente.idCliente}`} className='btn btn-primary btn-sm me-3'>Editar</Link>
                                       <button onClick={()=> eliminarCliente(cliente.idCliente)}
                                        className='btn btn-danger btn-sm'>Eliminar</button>
                                    </div>

                                </td>



                            </tr>
                        ))
                    }

                </tbody>
                
            </table>
        </div>
  );
}