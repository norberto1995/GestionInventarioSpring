package Gestion.demo.controlador;


import Gestion.demo.modelo.Venta;
import Gestion.demo.servicio.VentaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("gestion-app")
@CrossOrigin("http://localhost:3000")
public class VentaControlador {

    @Autowired
    private VentaServicio ventaServicio;

    @PostMapping("/ventas")
    public ResponseEntity<Venta> registrarVenta(@RequestBody Venta venta) {

        Venta ventaGuardada = ventaServicio.registrarVenta(venta);

        return ResponseEntity.ok(ventaGuardada);
    }

    @GetMapping("/ventas")
    public List<Venta> listarVentas() {
        return ventaServicio.listarVentas();
    }

    @GetMapping("/ventas/{id}")
    public Venta buscarPorId(@PathVariable Integer id) {
        return ventaServicio.buscarVentaPorId(id);
    }

    @GetMapping("/ventas/cliente/{idCliente}")
    public List<Venta> buscarPorIdCliente(@PathVariable Integer idCliente) {
        return ventaServicio.buscarVentasPorIdCliente(idCliente);
    }

    @GetMapping("/ventas/cliente/documento/{doc}")
    public List<Venta> buscarPorDocumento(@PathVariable String doc) {
        return ventaServicio.buscarVentasPorDocumentoCliente(doc);
    }
}
