package Gestion.demo.dto;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class VentaRequestDTO {

    private Integer clienteId;

    // =========================
    // Comerciales
    // =========================

    private String vendedor;
    private Double descuento;
    private Double pago;

    private List<DetalleDTO> detalles;

    // =========================
    // Facturación electrónica
    // =========================

    private String paymentForm;        // 1 = contado, 2 = crédito
    private String paymentMethodCode;  // 10 = efectivo, etc
    private Date paymentDueDate;       // obligatorio si es crédito
    private String observation;        // opcional
}





