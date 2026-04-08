package Gestion.demo.repositorio;

import Gestion.demo.modelo.DetalleNotaCredito;
import Gestion.demo.modelo.NotaCredito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleNotaCreditoRepositorio extends JpaRepository<DetalleNotaCredito, Integer> {


}
