package Gestion.demo.dto;

import lombok.Data;

@Data
public class ClienteResponseDTO {

    private Integer idCliente;
    private String nombre;
    private String documento;
    private String telefono;
    private String email;
    private String direccion;
    private Integer dv;

    private Integer identificationDocumentId;
    private Integer legalOrganizationId;
    private Integer tributeId;

    private Integer municipioId;
    private String municipioNombre;

    private String departamento;
}