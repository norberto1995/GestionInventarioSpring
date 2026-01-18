package Gestion.demo.controlador;


import Gestion.demo.exepcion.RecurosNoEncontradoExepcion;
import Gestion.demo.modelo.Cliente;
import Gestion.demo.modelo.Producto;
import Gestion.demo.servicio.ProductoServicio;
import Gestion.demo.servicio.ProductoServicioImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("gestion-app")
@CrossOrigin(value = "http://localhost:3000")
public class ProductoControlador {

    private static final Logger logger = LoggerFactory.getLogger(ProductoControlador.class);
    @Autowired
    private ProductoServicio productoServicio;


    @GetMapping("/productos")
    public List<Producto> obtenerProductos(){
        var productos = productoServicio.listarProductos();
        productos.forEach((producto -> logger.info(producto.toString())));
        return productos;
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto>  obtenerPorductoPorId(@PathVariable Integer id){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto == null){
            throw new RecurosNoEncontradoExepcion("no se encontro el producto "+ producto);
        }

        return ResponseEntity.ok(producto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/productos")
    public Producto agregarProducto (@RequestBody Producto producto){
        logger.info("cliente a agregar" + producto);
        return productoServicio.guardarProducto(producto);

    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Integer id , @RequestBody Producto productoRecibido){

        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto == null)
            throw  new RecurosNoEncontradoExepcion("no se encontro un producto" + producto);
            producto.setCodigo(productoRecibido.getCodigo());
            producto.setNombre(productoRecibido.getNombre());
            producto.setDescripcion(productoRecibido.getDescripcion());
            producto.setPrecioCompra(productoRecibido.getPrecioCompra());
            producto.setPrecioVenta(productoRecibido.getPrecioVenta());
            producto.setStockActual(productoRecibido.getStockActual());
            producto.setStockMinimo(productoRecibido.getStockMinimo());
            producto.setIva(productoRecibido.getIva());
            productoServicio.guardarProducto(producto);
            return ResponseEntity.ok(producto);

    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String , Boolean>>
    eliminarProducto(@PathVariable Integer id){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto == null)
            throw new RecurosNoEncontradoExepcion("ID NO EXISTE" + id);
        productoServicio.eliminarProducto(producto);
        Map<String , Boolean> respuesta = new HashMap<>();
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/productos/buscar")
    public ResponseEntity<?> buscarProducto(
            @RequestParam String tipo,
            @RequestParam String valor) {

        // Delegamos la lógica al servicio pasando ambos datos
        Object resultado = productoServicio.buscarPorCriterioSeleccionado(tipo, valor);

        if (resultado == null || (resultado instanceof List && ((List<?>) resultado).isEmpty())) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(resultado);
    }

}
