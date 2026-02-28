package Gestion.demo.factus.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class UnidadResponse {


    private String status;
    private String message;
    private List<UnidadData> data;

    @Data
    public static class UnidadData {
        private Integer id;
        private String code;
        private String name;

    }

}
