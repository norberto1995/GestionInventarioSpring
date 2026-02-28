package Gestion.demo.repositorio;

import Gestion.demo.modelo.UnidadMedida;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnidadMedidaRepositorio extends JpaRepository<UnidadMedida, Integer> {
}