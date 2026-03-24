package Gestion.demo.servicio;

import Gestion.demo.dto.ProductoDTO;
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



        if (producto.getStandardCodeId() == null) {
            producto.setStandardCodeId(1);
        }

        if (producto.getTributeId() == null) {
            producto.setTributeId(1);
        }

       if(producto.getIva()==20){
           producto.setIva(0.0);
           producto.setExcluido(1);
       } else if (producto.getIva()==0){
           producto.setIva(0.0);
           producto.setExcluido(0);

       }else if (producto.getIva()==5){
           producto.setIva(5.0);
           producto.setExcluido(0);

       } else if (producto.getIva()==19){
           producto.setIva(19.0);
           producto.setExcluido(0);

       }

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
