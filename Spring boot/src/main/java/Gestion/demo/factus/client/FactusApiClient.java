package Gestion.demo.factus.client;

import Gestion.demo.factus.config.FactusProperties;
import Gestion.demo.factus.dto.request.FactusFacturaRequestDTO;
import Gestion.demo.factus.dto.request.FactusNotaCreditoRequestDTO;
import Gestion.demo.factus.dto.response.FactusFacturaResponseDTO;
import Gestion.demo.factus.dto.response.FactusNotaCreditoResponseDTO;
import Gestion.demo.factus.service.FactusAuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class FactusApiClient {

    private final RestTemplate restTemplate;
    private final FactusAuthService authService;
    private final FactusProperties properties;
    private final ObjectMapper objectMapper;

    public FactusFacturaResponseDTO enviarFactura(FactusFacturaRequestDTO request) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(authService.getAccessToken());

        log.warn("TOKEN USADO: {}", authService.getAccessToken());

        HttpEntity<FactusFacturaRequestDTO> entity =
                new HttpEntity<>(request, headers);

        String url = properties.getUrl() + "/v1/bills/validate";

        log.warn("URL FACTUS: {}", url);

        try {

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            log.info("STATUS FACTUS: {}", response.getStatusCode());

            String rawResponse = response.getBody();

            log.info("===== RAW RESPONSE FACTUS =====");
            log.info(rawResponse);

            // 🔥 Convertir aquí (NO en el service)
            FactusFacturaResponseDTO dto =
                    objectMapper.readValue(rawResponse, FactusFacturaResponseDTO.class);

            log.info("===== RESPONSE MAPEADA =====");
            log.info(objectMapper
                    .writerWithDefaultPrettyPrinter()
                    .writeValueAsString(dto));

            return dto;

        } catch (HttpStatusCodeException e) {

            log.error("ERROR HTTP FACTUS");
            log.error("Status: {}", e.getStatusCode());
            log.error("Body: {}", e.getResponseBodyAsString());

            throw e;
        } catch (Exception e) {
            log.error("ERROR PARSEANDO RESPUESTA FACTUS", e);
            throw new RuntimeException("Error procesando respuesta de Factus", e);
        }
    }


    // Dentro de FactusApiClient.java

    public FactusNotaCreditoResponseDTO enviarNotaCredito(FactusNotaCreditoRequestDTO request) {
        // --- NUEVO: INSPECCIÓN DEL REQUEST (LO QUE ENVÍAS) ---
        try {
            log.info(">>>>>>>>>> ENVIANDO PETICIÓN A FACTUS >>>>>>>>>>");
            String jsonRequest = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(request);
            System.out.println(jsonRequest);
            log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        } catch (Exception e) {
            log.warn("No se pudo imprimir el JSON del request: {}", e.getMessage());
        }


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(authService.getAccessToken());

        HttpEntity<FactusNotaCreditoRequestDTO> entity = new HttpEntity<>(request, headers);
        String url = properties.getUrl() + "/v1/credit-notes/validate";

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            String rawResponse = response.getBody();


            // --- INICIO CÓDIGO TEMPORAL DE INSPECCIÓN ---
            log.info("#######################################################");
            log.info("DEBUG: RESPUESTA CRUDA DE FACTUS (NOTA CRÉDITO):");

            // Esto convierte el String a un Objeto genérico y luego a un JSON ordenado para leerlo fácil
            Object jsonObject = objectMapper.readValue(rawResponse, Object.class);
            String prettyJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);

            System.out.println(prettyJson); // Imprime directo a consola con colores/formato si tu IDE lo soporta
            log.info("#######################################################");
            // --- FIN CÓDIGO TEMPORAL ---


            log.info("===== RAW RESPONSE NOTA CREDITO =====");
            log.info(rawResponse);

            return objectMapper.readValue(rawResponse, FactusNotaCreditoResponseDTO.class);

        } catch (HttpStatusCodeException e) {
            log.error("ERROR HTTP NOTA CREDITO: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw e;
        } catch (Exception e) {
            log.error("ERROR PARSEANDO NOTA CREDITO", e);
            throw new RuntimeException("Error en comunicación con Factus", e);
        }
    }
}





