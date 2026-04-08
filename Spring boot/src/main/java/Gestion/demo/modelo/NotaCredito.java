package Gestion.demo.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotaCredito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idNotaCredito;

    // =========================
    // 🔗 RELACIONES
    // =========================

    @ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    @JsonIncludeProperties({"idVenta", "numeroFacturaElectronica"}) // ✅ Trae solo lo que necesitas
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonIncludeProperties({"idCliente", "nombre", "documento"}) // ✅ Trae datos del cliente
    private Cliente cliente;

    // =========================
    // 🧾 INFO GENERAL
    // =========================

    private Date fecha;

    private String motivo;

    @Enumerated(EnumType.STRING)
    private TipoNotaCredito tipo; // ANULACION o PARCIAL

    private Double subtotal;
    private Double totalIva;
    private Double total;

    private String referenceCode;

    // =========================
    // 🧾 RELACIÓN DETALLES
    // =========================

    @OneToMany(mappedBy = "notaCredito", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DetalleNotaCredito> detalles;

    // =========================
    // 🧾 DATOS FACTUS
    // =========================

    private Integer numberingRangeId;
    private String paymentMethodCode;

    @Enumerated(EnumType.STRING)
    private EstadoFacturaElectronica estadoElectronico;

    private String cufe;
    private String numeroNotaCredito;
    private String mensajeFactus;
    private String qr;

    @Lob
    private String errorFactus;
    private String public_url;


}
