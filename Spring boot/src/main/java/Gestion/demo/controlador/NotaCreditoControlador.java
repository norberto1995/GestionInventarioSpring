package Gestion.demo.controlador;

import Gestion.demo.dto.NotaCreditoRequestDTO;
import Gestion.demo.modelo.NotaCredito;
import Gestion.demo.servicio.NotaCreditoServicioImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("gestion-app")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NotaCreditoControlador {

    private final NotaCreditoServicioImpl servicio;

    // Crear
    @PostMapping("/notas-credito")
    public ResponseEntity<NotaCredito> crear(@RequestBody NotaCreditoRequestDTO dto) {
        return ResponseEntity.ok(servicio.crearNotaCredito(dto));
    }

    // Listar todas
    @GetMapping("/notas-credito")
    public ResponseEntity<List<NotaCredito>> listar() {
        return ResponseEntity.ok(servicio.listarNotasCredito());
    }

    // Buscar por ID
    @GetMapping("/notas-credito/{id}")
    public ResponseEntity<NotaCredito> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(servicio.buscarPorId(id));
    }

    // Buscar todas las notas de una venta específica
    @GetMapping("/notas-credito/venta/{ventaId}")
    public ResponseEntity<List<NotaCredito>> buscarPorVenta(@PathVariable Integer ventaId) {
        return ResponseEntity.ok(servicio.buscarPorVenta(ventaId));
    }
}
