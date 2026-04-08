package Gestion.demo.factus.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class FactusNotaCreditoRequestDTO {

    @JsonProperty("numbering_range_id")
    private Integer numberingRangeId;

    @JsonProperty("correction_concept_code")
    private Integer correctionConceptCode;

    @JsonProperty("customization_id")
    private Integer customizationId;

    @JsonProperty("bill_id")
    private Long billId;

    @JsonProperty("reference_code")
    private String referenceCode;

    private String observation;

    @JsonProperty("payment_method_code")
    private String paymentMethodCode;

    private FactusCustomerDTO customer;

    private List<FactusItemDTO> items;
}