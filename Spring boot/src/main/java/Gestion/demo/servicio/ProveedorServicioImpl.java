package Gestion.demo.servicio;

import Gestion.demo.exepcion.RecurosNoEncontradoExepcion;
import Gestion.demo.modelo.Proveedor;
import Gestion.demo.repositorio.ProveedorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProveedorServicioImpl implements ProveedorServicio{

    @Autowired
    private ProveedorRepositorio proveedorRepositorio;
    @Override
    public List<Proveedor> listarProveedores() {
        return proveedorRepositorio.findAll();
    }

    @Override
    public Proveedor buscarProveedorPorId(Integer idProveedor) {
        return proveedorRepositorio.findById(idProveedor).orElse(null);

    }

    @Override
    public Proveedor guardarProveedor(Proveedor proveedor) {
        return proveedorRepositorio.save(proveedor);
    }

    @Override
    public void eliminarProveedor(Proveedor proveedor) {

        proveedorRepositorio.delete(proveedor);
    }

    @Override
    public Object buscarPorCriterioSeleccionado(String tipo, String valor) {
        switch (tipo.toLowerCase()){
            case "id" :
                return proveedorRepositorio.findById(Integer.parseInt(valor)).orElse(null);
            case  "nombre" :
                return proveedorRepositorio.findByNombreProveedorContainingIgnoreCase(valor);
            case "documento" :
                return proveedorRepositorio.findByDocumento(valor).orElse(null);

            default:
                throw new RecurosNoEncontradoExepcion("PARAMETRO NO VALIDO " + tipo);
        }
    }
}
