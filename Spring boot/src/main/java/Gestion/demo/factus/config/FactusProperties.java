package Gestion.demo.factus.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "factus")
@Data
public class FactusProperties {

    private String url;
    private String clientId;
    private String clientSecret;
    private String username;
    private String password;
}

