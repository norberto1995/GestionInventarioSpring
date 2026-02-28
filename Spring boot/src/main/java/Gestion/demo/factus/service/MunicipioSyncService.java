package Gestion.demo.factus.service;

import Gestion.demo.factus.config.FactusProperties;
import Gestion.demo.factus.dto.response.MunicipalityResponse;
import Gestion.demo.modelo.Municipio;
import Gestion.demo.repositorio.MunicipioRepositorio;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MunicipioSyncService {

    private final RestTemplate restTemplate;
    private final MunicipioRepositorio municipioRepositorio;
    private final FactusProperties properties;
    private final FactusAuthService authService;



    public MunicipioSyncService(RestTemplate restTemplate,
                                MunicipioRepositorio municipioRepositorio , FactusProperties properties, FactusAuthService authService) {
        this.restTemplate = restTemplate;
        this.municipioRepositorio = municipioRepositorio;
        this.properties = properties;
        this.authService = authService;
    }

    public void sincronizarMunicipios() {

        String url = properties.getUrl() + "/v1/municipalities?name=";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + authService.getAccessToken());

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<MunicipalityResponse> response =
                restTemplate.exchange(url,
                        HttpMethod.GET,
                        entity,
                        MunicipalityResponse.class);

        if (response.getBody() != null) {

            response.getBody().getData().forEach(dto -> {

                Municipio municipio = new Municipio();
                municipio.setId(dto.getId());
                municipio.setCode(dto.getCode());
                municipio.setName(dto.getName());
                municipio.setDepartment(dto.getDepartment());


                municipioRepositorio.save(municipio);
            });
        }
    }
}

