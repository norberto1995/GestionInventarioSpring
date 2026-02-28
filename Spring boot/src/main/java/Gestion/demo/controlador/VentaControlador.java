package Gestion.demo.controlador;

import Gestion.demo.dto.VentaRequestDTO;
import Gestion.demo.factus.service.FactusFacturaService;
import Gestion.demo.modelo.Venta;
import Gestion.demo.servicio.VentaServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("gestion-app")
@CrossOrigin(origins = "http://localhost:3000")
public class VentaControlador {

    private final VentaServicio ventaServicio;
    private final FactusFacturaService factusFacturaService;

    public VentaControlador(VentaServicio ventaServicio, FactusFacturaService factusFacturaService) {
        this.ventaServicio = ventaServicio;
        this.factusFacturaService = factusFacturaService;
    }

    // 🔥 REGISTRAR VENTA (POS)
    @PostMapping("/ventas")
    public ResponseEntity<Venta> registrarVenta(@RequestBody VentaRequestDTO dto) {
        Venta venta = ventaServicio.registrarVenta(dto);
        return ResponseEntity.ok(venta);
    }

    // 📋 LISTAR TODAS
    @GetMapping("/ventas")
    public List<Venta> listarVentas() {
        return ventaServicio.listarVentas();
    }

    // 🔍 POR ID
    @GetMapping("/ventas/{id}")
    public Venta buscarPorId(@PathVariable Integer id) {
        return ventaServicio.buscarVentaPorId(id);
    }

    // 🔍 POR CLIENTE
    @GetMapping("/ventas/cliente/{idCliente}")
    public List<Venta> buscarPorIdCliente(@PathVariable Integer idCliente) {
        return ventaServicio.buscarVentasPorIdCliente(idCliente);
    }

    // 🔍 POR DOCUMENTO
    @GetMapping("/ventas/cliente/documento/{documento}")
    public List<Venta> buscarPorDocumento(@PathVariable String documento) {
        return ventaServicio.buscarVentasPorDocumentoCliente(documento);
    }

    @PostMapping("/ventas/{id}/reintentar-factus")
    public ResponseEntity<?> reintentarFactus(@PathVariable Integer id) {
        factusFacturaService.reintentarEnvio(id);
        return ResponseEntity.ok("Reintento ejecutado");
    }
}

