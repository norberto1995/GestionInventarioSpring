package Gestion.demo.servicio;

import Gestion.demo.modelo.Producto;
import Gestion.demo.modelo.Proveedor;

import java.util.List;

public interface ProveedorServicio {

    List<Proveedor> listarProveedores();
    Proveedor  buscarProveedorPorId(Integer idProveedor);
    Proveedor guardarProveedor(Proveedor proveedor);
    void eliminarProveedor(Proveedor proveedor);
    Object buscarPorCriterioSeleccionado(String tipo , String valor);

}
