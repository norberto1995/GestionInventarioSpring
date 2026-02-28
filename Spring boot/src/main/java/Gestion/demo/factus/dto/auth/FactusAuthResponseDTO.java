package Gestion.demo.factus.dto.auth;

import lombok.Data;

@Data
public class FactusAuthResponseDTO {

    private String access_token;
    private Integer expires_in;
    private String token_type;
    private String refresh_token;
}

