package Gestion.demo.factus.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FactusFacturaDataDTO {

    private String uuid;
    private String number;
    private String cufe;
    private String qr;

    @JsonProperty("validated_at")
    private String validatedAt;
}

