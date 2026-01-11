package Gestion.demo.repositorio;

import Gestion.demo.modelo.DetalleVenta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetalleVentaRepositorio extends JpaRepository<DetalleVenta , Integer> {
}
