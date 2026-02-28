package Gestion.demo.modelo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "municipality_id", nullable = false)
    private Municipio municipio;
}








