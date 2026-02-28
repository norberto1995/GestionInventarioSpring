package Gestion.demo.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDetalle;

    @ManyToOne
    @JoinColumn(name = "id_venta")
    @JsonBackReference
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;

    private Double cantidad;

    // Precio unitario final (IVA incluido)
    private Double precioUnitario;

    // % descuento aplicado
    private Double descuento;

    // Resultado fiscal
    private Double valorIva;
    private Double totalLinea;

    // 🧾 Snapshot fiscal (copiado del producto al momento de vender)
    private Integer unitMeasureId;
    private Integer standardCodeId;
    private Integer tributeId;
    private Boolean isExcluded;
    private Double taxRate;
}








