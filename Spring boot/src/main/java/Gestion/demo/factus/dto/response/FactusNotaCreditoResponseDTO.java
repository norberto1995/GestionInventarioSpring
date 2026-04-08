package Gestion.demo.factus.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FactusNotaCreditoResponseDTO {

    private String status;
    private String message;
    private DataNotaCreditoDTO data;

}