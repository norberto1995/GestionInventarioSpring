package Gestion.demo.repositorio;

import Gestion.demo.modelo.Cliente;
import Gestion.demo.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductoRepositorio  extends JpaRepository<Producto , Integer> {

    // Para buscar coincidencias parciales de nombre
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // Para buscar el documento exacto
    Optional<Producto> findByCodigo(String codigo);
}
