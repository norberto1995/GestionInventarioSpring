package Gestion.demo.servicio;

import Gestion.demo.dto.DetalleDTO;
import Gestion.demo.dto.VentaRequestDTO;
import Gestion.demo.factus.service.FactusFacturaService;
import Gestion.demo.modelo.*;
import Gestion.demo.repositorio.ClienteRepositorio;
import Gestion.demo.repositorio.ProductoRepositorio;
import Gestion.demo.repositorio.VentaRepositorio;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VentaServicioImpl implements VentaServicio {

    private final VentaRepositorio ventaRepo;
    private final ProductoRepositorio productoRepo;
    private final ClienteRepositorio clienteRepo;
    private final FactusFacturaService factusFacturaService;

    // 🔹 Ideal moverlo a configuración luego
    private final Integer NUMBERING_RANGE_ID = 8;
    private final String OPERATION_TYPE = "10";

    @Override
    @Transactional
    public Venta registrarVenta(VentaRequestDTO dto) {

        // ==========================
        // CLIENTE
        // ==========================
        Cliente cliente = clienteRepo.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente no existe"));

        Venta venta = new Venta();
        venta.setCliente(cliente);
        venta.setFecha(new Date());
        venta.setVendedor(dto.getVendedor());
        venta.setDescuento(dto.getDescuento() != null ? dto.getDescuento() : 0.0);
        venta.setPago(dto.getPago() != null ? dto.getPago() : 0.0);
        venta.setEstadoElectronico(EstadoFacturaElectronica.PENDIENTE);

        // ==========================
        // FACTUS HEADER
        // ==========================

        venta.setNumberingRangeId(NUMBERING_RANGE_ID);
        venta.setOperationType(OPERATION_TYPE);
        venta.setPaymentForm(dto.getPaymentForm());
        venta.setPaymentMethodCode(dto.getPaymentMethodCode());
        venta.setPaymentDueDate(dto.getPaymentDueDate());
        venta.setReferenceCode("VENTA--" + System.currentTimeMillis());


        // ==========================
        // DETALLES
        // ==========================

        double subtotal = 0;
        double totalIva = 0;
        List<DetalleVenta> detalles = new ArrayList<>();

        for (DetalleDTO d : dto.getDetalles()) {

            Producto p = productoRepo.findById(d.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no existe"));

            if (p.getStockActual() < d.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para " + p.getNombre());
            }

            double precio = p.getPrecioVenta();
            double ivaUnitario = precio * (p.getIva() / 100.0);

            subtotal += precio * d.getCantidad();
            totalIva += ivaUnitario * d.getCantidad();

            p.setStockActual(p.getStockActual() - d.getCantidad());

            DetalleVenta dv = new DetalleVenta();
            dv.setVenta(venta);
            dv.setProducto(p);
            dv.setCantidad(d.getCantidad().doubleValue());
            dv.setPrecioUnitario(precio);
            dv.setValorIva(ivaUnitario);
            dv.setTotalLinea((precio + ivaUnitario) * d.getCantidad());

            dv.setDescuento(d.getDescuento() != null ? d.getDescuento() : 0.0);
            dv.setIsExcluded(d.getIsExcluded() != null ? d.getIsExcluded() : false);
            dv.setStandardCodeId(
                    d.getStandardCodeId() != null ? d.getStandardCodeId() : p.getStandardCodeId()
            );
            dv.setUnitMeasureId(
                    d.getUnitMeasureId() != null ? d.getUnitMeasureId() : p.getUnidadMedida().getId()
            );
            dv.setTributeId(
                    d.getTributeId() != null ? d.getTributeId() : p.getTributeId()
            );

            dv.setTaxRate(p.getIva());




            detalles.add(dv);
        }

        // ==========================
        // TOTALES
        // ==========================

        double total = subtotal + totalIva - venta.getDescuento();
        double cambio = venta.getPago() - total;

        venta.setSubtotal(subtotal);
        venta.setTotalIva(totalIva);
        venta.setTotal(total);
        venta.setCambio(cambio);
        venta.setDetalles(detalles);

        // ==========================
        // GUARDAR
        // ==========================

        venta = ventaRepo.save(venta);

        // ==========================
        // ENVIAR A FACTUS
        // ==========================

        try {
            factusFacturaService.emitirFacturaDesdeVenta(venta);
        } catch (Exception e) {
            venta.setEstadoElectronico(EstadoFacturaElectronica.ERROR);
            venta.setMensajeFactus("Error enviando factura electrónica");
            venta.setErrorFactus(e.getMessage());
        }

        return ventaRepo.save(venta);
    }

    // ==========================
    // CONSULTAS
    // ==========================

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















