package Gestion.demo.servicio;

import Gestion.demo.modelo.Venta;

import java.util.List;

public interface VentaServicio {
    Venta registrarVenta(Venta venta);

    List<Venta> listarVentas();

    Venta buscarVentaPorId(Integer idVenta);

    List<Venta> buscarVentasPorIdCliente(Integer idCliente);

    List<Venta> buscarVentasPorDocumentoCliente(String documento);
}
