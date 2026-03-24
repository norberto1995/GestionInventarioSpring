package Gestion.demo.servicio;

import Gestion.demo.dto.AbonoDTO;
import Gestion.demo.modelo.Abono;
import Gestion.demo.modelo.Venta;
import Gestion.demo.repositorio.AbonoRepositorio;
import Gestion.demo.repositorio.VentaRepositorio;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AbonoServicioImpl implements AbonoServicio {

    private final AbonoRepositorio abonoRepo;
    private final VentaRepositorio ventaRepo;

    @Override
    @Transactional
    public Abono registrarAbono(AbonoDTO dto) {

        Venta venta = ventaRepo.findById(dto.getVentaId())
                .orElseThrow(() -> new RuntimeException("Venta no existe"));

        // ==========================
        // VALIDACIONES
        // ==========================

        if (dto.getMonto() == null || dto.getMonto() <= 0) {
            throw new RuntimeException("El monto debe ser mayor a 0");
        }

        if (dto.getRecibido() == null || dto.getRecibido() <= 0) {
            throw new RuntimeException("El valor recibido debe ser mayor a 0");
        }

        if (dto.getRecibido() < dto.getMonto()) {
            throw new RuntimeException("El valor recibido no puede ser menor al monto");
        }

        // ==========================
        // CALCULAR DEUDA ACTUAL
        // ==========================

        List<Abono> abonos = abonoRepo.findByVenta_IdVenta(venta.getIdVenta());

        double totalPagado = abonos.stream()
                .mapToDouble(a -> a.getMonto())
                .sum();

        double deuda = venta.getTotal() - totalPagado;

        if (dto.getMonto() > deuda) {
            throw new RuntimeException("El abono supera la deuda pendiente");
        }

        // ==========================
        // CREAR ABONO
        // ==========================

        double cambio = dto.getRecibido() - dto.getMonto();

        Abono abono = new Abono();
        abono.setVenta(venta);
        abono.setMonto(dto.getMonto());
        abono.setRecibido(dto.getRecibido());
        abono.setCambio(cambio);
        abono.setMetodoPago(dto.getMetodoPago());
        abono.setFecha(new Date());

        return abonoRepo.save(abono);
    }

    @Override
    public List<Abono> listarPorVenta(Integer ventaId) {
        return abonoRepo.findByVenta_IdVenta(ventaId);
    }
}