package Gestion.demo.factus.service;

import Gestion.demo.factus.config.FactusProperties;
import Gestion.demo.factus.dto.response.MunicipalityResponse;
import Gestion.demo.factus.dto.response.UnidadResponse;
import Gestion.demo.modelo.Municipio;

import Gestion.demo.modelo.UnidadMedida;
import Gestion.demo.repositorio.UnidadMedidaRepositorio;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UnidadSyncService {

    private final RestTemplate restTemplate;
    private final UnidadMedidaRepositorio unidadMedidaRepositorio;
    private final FactusProperties properties;
    private final FactusAuthService authService;

    public UnidadSyncService(RestTemplate restTemplate, UnidadMedidaRepositorio unidadMedidaRepositorio, FactusProperties properties, FactusAuthService authService) {
        this.restTemplate = restTemplate;
        this.unidadMedidaRepositorio = unidadMedidaRepositorio;
        this.properties = properties;
        this.authService = authService;
    }


    public void sincronizarUnidades() {

        String url = properties.getUrl() + "/v1/measurement-units?name=";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + authService.getAccessToken());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<UnidadResponse> response =
                restTemplate.exchange(url,
                        HttpMethod.GET,
                        entity,
                        UnidadResponse.class);

        if (response.getBody() != null) {

            response.getBody().getData().forEach(dto -> {

                UnidadMedida UnidadMedida = new UnidadMedida();
                UnidadMedida.setId(dto.getId());
                UnidadMedida.setCode(dto.getCode());
                UnidadMedida.setName(dto.getName());



                unidadMedidaRepositorio.save(UnidadMedida);
            });
        }
    }
}
