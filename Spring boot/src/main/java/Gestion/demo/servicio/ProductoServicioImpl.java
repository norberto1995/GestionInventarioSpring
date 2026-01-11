package Gestion.demo.servicio;

import Gestion.demo.modelo.Producto;
import Gestion.demo.repositorio.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServicioImpl implements ProductoServicio {

    @Autowired
    private  ProductoRepositorio productoRepositorio;
    @Override
    public List<Producto> listarProductos() {
        return productoRepositorio.findAll();
    }

    @Override
    public Producto buscarProductoPorId(Integer idProducto) {
        return productoRepositorio.findById(idProducto).orElse(null);
    }

    @Override
    public Producto guardarProducto(Producto producto) {
        return productoRepositorio.save(producto);
    }

    @Override
    public void eliminarProducto(Producto producto) {

        productoRepositorio.delete(producto);

    }

    @Override
    public Object buscarPorCriterioSeleccionado(String tipo, String valor) {

        switch (tipo.toLowerCase()) {

    case "id" :
        return productoRepositorio.findById(Integer.parseInt(valor)).orElse(null);

    case "nombre" :
        return productoRepositorio.findByNombreContainingIgnoreCase(valor);

    case "codigo" :
        return productoRepositorio.findByCodigo(valor).orElse(null);

    default:
        throw new IllegalArgumentException("Criterio de búsqueda no válido: " + tipo);
}
    }
}
