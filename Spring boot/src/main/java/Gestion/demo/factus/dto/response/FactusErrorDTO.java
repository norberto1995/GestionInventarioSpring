package Gestion.demo.factus.dto.response;

import lombok.Data;

import java.util.Map;

@Data
public class FactusErrorDTO {

    private Boolean success;

    private Map<String, Object> errors;

    private String message;
}

