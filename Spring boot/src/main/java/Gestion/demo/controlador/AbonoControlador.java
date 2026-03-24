package Gestion.demo.controlador;

import Gestion.demo.dto.AbonoDTO;
import Gestion.demo.modelo.Abono;
import Gestion.demo.servicio.AbonoServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("gestion-app/abonos")
@CrossOrigin(origins = "http://localhost:3000")
public class AbonoControlador {

    private final AbonoServicio abonoServicio;

    public AbonoControlador(AbonoServicio abonoServicio) {
        this.abonoServicio = abonoServicio;
    }

    // 💰 Registrar abono
    @PostMapping
    public ResponseEntity<Abono> registrarAbono(@RequestBody AbonoDTO dto) {
        return ResponseEntity.ok(abonoServicio.registrarAbono(dto));
    }

    // 📋 Listar abonos por venta
    @GetMapping("/venta/{ventaId}")
    public List<Abono> listarPorVenta(@PathVariable Integer ventaId) {
        return abonoServicio.listarPorVenta(ventaId);
    }
}
