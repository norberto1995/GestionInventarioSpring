package Gestion.demo.factus.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FactusFacturaRequestDTO {


    @JsonProperty("numbering_range_id")
    private Integer numberingRangeId;

    @JsonProperty("reference_code")
    private String referenceCode;

    // Campo OBLIGATORIO para identificar el tipo de documento (01 = Factura)
    @JsonProperty("document")
    private String document = "01";


    private String observation;

    @JsonProperty("payment_form")
    private String paymentForm; // 1 para Contado, 2 para Crédito (Default: 1).

    @JsonProperty("payment_due_date")
    private Date paymentDueDate; // Fecha de vencimiento (Obligatorio si payment_form es 2).

    @JsonProperty("payment_method_code")
    private String paymentMethodCode; // Método de pago (Ej: 10 Efectivo, 42 Tarjeta).

    @JsonProperty("operation_type")
    private String operationType; // CAMBIADO de Integer a String para que sea "10"

    @JsonProperty("send_email")
    private Boolean sendEmail = true;

    private FactusCustomerDTO customer;

    private List<FactusItemDTO> items;
}



