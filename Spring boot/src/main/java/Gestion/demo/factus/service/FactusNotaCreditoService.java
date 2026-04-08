package Gestion.demo.factus.service;

import Gestion.demo.factus.client.FactusApiClient;
import Gestion.demo.factus.dto.request.FactusNotaCreditoRequestDTO;
import Gestion.demo.factus.dto.response.FactusFacturaResponseDTO;
import Gestion.demo.factus.dto.response.FactusNotaCreditoResponseDTO;
import Gestion.demo.factus.mapper.FactusNotaCreditoMapper;
import Gestion.demo.modelo.EstadoFacturaElectronica;
import Gestion.demo.modelo.NotaCredito;
import Gestion.demo.repositorio.NotaCreditoRepositorio;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class FactusNotaCreditoService {

    private final FactusApiClient apiClient;
    private final FactusNotaCreditoMapper mapper;
    private final NotaCreditoRepositorio notaCreditoRepositorio;
    private final ObjectMapper objectMapper;

    public void emitirNotaCredito(NotaCredito nota) {
        try {
            // 1. Mapear
            FactusNotaCreditoRequestDTO request = mapper.mapFromNotaCredito(nota);

            // 2. Enviar (Ahora devuelve el DTO correcto)
            FactusNotaCreditoResponseDTO response = apiClient.enviarNotaCredito(request);

            // 3. Validar con la estructura de Nota de Crédito
            if (response != null && "Created".equalsIgnoreCase(response.getStatus())
                    && response.getData() != null
                    && response.getData().getCredit_note() != null) {

                var ncData = response.getData().getCredit_note();

                nota.setEstadoElectronico(EstadoFacturaElectronica.VALIDADA);
                nota.setNumeroNotaCredito(ncData.getNumber());
                // En notas de crédito Factus suele devolver 'cude' en lugar de 'cufe'
                nota.setCufe(ncData.getCude());
                nota.setMensajeFactus(response.getMessage());
                nota.setErrorFactus(null);
                nota.setPublic_url(ncData.getPublic_url());
                nota.setQr(ncData.getQr());

                log.info("NOTA CRÉDITO VALIDADA: {}", ncData.getNumber());
            } else {
                nota.setEstadoElectronico(EstadoFacturaElectronica.ERROR);
                nota.setErrorFactus(response != null ? response.getMessage() : "Error desconocido");
            }

        } catch (HttpStatusCodeException e) {
            manejarErrorFactus(nota, e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("ERROR GENERAL", e);
            nota.setEstadoElectronico(EstadoFacturaElectronica.ERROR);
            nota.setErrorFactus(e.getMessage());
        }
        notaCreditoRepositorio.save(nota);
    }

    private void manejarErrorFactus(NotaCredito nota, String errorBody) {
        try {
            // Importante: El error de Factus suele tener la misma estructura base
            FactusNotaCreditoResponseDTO response = objectMapper.readValue(errorBody, FactusNotaCreditoResponseDTO.class);
            nota.setErrorFactus(response.getMessage());
        } catch (Exception ex) {
            nota.setErrorFactus("Error técnico: " + errorBody);
        }
        nota.setEstadoElectronico(EstadoFacturaElectronica.ERROR);
    }
}