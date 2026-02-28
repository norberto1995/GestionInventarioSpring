package Gestion.demo.factus.service;

import Gestion.demo.factus.config.FactusProperties;
import Gestion.demo.factus.dto.auth.FactusPasswordAuthRequestDTO;
import Gestion.demo.factus.dto.auth.FactusAuthResponseDTO;
import Gestion.demo.factus.dto.auth.FactusRefreshAuthRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FactusAuthService {

    private final RestTemplate restTemplate;
    private final FactusProperties properties;

    private String accessToken;
    private String refreshToken;
    private Instant expiresAt;

    public synchronized String getAccessToken() {

        // 1️⃣ Si el token sigue vigente
        if (accessToken != null && expiresAt != null && expiresAt.isAfter(Instant.now())) {
            return accessToken;
        }

        // 2️⃣ Si expiró pero tengo refresh token
        if (refreshToken != null) {
            try {
                return refreshAccessToken();
            } catch (Exception e) {
                System.out.println("Error refrescando token, se hará login completo...");
            }
        }

        // 3️⃣ Si no hay refresh o falló
        return authenticate();
    }

    private String authenticate() {

        FactusPasswordAuthRequestDTO request = new FactusPasswordAuthRequestDTO();
        request.setClient_id(properties.getClientId());
        request.setClient_secret(properties.getClientSecret());
        request.setUsername(properties.getUsername());
        request.setPassword(properties.getPassword());

        FactusAuthResponseDTO response =
                restTemplate.postForObject(
                        properties.getUrl() + "/oauth/token",
                        request,
                        FactusAuthResponseDTO.class
                );

        saveTokens(response);

        System.out.println("Login completo - nuevo token generado");

        return accessToken;
    }

    private String refreshAccessToken() {

        FactusRefreshAuthRequestDTO request = new FactusRefreshAuthRequestDTO();
        request.setClient_id(properties.getClientId());
        request.setClient_secret(properties.getClientSecret());
        request.setRefresh_token(refreshToken);

        FactusAuthResponseDTO response =
                restTemplate.postForObject(
                        properties.getUrl() + "/oauth/token",
                        request,
                        FactusAuthResponseDTO.class
                );

        saveTokens(response);

        System.out.println("Token refrescado correctamente");

        return accessToken;
    }

    private void saveTokens(FactusAuthResponseDTO response) {
        this.accessToken = response.getAccess_token();
        this.refreshToken = response.getRefresh_token();
        this.expiresAt = Instant.now().plusSeconds(response.getExpires_in() - 60);
    }
}



