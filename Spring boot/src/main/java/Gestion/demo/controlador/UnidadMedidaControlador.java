package Gestion.demo.controlador;

import Gestion.demo.factus.service.UnidadSyncService;
import Gestion.demo.modelo.UnidadMedida;
import Gestion.demo.servicio.UnidadMedidaServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gestion-app/unidades")
@CrossOrigin
public class UnidadMedidaControlador {

    private final UnidadMedidaServicio unidadServicio;
    private final UnidadSyncService unidadSyncService;


    public UnidadMedidaControlador(UnidadMedidaServicio unidadServicio, UnidadSyncService unidadSyncService) {
        this.unidadServicio = unidadServicio;
        this.unidadSyncService = unidadSyncService;
    }

    @GetMapping
    public List<UnidadMedida> listar() {
        return unidadServicio.listarUnidades();
    }

    //http://localhost:8080/gestion-app/uniades/sincronizar
    @PostMapping("/sincronizar")
    public String sincronizarMunicipios() {
        unidadSyncService.sincronizarUnidades();
        return "Municipios sincronizados correctamente";
    }
}
