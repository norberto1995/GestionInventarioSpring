package Gestion.demo.modelo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProducto;

    private String codigo;
    private String nombre;
    private String descripcion;

    private Double precioCompra;

    // Precio final (IVA incluido)
    private Double precioVenta;

    // Porcentaje IVA (ej: 19)
    private Double iva;

    private int stockActual;
    private int stockMinimo;

    // 🧾 Datos fiscales
    @ManyToOne
    @JoinColumn(name = "unit_measure_id")
    private UnidadMedida unidadMedida;  // kilo o libra


    private Integer tributeId; // iva o ica
    private Integer standardCodeId; // coloquemos "1 "
    private Integer excluido;
}






