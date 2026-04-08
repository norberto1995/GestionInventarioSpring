package Gestion.demo.servicio;

import Gestion.demo.dto.DetalleDTO;
import Gestion.demo.dto.NotaCreditoRequestDTO;
import Gestion.demo.factus.service.FactusNotaCreditoService;
import Gestion.demo.modelo.*;
import Gestion.demo.repositorio.NotaCreditoRepositorio;
import Gestion.demo.repositorio.ProductoRepositorio;
import Gestion.demo.repositorio.VentaRepositorio;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NotaCreditoServicioImpl implements NotaCreditoServicio{

    private final NotaCreditoRepositorio notaRepo;
    private final VentaRepositorio ventaRepo;
    private final ProductoRepositorio productoRepo;
    private final FactusNotaCreditoService factusService;

    @Transactional
    public NotaCredito crearNotaCredito(NotaCreditoRequestDTO dto) {

        // =========================
        // 1. BUSCAR VENTA
        // =========================
        Venta venta = ventaRepo.findById(dto.getVentaId())
                .orElseThrow(() -> new RuntimeException("Venta no existe"));

        if (venta.getEstadoElectronico() != EstadoFacturaElectronica.VALIDADA) {
            throw new RuntimeException("Solo puedes hacer nota crédito de facturas válidas");
        }

        // 🔥 PROTECCIÓN EXTRA (por estado)
        if (venta.getEstadoElectronico() == EstadoFacturaElectronica.ANULADA) {
            throw new RuntimeException("La venta ya está anulada");
        }

        // =========================
        // 2. VALIDACIONES POR HISTORIAL
        // =========================
        List<NotaCredito> anteriores = notaRepo.findByVenta_IdVenta(venta.getIdVenta());

        boolean yaAnulada = anteriores.stream()
                .anyMatch(n -> n.getTipo() == TipoNotaCredito.ANULACION);

        boolean yaTieneNotas = !anteriores.isEmpty();

        // ❌ No permitir doble anulación
        if (Boolean.TRUE.equals(dto.getAnulacionTotal()) && yaAnulada) {
            throw new RuntimeException("La venta ya fue anulada con una nota crédito");
        }

        // ❌ No permitir anulación si ya hay parciales
        if (Boolean.TRUE.equals(dto.getAnulacionTotal()) && yaTieneNotas) {
            throw new RuntimeException("No puedes hacer anulación total porque ya existen notas crédito");
        }

        // ❌ No permitir parciales si ya fue anulada
        if (!Boolean.TRUE.equals(dto.getAnulacionTotal()) && yaAnulada) {
            throw new RuntimeException("No puedes hacer notas parciales porque la venta ya fue anulada");
        }

        // =========================
        // 3. CREAR NOTA
        // =========================
        NotaCredito nc = new NotaCredito();
        nc.setVenta(venta);
        nc.setCliente(venta.getCliente());
        nc.setFecha(new Date());
        nc.setMotivo(dto.getMotivo());
        nc.setEstadoElectronico(EstadoFacturaElectronica.PENDIENTE);
        nc.setReferenceCode("NC-" + System.currentTimeMillis());
        nc.setNumberingRangeId(9);
        nc.setPaymentMethodCode(venta.getPaymentMethodCode());

        List<DetalleNotaCredito> detalles = new ArrayList<>();

        // =========================
        // 4. MAPA DEVUELTOS
        // =========================
        Map<Integer, Double> devueltoPorProducto = new HashMap<>();

        for (NotaCredito n : anteriores) {
            for (DetalleNotaCredito d : n.getDetalles()) {
                devueltoPorProducto.merge(
                        d.getProducto().getIdProducto(),
                        d.getCantidad(),
                        Double::sum
                );
            }
        }

        // =========================
        // 5. ANULACION TOTAL
        // =========================
        if (Boolean.TRUE.equals(dto.getAnulacionTotal())) {

            nc.setTipo(TipoNotaCredito.ANULACION);

            for (DetalleVenta dv : venta.getDetalles()) {

                DetalleNotaCredito dnc = construirDetalleDesdeVenta(dv, dv.getCantidad());
                detalles.add(dnc);

                // INVENTARIO
                Producto p = dv.getProducto();
                p.setStockActual(p.getStockActual() + dv.getCantidad().intValue());
            }

            // 🔥 MARCAR VENTA ANULADA (seguro porque ya validamos arriba)
            venta.setEstadoElectronico(EstadoFacturaElectronica.ANULADA);

        } else {

            // =========================
// 6. PARCIAL
// =========================
            nc.setTipo(TipoNotaCredito.PARCIAL);

            if (dto.getItems() == null || dto.getItems().isEmpty()) {
                throw new RuntimeException("Debe enviar items para nota crédito parcial");
            }

// 🔥 FILTRAR ITEMS VALIDOS (cantidad > 0)
            List<DetalleDTO> itemsValidos = dto.getItems().stream()
                    .filter(item -> item.getCantidad() != null && item.getCantidad() > 0)
                    .toList();

// 🔥 VALIDAR QUE QUEDE AL MENOS UNO
            if (itemsValidos.isEmpty()) {
                throw new RuntimeException("Debe enviar al menos un producto con cantidad mayor a 0");
            }

// 🔥 PROCESAR SOLO LOS VALIDOS
            for (DetalleDTO item : itemsValidos) {

                DetalleVenta dv = venta.getDetalles().stream()
                        .filter(d -> d.getProducto().getIdProducto().equals(item.getProductoId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Producto no pertenece a la venta"));

                double yaDevuelto = devueltoPorProducto.getOrDefault(
                        dv.getProducto().getIdProducto(), 0.0
                );

                double disponible = dv.getCantidad() - yaDevuelto;

                if (item.getCantidad() > disponible) {
                    throw new RuntimeException(
                            "Cantidad excede lo disponible para devolución. Disponible: " + disponible
                    );
                }

                DetalleNotaCredito dnc = construirDetalleDesdeVenta(dv, item.getCantidad().doubleValue());
                detalles.add(dnc);

                // INVENTARIO
                Producto p = dv.getProducto();
                p.setStockActual(p.getStockActual() + item.getCantidad());
            }
        }

        // =========================
        // 7. CALCULAR TOTALES
        // =========================
        double subtotal = 0;
        double totalIva = 0;

        for (DetalleNotaCredito d : detalles) {
            subtotal += d.getPrecioUnitario() * d.getCantidad();
            totalIva += d.getValorIva() * d.getCantidad();
            d.setNotaCredito(nc);
        }

        nc.setSubtotal(subtotal);
        nc.setTotalIva(totalIva);
        nc.setTotal(subtotal + totalIva);
        nc.setDetalles(detalles);

        // =========================
        // 8. AJUSTAR CARTERA
        // =========================
        if (venta.getSaldoPendiente() != null) {

            double nuevoSaldo = venta.getSaldoPendiente() - nc.getTotal();

            if (nuevoSaldo < 0) {
                nuevoSaldo = 0;
            }

            venta.setSaldoPendiente(nuevoSaldo);
        }

        // =========================
        // 9. GUARDAR
        // =========================
        nc = notaRepo.save(nc);

        // =========================
        // 10. FACTUS
        // =========================
        try {
            factusService.emitirNotaCredito(nc);
        } catch (Exception e) {
            nc.setEstadoElectronico(EstadoFacturaElectronica.ERROR);
            nc.setErrorFactus(e.getMessage());
        }

        return notaRepo.save(nc);
    }



    // =========================
    // HELPER
    // =========================
    private DetalleNotaCredito construirDetalleDesdeVenta(DetalleVenta dv, Double cantidad) {

        DetalleNotaCredito d = new DetalleNotaCredito();

        d.setProducto(dv.getProducto());
        d.setCantidad(cantidad);
        d.setPrecioUnitario(dv.getPrecioUnitario());
        d.setValorIva(dv.getValorIva());
        d.setTotalLinea(dv.getValorIva() + dv.getPrecioUnitario());
        d.setDescuento(dv.getDescuento());

        d.setUnitMeasureId(dv.getUnitMeasureId());
        d.setStandardCodeId(dv.getStandardCodeId());
        d.setTributeId(dv.getTributeId());
        d.setIsExcluded(dv.getIsExcluded());
        d.setTaxRate(dv.getTaxRate());

        return d;
    }


    @Override
    public List<NotaCredito> listarNotasCredito() {
        // Ordenamos por ID descendente para ver las más recientes primero
        return notaRepo.findAll();
    }

    @Override
    public NotaCredito buscarPorId(Integer idNotaCredito) {
        return notaRepo.findById(idNotaCredito)
                .orElseThrow(() -> new RuntimeException("Nota de crédito no encontrada con ID: " + idNotaCredito));
    }

    @Override
    public List<NotaCredito> buscarPorVenta(Integer ventaId) {
        // Buscamos todas las notas asociadas a una factura específica
        return notaRepo.findByVenta_IdVenta(ventaId);
    }
}