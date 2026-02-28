package Gestion.demo.factus.dto.response;

import lombok.Data;
import java.util.List;

@Data
public class MunicipalityResponse {

    private String status;
    private String message;
    private List<MunicipalityData> data;

    @Data
    public static class MunicipalityData {
        private Integer id;
        private String code;
        private String name;
        private String department;
    }
}