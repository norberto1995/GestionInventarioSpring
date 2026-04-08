package Gestion.demo.factus.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BillDTO {

    private String number;
    private String cufe;
    private String qr;
    @JsonProperty("id")
    private Long billId;

    @JsonProperty("validated")
    private String validatedAt;

    @JsonProperty("public_url")
    private String publicUrl;

    private Integer status;
    private String total;
    private String taxAmount;

    @JsonProperty("errors")
    private Map<String, String> errors;
}

