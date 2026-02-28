package Gestion.demo.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idVenta;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    @JsonManagedReference
    private Cliente cliente;

    private Date fecha;

    // =========================
    // Totales comerciales
    // =========================
    private Double subtotal;
    private Double totalIva;
    private Double total;
    private Double descuento;

    private Double pago;
    private Double cambio;

    private String formaPago; // uso interno
    private String vendedor;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DetalleVenta> detalles;

    // =========================
    // 🧾 Datos fiscales DIAN
    // =========================

    private Integer numberingRangeId;   // Rango DIAN
    private String operationType;      // 10 estándar
    private String paymentForm;         // 1 contado, 2 crédito
    private String paymentMethodCode;   // 10 efectivo, etc
    private Date paymentDueDate;        // Solo si es crédito

    private String referenceCode;       // Código interno único

    // =========================
    // 🧾 Respuesta Facturación
    // =========================

    @Enumerated(EnumType.STRING)
    private EstadoFacturaElectronica estadoElectronico;

    private String numeroFacturaElectronica;
    private String cufe;
    private String qr;
    private Date fechaValidacion;
    private String factusUuid;
    private String observation;

    @Column(name = "public_url", columnDefinition = "LONGTEXT")
    private String publicUrl;

    @Column(length = 500)
    private String mensajeFactus;

    @Lob
    @Column(name = "error_factus", columnDefinition = "LONGTEXT")
    private String errorFactus;

}






