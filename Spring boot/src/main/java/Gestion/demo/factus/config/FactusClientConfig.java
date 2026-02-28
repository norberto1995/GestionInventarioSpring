package Gestion.demo.factus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class FactusClientConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

