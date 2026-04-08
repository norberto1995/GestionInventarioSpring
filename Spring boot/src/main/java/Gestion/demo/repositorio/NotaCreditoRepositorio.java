package Gestion.demo.repositorio;

import Gestion.demo.modelo.NotaCredito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaCreditoRepositorio extends JpaRepository<NotaCredito, Integer> {

    List<NotaCredito> findByVenta_IdVenta(Integer ventaId);
}
