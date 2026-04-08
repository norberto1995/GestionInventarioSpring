package Gestion.demo.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleNotaCredito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDetalleNotaCredito;

    // =========================
    // 🔗 RELACIONES
    // =========================

    @ManyToOne
    @JoinColumn(name = "nota_credito_id")
    @JsonBackReference
    private NotaCredito notaCredito;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    // =========================
    // 📦 DATOS
    // =========================

    private Double cantidad;

    private Double precioUnitario; // SIN IVA
    private Double valorIva;
    private Double totalLinea;

    private Double descuento;

    // =========================
    // 🧾 SNAPSHOT FISCAL (CLAVE)
    // =========================

    private Integer unitMeasureId;
    private Integer standardCodeId;
    private Integer tributeId;
    private Integer isExcluded;
    private Double taxRate;
}