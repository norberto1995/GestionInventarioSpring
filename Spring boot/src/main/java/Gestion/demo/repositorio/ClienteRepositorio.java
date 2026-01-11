package Gestion.demo.repositorio;

import Gestion.demo.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepositorio extends JpaRepository<Cliente , Integer> {

    // Para buscar coincidencias parciales de nombre
    List<Cliente> findByNombreContainingIgnoreCase(String nombre);

    // Para buscar el documento exacto
    Optional<Cliente> findByDocumento(String documento);
}
