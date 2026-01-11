package Gestion.demo.modelo;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDetalle;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_venta")
    private Venta venta;

    private Integer idProducto;
    private Integer cantidad;
    private Double precioUnitario;
    private Double subtotal;
    private Double iva;
}
