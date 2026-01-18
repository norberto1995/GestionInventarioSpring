package Gestion.demo.servicio;

import Gestion.demo.dto.VentaRequestDTO;
import Gestion.demo.modelo.Venta;
import java.util.List;

public interface VentaServicio {
    Venta registrarVenta(VentaRequestDTO dto);

    List<Venta> listarVentas();

    Venta buscarVentaPorId(Integer idVenta);

    List<Venta> buscarVentasPorIdCliente(Integer idCliente);

    List<Venta> buscarVentasPorDocumentoCliente(String documento);
}
