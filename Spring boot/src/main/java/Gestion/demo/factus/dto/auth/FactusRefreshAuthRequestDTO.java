package Gestion.demo.factus.dto.auth;
import lombok.Data;

@Data
public class FactusRefreshAuthRequestDTO {

    private String client_id;
    private String client_secret;
    private String refresh_token;
    private String grant_type = "refresh_token";

}