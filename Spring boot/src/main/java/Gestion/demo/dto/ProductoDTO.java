package Gestion.demo.dto;

import lombok.Data;

@Data
public class ProductoDTO {

    private String codigo;
    private String nombre;
    private String descripcion;
    private Double precioCompra;
    private Double precioVenta;
    private Double iva;
    private Integer stockActual;
    private Integer stockMinimo;

    private Integer unitMeasureId;
    private Integer tributeId;
    private Integer standardCodeId;
}
