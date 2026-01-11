package Gestion.demo.servicio;


import Gestion.demo.modelo.DetalleVenta;
import Gestion.demo.modelo.Producto;
import Gestion.demo.modelo.Venta;
import Gestion.demo.repositorio.ProductoRepositorio;
import Gestion.demo.repositorio.VentaRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaServicioImpl implements VentaServicio{

    @Autowired
    private ProductoRepositorio productoRepositorio;

    @Autowired
    private VentaRepositorio ventaRepositorio;

    @Override
    @Transactional
    public Venta registrarVenta(Venta venta) {
        double totalVenta = 0.0;

        for (DetalleVenta d : venta.getDetalles()) {

            // 1) relacionar detalle con venta
            d.setVenta(venta);

            // 2) obtener producto de BD
            Producto p = productoRepositorio.findById(d.getIdProducto())
                    .orElseThrow(() -> new RuntimeException("Producto no existe"));

            // 3) asignar precio del producto
            d.setPrecioUnitario(p.getPrecioVenta());

            // 4) calcular subtotal
            double subtotal = p.getPrecioVenta() * d.getCantidad();
            d.setSubtotal(subtotal);

            // 5) calcular iva del producto
            double iva = subtotal * (p.getIva() );
            d.setIva(iva);

            // 6) acumular total de venta
            totalVenta += subtotal + iva;
        }

        // 7) asignar total de la venta
        venta.setTotal(totalVenta);

        return ventaRepositorio.save(venta);
}

    @Override
    public List<Venta> listarVentas() {
        return ventaRepositorio.findAll();
    }

    @Override
    public Venta buscarVentaPorId(Integer idVenta) {
        return ventaRepositorio.findById(idVenta).orElse(null);
    }

    @Override
    public List<Venta> buscarVentasPorIdCliente(Integer idCliente) {
        return ventaRepositorio.findByCliente_IdCliente(idCliente);
    }

    @Override
    public List<Venta> buscarVentasPorDocumentoCliente(String documento) {
        return ventaRepositorio.findByCliente_Documento(documento);
    }

}
