package Gestion.demo.factus.service;

import Gestion.demo.factus.client.FactusApiClient;
import Gestion.demo.factus.dto.request.FactusFacturaRequestDTO;
import Gestion.demo.factus.dto.response.FactusFacturaResponseDTO;
import Gestion.demo.factus.mapper.FactusFacturaMapper;
import Gestion.demo.modelo.EstadoFacturaElectronica;
import Gestion.demo.modelo.Venta;
import Gestion.demo.repositorio.VentaRepositorio;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FactusFacturaService {

    private final FactusApiClient apiClient;
    private final FactusFacturaMapper mapper;
    private final VentaRepositorio ventaRepositorio;
    private final ObjectMapper objectMapper;

    public void emitirFacturaDesdeVenta(Venta venta) {

        log.warn(">>> ENVIANDO VENTA ID: {}", venta.getIdVenta());
        log.warn(">>> ESTADO ACTUAL: {}", venta.getEstadoElectronico());

        try {

            // 1️⃣ Mapear venta → request Factus
            FactusFacturaRequestDTO request = mapper.mapFromVenta(venta);

            // 🔥 Log del JSON enviado
            log.info("===== JSON ENVIADO A FACTUS =====");
            String requestJson = objectMapper
                    .writerWithDefaultPrettyPrinter()
                    .writeValueAsString(request);
            log.info("\n{}", requestJson);

            // 2️⃣ Enviar y recibir DTO directamente
            FactusFacturaResponseDTO response = apiClient.enviarFactura(request);

            // 3️⃣ VALIDAR RESPUESTA
            if (response != null
                    && "Created".equalsIgnoreCase(response.getStatus())
                    && response.getData() != null
                    && response.getData().getBill() != null) {

                var bill = response.getData().getBill();

                venta.setEstadoElectronico(EstadoFacturaElectronica.VALIDADA);
                venta.setPublicUrl(bill.getPublicUrl());
                venta.setNumeroFacturaElectronica(bill.getNumber());
                venta.setCufe(bill.getCufe());
                venta.setQr(bill.getQr());
                venta.setBillId(bill.getBillId());
                venta.setMensajeFactus("Factura validada correctamente");
                venta.setFechaValidacion(
                        java.util.Date.from(
                                java.time.LocalDateTime.now()
                                        .atZone(java.time.ZoneId.systemDefault())
                                        .toInstant()
                        )
                );

                venta.setErrorFactus(null);

                log.info("Factura VALIDADA. Número: {}", bill.getNumber());

            } else {

                venta.setEstadoElectronico(EstadoFacturaElectronica.ERROR);
                venta.setErrorFactus(
                        response != null && response.getMessage() != null
                                ? response.getMessage()
                                : "Respuesta inválida de Factus"
                );

                log.error("Factura ERROR. Mensaje: {}", venta.getErrorFactus());
            }

            ventaRepositorio.save(venta);

        } catch (Exception e) {

            log.error("ERROR ENVIANDO FACTURA A FACTUS", e);

            venta.setEstadoElectronico(EstadoFacturaElectronica.ERROR);
            venta.setErrorFactus(e.getMessage());
            ventaRepositorio.save(venta);
        }
    }

    public void reintentarEnvio(Integer ventaId) {

        Venta venta = ventaRepositorio.findById(ventaId)
                .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

        if (venta.getEstadoElectronico() == EstadoFacturaElectronica.VALIDADA) {
            throw new RuntimeException("La factura ya está validada");
        }

        log.warn(">>> REINTENTANDO ENVÍO VENTA ID: {}", ventaId);

        emitirFacturaDesdeVenta(venta);
    }
}






