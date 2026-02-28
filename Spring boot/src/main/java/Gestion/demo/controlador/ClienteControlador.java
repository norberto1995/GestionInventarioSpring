package Gestion.demo.controlador;

import Gestion.demo.dto.ClienteRequestDTO;
import Gestion.demo.dto.ClienteResponseDTO;
import Gestion.demo.factus.service.MunicipioSyncService;
import Gestion.demo.factus.service.UnidadSyncService;
import Gestion.demo.servicio.ClienteServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gestion-app/clientes")
@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
public class ClienteControlador {

    private final ClienteServicio clienteServicio;
    private final MunicipioSyncService municipioSyncService;
    private final UnidadSyncService unidadSyncService;

    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listar() {

        return ResponseEntity.ok(clienteServicio.listarClientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(clienteServicio.buscarClientePorId(id));
    }

    @PostMapping
    public ResponseEntity<ClienteResponseDTO> crear(@RequestBody ClienteRequestDTO dto) {
        return ResponseEntity.ok(clienteServicio.guardarCliente(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> actualizar(
            @PathVariable Integer id,
            @RequestBody ClienteRequestDTO dto) {

        return ResponseEntity.ok(clienteServicio.actualizarCliente(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        clienteServicio.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
}
