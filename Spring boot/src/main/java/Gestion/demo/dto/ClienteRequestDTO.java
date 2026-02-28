package Gestion.demo.dto;

import Gestion.demo.modelo.Municipio;
import lombok.Data;

@Data
public class ClienteRequestDTO {

    private String nombre;
    private String documento;
    private String telefono;
    private String email;
    private String direccion;
    private Integer dv;

    private Integer identificationDocumentId;
    private Integer legalOrganizationId;
    private Integer tributeId;

    private Integer municipioId; // solo el ID
}
