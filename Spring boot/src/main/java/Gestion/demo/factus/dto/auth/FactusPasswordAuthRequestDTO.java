package Gestion.demo.factus.dto.auth;

import lombok.Data;

import lombok.Data;

@Data
public class FactusPasswordAuthRequestDTO {

    private String client_id;
    private String client_secret;
    private String username;
    private String password;
    private String grant_type = "password";

}
