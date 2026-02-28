package Gestion.demo.factus.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BillDTO {

    private String number;
    private String cufe;
    private String qr;

    @JsonProperty("validated")
    private String validatedAt;

    @JsonProperty("public_url")
    private String publicUrl;

}

