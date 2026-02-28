package Gestion.demo.repositorio;

import Gestion.demo.modelo.Municipio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MunicipioRepositorio extends JpaRepository<Municipio, Integer> {
}
