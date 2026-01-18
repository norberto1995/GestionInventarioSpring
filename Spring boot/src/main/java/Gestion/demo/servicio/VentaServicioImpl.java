package Gestion.demo.servicio;

import Gestion.demo.dto.DetalleDTO;
import Gestion.demo.dto.VentaRequestDTO;
import Gestion.demo.modelo.*;
import Gestion.demo.repositorio.ClienteRepositorio;
import Gestion.demo.repositorio.ProductoRepositorio;
import Gestion.demo.repositorio.VentaRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class VentaServicioImpl implements VentaServicio {

    private final VentaRepositorio ventaRepo;
    private final ProductoRepositorio productoRepo;
    private final ClienteRepositorio clienteRepo;

    public VentaServicioImpl(VentaRepositorio ventaRepo,
                             ProductoRepositorio productoRepo,
                             ClienteRepositorio clienteRepo) {
        this.ventaRepo = ventaRepo;
        this.productoRepo = productoRepo;
        this.clienteRepo = clienteRepo;
    }

    @Override
    @Transactional
    public Venta registrarVenta(VentaRequestDTO dto) {

        Cliente cliente = clienteRepo.findById(dto.clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no existe"));

        Venta venta = new Venta();
        venta.setCliente(cliente);
        venta.setFecha(new Date());
        venta.setFormaPago(dto.formaPago);
        venta.setVendedor(dto.vendedor);
        venta.setDescuento(dto.descuento);
        venta.setPago(dto.pago);

        double subtotal = 0;
        double totalIva = 0;

        List<DetalleVenta> detalles = new ArrayList<>();

        for (DetalleDTO d : dto.detalles) {

            Producto p = productoRepo.findById(d.productoId)
                    .orElseThrow(() -> new RuntimeException("Producto no existe"));

            if (p.getStockActual() < d.cantidad) {
                throw new RuntimeException("Stock insuficiente para " + p.getNombre());
            }

            double precio = p.getPrecioVenta();
            double iva = precio * (p.getIva() / 100);
            double totalLinea = (precio + iva) * d.cantidad;

            subtotal += precio * d.cantidad;
            totalIva += iva * d.cantidad;

            p.setStockActual(p.getStockActual() - d.cantidad);

            DetalleVenta dv = new DetalleVenta();
            dv.setVenta(venta);
            dv.setProducto(p);
            dv.setCantidad(d.cantidad);
            dv.setPrecioUnitario(precio);
            dv.setIva(iva);
            dv.setTotal(totalLinea);

            detalles.add(dv);
        }

        double total = subtotal + totalIva - dto.descuento;
        double cambio = dto.pago - total;

        venta.setSubtotal(subtotal);
        venta.setTotalIva(totalIva);
        venta.setTotal(total);
        venta.setCambio(cambio);
        venta.setDetalles(detalles);

        return ventaRepo.save(venta);
    }

    // ===============================
    // CONSULTAS
    // ===============================

    @Override
    public List<Venta> listarVentas() {
        return ventaRepo.findAll();
    }

    @Override
    public Venta buscarVentaPorId(Integer idVenta) {
        return ventaRepo.findById(idVenta).orElse(null);
    }

    @Override
    public List<Venta> buscarVentasPorIdCliente(Integer idCliente) {
        return ventaRepo.findByCliente_IdCliente(idCliente);
    }

    @Override
    public List<Venta> buscarVentasPorDocumentoCliente(String documento) {
        return ventaRepo.findByCliente_Documento(documento);
    }
}
