package Gestion.demo.modelo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Municipio {

    @Id
    private Integer id; // ID que viene de Factus

    private String code; // Código DIAN

    private String name;

    private String department;
}
