package Gestion.demo.servicio;

import Gestion.demo.modelo.Producto;

import java.util.List;

public interface ProductoServicio {

    List<Producto> listarProductos();
    Producto buscarProductoPorId(Integer  idProducto);
    Producto guardarProducto(Producto producto);
    void eliminarProducto(Producto producto);
    Object buscarPorCriterioSeleccionado(String tipo , String valor);
}
