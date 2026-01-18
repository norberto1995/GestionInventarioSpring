package Gestion.demo.dto;

import java.util.List;

public class VentaRequestDTO {

    public Integer clienteId;
    public String formaPago;
    public String vendedor;
    public Double descuento;
    public Double pago;
    public List<DetalleDTO> detalles;
}