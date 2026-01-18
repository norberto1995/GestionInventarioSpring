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
    private Cliente cliente;

    private Date fecha;

    private Double subtotal;
    private Double totalIva;
    private Double total;
    private Double descuento;
    private Double pago;
    private Double cambio;

    private String formaPago;
    private String vendedor;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL)
    @JsonManagedReference // Permite serializar los detalles sin recursión infinita
    private List<DetalleVenta> detalles;
}


