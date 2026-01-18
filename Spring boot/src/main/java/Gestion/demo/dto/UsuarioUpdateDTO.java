package Gestion.demo.dto;

import lombok.Data;

@Data
public class UsuarioUpdateDTO {

    private String rol;     // ADMIN o USER
    private Boolean activo; // true / false
}

