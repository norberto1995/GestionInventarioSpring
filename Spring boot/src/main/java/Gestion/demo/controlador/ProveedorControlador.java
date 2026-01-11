package Gestion.demo.controlador;


import Gestion.demo.exepcion.RecurosNoEncontradoExepcion;
import Gestion.demo.modelo.Proveedor;

import Gestion.demo.servicio.ProveedorServicio;
import Gestion.demo.servicio.ProveedorServicioImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestion-app")
@CrossOrigin(value = "http://localhost:3000")
public class ProveedorControlador {

    private static final Logger logger = LoggerFactory.getLogger(ProveedorControlador.class);


    @Autowired
    private ProveedorServicio proveedorServicio;

    @GetMapping("/proveedores")
    public List<Proveedor> obtenerProveedores(){
        var proveedores = proveedorServicio.listarProveedores();
        proveedores.forEach(proveedor -> logger.info(proveedor.toString()));
        return proveedores;
    }

    @GetMapping("/proveedores/{id}")
    public ResponseEntity<Proveedor> obtenerProveedorPorId(@PathVariable Integer id){
        Proveedor proveedor = proveedorServicio.buscarProveedorPorId(id);
        if(proveedor == null)
            throw new RecurosNoEncontradoExepcion("No se encontro el proveedor" + proveedor);
        return ResponseEntity.ok(proveedor);
    }

    @PostMapping("/proveedores")
    public Proveedor guardarProveedor(@RequestBody Proveedor proveedor){
        logger.info("Proveedor agregado" + proveedor);
        return proveedorServicio.guardarProveedor(proveedor);

    }

    @PutMapping("/proveedores/{id}")
    public ResponseEntity<Proveedor> actualizarProveedor(@PathVariable Integer id , @RequestBody Proveedor proveedorEncontrado){
        Proveedor proveedor = proveedorServicio.buscarProveedorPorId(id);
        if(proveedor == null )
            throw new RecurosNoEncontradoExepcion("NO SE ENCONTRO EL PROVEEDOR" + proveedor);
        proveedor.setNombreProveedor(proveedorEncontrado.getNombreProveedor());
        proveedor.setDocumento(proveedorEncontrado.getDocumento());
        proveedor.setTelefono(proveedorEncontrado.getTelefono());
        proveedor.setDireccion(proveedorEncontrado.getDireccion());
        proveedor.setEmail(proveedorEncontrado.getEmail());
        proveedorServicio.guardarProveedor(proveedor);
        return ResponseEntity.ok(proveedor);
    }

    @DeleteMapping("/proveedores/{id}")
    public ResponseEntity<Map<String , Boolean>> eliminarProveedor(@PathVariable Integer id){
        Proveedor proveedor = proveedorServicio.buscarProveedorPorId(id);
        if(proveedor == null)
            throw new RecurosNoEncontradoExepcion("ID NO ENCONTRADO" + proveedor);

        proveedorServicio.eliminarProveedor(proveedor);
        Map<String , Boolean> respuesta = new HashMap<>();
        return ResponseEntity.ok(respuesta);
    }


    @GetMapping("/proveedores/buscar")
    public ResponseEntity<?> buscarProveedor(
            @RequestParam String tipo ,
            @RequestParam String valor
    ){
        // Delegamos la lógica al servicio pasando ambos datos
        Object resultado = proveedorServicio.buscarPorCriterioSeleccionado(tipo, valor);

        if (resultado == null || (resultado instanceof List && ((List<?>) resultado).isEmpty())) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(resultado);
    }


}
