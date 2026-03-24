package Gestion.demo.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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
    private Double subtotal;  // precio * cantidad
    private Double totalIva;   // suma del iva del producto
    private Double total;   // precio mas iva
    private Double descuento;

    private Double totalRecibido;
    private Double saldoPendiente;


    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonManagedReference
    private Usuario usuario;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DetalleVenta> detalles;


    // =========================
    // 💰 RELACIÓN DE PAGOS (CLAVE)
    // =========================
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Abono> abonos;

    // =========================
    // 🧾 Datos fiscales DIAN
    // =========================

    private Integer numberingRangeId;   // Rango DIAN
    private String operationType;      // 10 estándar
    private String paymentForm;         // 1 contado, 2 crédito
    private String paymentMethodCode;   // 10 efectivo, etc   SOLO informativo

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate paymentDueDate;      // Solo si es crédito fecha vencimiento

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
    private String factusUuid; //sin utilizar por ahora
    private String observation;

    @Column(name = "public_url", columnDefinition = "LONGTEXT")
    private String publicUrl;

    @Column(length = 500)
    private String mensajeFactus;

    @Lob
    @Column(name = "error_factus", columnDefinition = "LONGTEXT")
    private String errorFactus;



}






