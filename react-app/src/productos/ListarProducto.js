import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListarProducto() {

  const UrlBase = "https://serene-nurturing-production.up.railway.app/gestion-app/productos";

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);
    const cargarProductos = async () => {  
        const respuesta = await axios.get(UrlBase);
        console.log("Cargando los productos:");
        console.log(respuesta.data);
        setProductos(respuesta.data);
    }


     const eliminarProducto = async (id) => {
        await axios.delete(`${UrlBase}/${id}`);
        cargarProductos();
    }




  return (
    <div className='container'>
            <div className='container text-center ' style={{ margin: "30px" }} >
                <h3>Listar Productos</h3>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio Compra</th>
                        <th scope="col">Precio Venta</th>
                        <th scope="col">Stock Actual</th>
                        <th scope="col">Stock Minimo</th>
                        <th scope="col">Iva</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {

                        //ITERAMOS PRODUCTOS

                        productos.map((producto, indice) => (

                            <tr key={producto.idProducto}>
                                <th scope="row">{producto.idProducto}</th>
                                <td>{producto.codigo} </td>
                                <td>{producto.nombre} </td>
                                <td>{producto.descripcion} </td>
                                <td>{producto.precioCompra} </td>
                                <td>{producto.precioVenta} </td>
                                <td>{producto.stockActual} </td>
                                <td>{producto.stockMinimo} </td>
                                <td>{producto.iva} </td>

                                <td className='text-center'>
                                    <div>
                                      <Link to={`/productos/editar/${producto.idProducto}`} className='btn btn-primary btn-sm me-3'>Editar</Link>
                                       <button onClick={()=> eliminarProducto(producto.idProducto)}
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