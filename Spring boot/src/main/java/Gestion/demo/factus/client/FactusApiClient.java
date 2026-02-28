package Gestion.demo.factus.client;

import Gestion.demo.factus.config.FactusProperties;
import Gestion.demo.factus.dto.request.FactusFacturaRequestDTO;
import Gestion.demo.factus.dto.response.FactusFacturaResponseDTO;
import Gestion.demo.factus.service.FactusAuthService;
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

    public String enviarFacturaRaw(FactusFacturaRequestDTO request) {

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
            return response.getBody();

        } catch (HttpStatusCodeException e) {

            log.error("ERROR HTTP FACTUS");
            log.error("Status: {}", e.getStatusCode());
            log.error("Body: {}", e.getResponseBodyAsString());

            throw e; // relanza para que el service lo maneje
        }
    }
}



