package Gestion.demo.repositorio;

import Gestion.demo.modelo.Abono;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AbonoRepositorio extends JpaRepository<Abono, Integer> {

    List<Abono> findByVenta_IdVenta(Integer idVenta);
}
