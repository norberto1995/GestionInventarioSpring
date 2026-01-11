package Gestion.demo.repositorio;

import Gestion.demo.modelo.Producto;
import Gestion.demo.modelo.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProveedorRepositorio extends JpaRepository<Proveedor , Integer> {

    // Para buscar coincidencias parciales de nombre
    List<Proveedor> findByNombreProveedorContainingIgnoreCase(String nombreProveedor);

    // Para buscar el documento exacto
    Optional<Proveedor> findByDocumento(String documento);
}
