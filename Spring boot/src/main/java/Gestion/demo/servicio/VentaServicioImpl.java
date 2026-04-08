package Gestion.demo.servicio;

import Gestion.demo.dto.DetalleDTO;
import Gestion.demo.dto.VentaRequestDTO;
import Gestion.demo.factus.service.FactusFacturaService;
import Gestion.demo.modelo.*;
import Gestion.demo.repositorio.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final UsuarioRepositorio usuarioRepo;
    private final AbonoRepositorio abonoRepo;

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

        // ==========================
        // USUARIO
        // ==========================
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        Usuario usuario = usuarioRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario autenticado no encontrado en BD"));

        venta.setUsuario(usuario);

        // ==========================
        // CONFIG GENERAL
        // ==========================
        venta.setDescuento(dto.getDescuento() != null ? dto.getDescuento() : 0.0);
        venta.setEstadoElectronico(EstadoFacturaElectronica.PENDIENTE);

        venta.setNumberingRangeId(NUMBERING_RANGE_ID);
        venta.setOperationType(OPERATION_TYPE);
        venta.setPaymentForm(dto.getPaymentForm()); // solo DIAN
        venta.setPaymentMethodCode(dto.getPaymentMethodCode());
        venta.setPaymentDueDate(dto.getPaymentDueDate());
        venta.setReferenceCode("VENTA--" + System.currentTimeMillis());
        venta.setObservation(dto.getObservation());

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

            double precio =  p.getPrecioVenta();


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
            dv.setIsExcluded(p.getExcluido());
            dv.setStandardCodeId( p.getStandardCodeId());
            dv.setUnitMeasureId(p.getUnidadMedida().getId());
            dv.setTributeId( p.getTributeId());
            dv.setTaxRate(p.getIva());

            detalles.add(dv);
        }

        // ==========================
        // TOTALES
        // ==========================
        double total = subtotal + totalIva - venta.getDescuento();

        venta.setSubtotal(subtotal);
        venta.setTotalIva(totalIva);
        venta.setTotal(total);
        double pagoRecibido = dto.getTotalRecibido();

        venta.setTotalRecibido(pagoRecibido);


        venta.setDetalles(detalles);
        // ==========================
        // GUARDAR VENTA
        // ==========================
        venta = ventaRepo.save(venta);


        if("1".equals(dto.getPaymentForm())){

            Abono abono = new Abono();
            abono.setVenta(venta);
            abono.setMonto(total);
            abono.setRecibido(pagoRecibido);
            abono.setCambio(pagoRecibido-total);
            abono.setMetodoPago(dto.getPaymentMethodCode());
            abono.setFecha(new Date());

            abonoRepo.save(abono);
            venta.setSaldoPendiente(0.0);
        }else if("2".equals(dto.getPaymentForm()) ){

            if (pagoRecibido > 0) {

                Abono abono = new Abono();
                abono.setVenta(venta);
                abono.setMonto(total);
                abono.setRecibido(pagoRecibido);
                abono.setCambio(0.0);
                abono.setMetodoPago(dto.getPaymentMethodCode());
                abono.setFecha(new Date());
                abonoRepo.save(abono);
                venta.setSaldoPendiente(  total - pagoRecibido);
                }else {

                Abono abono = new Abono();
                abono.setVenta(venta);
                abono.setMonto(total);
                abono.setRecibido(pagoRecibido);
                abono.setCambio(0.0);
                abono.setMetodoPago(dto.getPaymentMethodCode());
                abono.setFecha(new Date());
                abonoRepo.save(abono);

                    venta.setSaldoPendiente(total);
                }

            }

        // ==========================
        // FACTUS
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















