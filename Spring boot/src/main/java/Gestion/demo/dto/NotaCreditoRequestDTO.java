package Gestion.demo.dto;

import lombok.Data;

import java.util.List;

@Data
public class NotaCreditoRequestDTO {

    private Integer ventaId;
    private Boolean anulacionTotal;
    private String motivo;

    private List<DetalleDTO> items; // reutilizas tu DTO 🔥
}
