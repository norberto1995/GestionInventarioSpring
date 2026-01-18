package Gestion.demo.dto;

import lombok.Data;

@Data
public class UsuarioRequestDTO {

    private String username;
    private String password;
    private String rol; // ADMIN o USER
}

