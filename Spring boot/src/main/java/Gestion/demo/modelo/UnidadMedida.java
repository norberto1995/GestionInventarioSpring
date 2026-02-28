package Gestion.demo.modelo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UnidadMedida {

    @Id
    private Integer id; // ID que viene de Factus

    private String code; // KGM, MTR, etc

    private String name;
}
