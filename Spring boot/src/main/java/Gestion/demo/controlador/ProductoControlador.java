package Gestion.demo.controlador;


import Gestion.demo.dto.ProductoDTO;
import Gestion.demo.exepcion.RecurosNoEncontradoExepcion;
import Gestion.demo.modelo.Cliente;
import Gestion.demo.modelo.Producto;
import Gestion.demo.modelo.UnidadMedida;
import Gestion.demo.repositorio.UnidadMedidaRepositorio;
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



    private static final Logger logger =
            LoggerFactory.getLogger(ProductoControlador.class);

    private final ProductoServicio productoServicio;
    private final UnidadMedidaRepositorio unidadMedidaRepositorio;

    public ProductoControlador(ProductoServicio productoServicio,
                               UnidadMedidaRepositorio unidadMedidaRepositorio) {
        this.productoServicio = productoServicio;
        this.unidadMedidaRepositorio = unidadMedidaRepositorio;
    }



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
    public Producto agregarProducto (@RequestBody ProductoDTO dto){
        logger.info("´producto a agregar" + dto);
        System.out.println(dto + "para ver que llega del fronend");

        Producto producto = new Producto();
        producto.setCodigo(dto.getCodigo());
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecioCompra(dto.getPrecioCompra());
        producto.setPrecioVenta(dto.getPrecioVenta());
        producto.setStockActual(dto.getStockActual());
        producto.setStockMinimo(dto.getStockMinimo());
        producto.setIva(dto.getIva());

        UnidadMedida unidad = unidadMedidaRepositorio.findById(dto.getUnitMeasureId())
                .orElseThrow(() -> new RuntimeException("Unidad no encontrada"));

        producto.setUnidadMedida(unidad);
        producto.setTributeId(dto.getTributeId());
        producto.setStandardCodeId(dto.getStandardCodeId());

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

        // 🔥 CORRECTO: buscar la unidad antes de asignar
        if (productoRecibido.getUnidadMedida() != null) {
            Integer unidadId = productoRecibido.getUnidadMedida().getId();

            UnidadMedida unidad = unidadMedidaRepositorio.findById(unidadId)
                    .orElseThrow(() -> new RuntimeException("Unidad no encontrada"));

            producto.setUnidadMedida(unidad);
        }
        producto.setTributeId(productoRecibido.getTributeId());
        producto.setStandardCodeId(productoRecibido.getStandardCodeId());


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
