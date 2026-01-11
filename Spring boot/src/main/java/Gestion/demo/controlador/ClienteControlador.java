package Gestion.demo.controlador;

import Gestion.demo.exepcion.RecurosNoEncontradoExepcion;
import Gestion.demo.modelo.Cliente;
import Gestion.demo.servicio.ClienteServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Gestion.demo.servicio.ClienteServicioImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//http://localhost:8080/gestion-app/
@RequestMapping("gestion-app")
@CrossOrigin(value = "http://localhost:3000")

public class ClienteControlador {

    private static final Logger logger = LoggerFactory.getLogger(ClienteControlador.class);

    @Autowired
    private ClienteServicio clienteServicio;

    @GetMapping("/clientes")
    public List<Cliente> obtenerClientes(){
        var clientes = clienteServicio.listarClientes();
        clientes.forEach((cliente -> logger.info(cliente.toString())));
        return clientes;
    }


    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente>
    obternerClientePorId(@PathVariable Integer id){
        Cliente cliente =clienteServicio.buscarClientePorId(id);
        if(cliente == null){
            throw new RecurosNoEncontradoExepcion("no se encontro el cliente "+ cliente);

        }
        return ResponseEntity.ok(cliente);
    }

   @PostMapping("/clientes")
    public Cliente agregarCliente(@RequestBody Cliente cliente){

        logger.info("cliente a agregar" + cliente);
        return clienteServicio.guardarCliente(cliente);
   }



   @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable Integer id , @RequestBody Cliente clienteRecibido){

        Cliente cliente = clienteServicio.buscarClientePorId(id);
        if (cliente ==null)
            throw new RecurosNoEncontradoExepcion("EL ID NO EXISTE"  + id);
            cliente.setNombre(clienteRecibido.getNombre());
            cliente.setDocumento(clienteRecibido.getDocumento());
            cliente.setTelefono(clienteRecibido.getTelefono());
            cliente.setEmail(clienteRecibido.getEmail());
            cliente.setDireccion(clienteRecibido.getDireccion());
            clienteServicio.guardarCliente(cliente);
            return ResponseEntity.ok(cliente);
   }

   @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Map<String , Boolean>>
    eliminarCliente(@PathVariable Integer id){
        Cliente cliente = clienteServicio.buscarClientePorId(id);
        if(cliente == null)
            throw new RecurosNoEncontradoExepcion("ID NO EXISTE" + id);
        clienteServicio.eliminarCliente(cliente);
        Map<String , Boolean> respuesta = new HashMap<>();
        return ResponseEntity.ok(respuesta);
   }

    @GetMapping("/clientes/buscar")
    public ResponseEntity<?> buscarCliente(
            @RequestParam String tipo,
            @RequestParam String valor) {

        // Delegamos la lógica al servicio pasando ambos datos
        Object resultado = clienteServicio.buscarPorCriterioSeleccionado(tipo, valor);

        if (resultado == null || (resultado instanceof List && ((List<?>) resultado).isEmpty())) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(resultado);
    }

}
