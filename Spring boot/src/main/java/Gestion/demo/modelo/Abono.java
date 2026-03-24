package Gestion.demo.modelo;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Abono {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAbono;

    @ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    @JsonBackReference
    private Venta venta;

    // =========================
    // 💰 Dinero
    // =========================

    private Double monto;      // lo que se aplica a la deuda
    private Double recibido;   // lo que entrega el cliente
    private Double cambio;     // recibido - monto

    // =========================
    // 💳 Método de pago
    // =========================
    private String metodoPago; // EFECTIVO, TRANSFERENCIA, CHEQUE, etc

    private Date fecha;
}
