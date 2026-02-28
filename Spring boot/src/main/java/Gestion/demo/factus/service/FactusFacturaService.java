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

import java.time.LocalDateTime;

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




            log.info("===== JSON ENVIADO A FACTUS =====");

            String requestJson = objectMapper
                    .writerWithDefaultPrettyPrinter()
                    .writeValueAsString(request);

            log.info("\n{}", requestJson);

            // 2️⃣ Enviar a Factus (RAW)
            String rawResponse = apiClient.enviarFacturaRaw(request);

            log.info("===== RAW RESPONSE FACTUS =====");
            log.info(rawResponse);

            // 3️⃣ Convertir manualmente a DTO correcto
            FactusFacturaResponseDTO response =
                    objectMapper.readValue(rawResponse, FactusFacturaResponseDTO.class);

            log.info("===== RESPONSE MAPEADA =====");
            log.info(objectMapper
                    .writerWithDefaultPrettyPrinter()
                    .writeValueAsString(response));

            // 4️⃣ VALIDAR RESPUESTA CORRECTAMENTE
            if ("Created".equalsIgnoreCase(response.getStatus())
                    && response.getData() != null
                    && response.getData().getBill() != null) {

                var bill = response.getData().getBill();

                venta.setEstadoElectronico(EstadoFacturaElectronica.VALIDADA);
                venta.setPublicUrl(bill.getPublicUrl());
                venta.setNumeroFacturaElectronica(bill.getNumber());
                venta.setCufe(bill.getCufe());
                venta.setQr(bill.getQr());
                venta.setFactusUuid(null); // Factus ya no devuelve uuid en esta estructura
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
                        response.getMessage() != null
                                ? response.getMessage()
                                : "Respuesta inválida de Factus: " + rawResponse
                );

                log.error("Factura ERROR. Mensaje: {}", venta.getErrorFactus());
            }

            ventaRepositorio.save(venta);

        } catch (Exception e) {

            log.error("ERROR ENVIANDO FACTURA A a FACTUS", e);

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






