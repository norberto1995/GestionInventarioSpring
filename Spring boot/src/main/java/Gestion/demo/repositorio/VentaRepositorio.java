package Gestion.demo.repositorio;

import Gestion.demo.modelo.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface VentaRepositorio extends JpaRepository<Venta , Integer> {

    List<Venta> findByCliente_IdCliente(Integer idCliente);

    // si cliente tiene documento en la entidad Venta:
    List<Venta> findByCliente_Documento(String documento);

    // opcional: buscar por fechas
    List<Venta> findByFechaBetween(Date desde, Date hasta);
}
