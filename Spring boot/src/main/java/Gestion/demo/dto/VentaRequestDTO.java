package Gestion.demo.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
public class VentaRequestDTO {

    private Integer clienteId;

    // Comerciales

    private Double descuento;  // por ahora no estara disponible esta opcion
    private Double totalRecibido;

    private List<DetalleDTO> detalles;

    // Facturación electrónica

    private String paymentForm;        // 1 = contado, 2 = crédito
    private String paymentMethodCode;  // 10 = efectivo, etc
    private LocalDate paymentDueDate;      // obligatorio si es crédito fecha vencimiento
    private String observation;        // opcional
}





