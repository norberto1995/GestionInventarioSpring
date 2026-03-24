package Gestion.demo.dto;

import lombok.Data;

@Data
public class AbonoDTO {

    private Integer ventaId;

    private Double monto;      // lo que se quiere abonar
    private Double recibido;   // lo que entrega el cliente

    private String metodoPago; // EFECTIVO, TRANSFERENCIA, etc
}
