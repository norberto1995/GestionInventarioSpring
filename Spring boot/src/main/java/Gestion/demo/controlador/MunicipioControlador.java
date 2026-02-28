package Gestion.demo.controlador;


import Gestion.demo.factus.service.MunicipioSyncService;
import Gestion.demo.modelo.Municipio;
import Gestion.demo.servicio.MunicipioServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gestion-app/municipios")
@CrossOrigin
@RequiredArgsConstructor
public class MunicipioControlador {

    private final MunicipioSyncService municipioSyncService;

    private final MunicipioServicio municipioServicio;



    @GetMapping
    public List<Municipio> listar() {
        return municipioServicio.listarMunicipios();
    }
    //http://localhost:8080/gestion-app/municipios/sincronizar
    @PostMapping("/sincronizar")
    public String sincronizarMunicipios() {
        municipioSyncService.sincronizarMunicipios();
        return "Municipios sincronizados correctamente";
    }
}
