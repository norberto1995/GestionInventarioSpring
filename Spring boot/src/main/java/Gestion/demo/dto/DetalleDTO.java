package Gestion.demo.dto;

import lombok.Data;

@Data
public class DetalleDTO {

    private Integer productoId;
    private Integer cantidad;

    // Opcional si quieres permitir precio manual
    private Double precioUnitario;

    private Double descuento;

    // =========================
    // Facturación electrónica
    // =========================

    private Boolean isExcluded;      // Exento
    private Integer standardCodeId;  // Código producto DIAN
    private Integer unitMeasureId;   // Unidad medida DIAN
    private Integer tributeId;       // Tributo (1 = IVA)
}







