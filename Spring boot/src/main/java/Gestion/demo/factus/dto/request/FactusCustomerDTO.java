package Gestion.demo.factus.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FactusCustomerDTO {

    @JsonProperty("identification_document_id")
    private Integer identificationDocumentId; // Cambiado a String para enviar "3"

    private String identification;

    @JsonProperty("legal_organization_id")
    private Integer legalOrganizationId;      // Tipo de organización (Jurídica o Natural).

    @JsonProperty("tribute_id")
    private Integer tributeId;                // ID del tributo del cliente (IVA, No responsable, etc.).

    private Integer dv;

    private String company;  // Razón Social (Obligatorio si es Jurídica).

    private String names;
    private String address;
    private String phone;
    private String email;


    @JsonProperty("municipality_id")
    private Integer municipalityId;           // Cambiado a String para enviar "980"


}



