package Gestion.demo.factus.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FactusItemDTO {
    @JsonProperty("code_reference")
    private String codeReference;  //Código interno del producto.

    private String name;
    private Double quantity; // Cantidad vendida
    private Double price;   //Precio unitario con impuestos incluidos.

    @JsonProperty("tax_rate")
    private String taxRate; // Porcentaje del IVA (Ej: "19.00").

    @JsonProperty("unit_measure_id")
    private Integer unitMeasureId;  // ID de la unidad de medida.

    @JsonProperty("standard_code_id")
    private Integer standardCodeId; // ID del código estándar (usualmente el ID 1).

    @JsonProperty("is_excluded")
    private Integer isExcluded;  // 0: No, 1: Sí (Excluido de IVA).

    @JsonProperty("tribute_id")
    private Integer tributeId;  //ID del tributo aplicado al item.

    @JsonProperty("discount_rate")
    private Double discountRate;   //Porcentaje de descuento para este item.


    // Si en Postman enviaste retenciones, agrégalas aquí para evitar descuadres en los totales
    @JsonProperty("withholding_taxes")
    private java.util.List<Object> withholdingTaxes = new java.util.ArrayList<>();  // Objetos de autorretenciones aplicadas al item.
}


