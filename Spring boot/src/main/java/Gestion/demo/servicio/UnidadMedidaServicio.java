package Gestion.demo.servicio;

import Gestion.demo.modelo.UnidadMedida;
import java.util.List;

public interface UnidadMedidaServicio {

    List<UnidadMedida> listarUnidades();

    void guardarTodos(List<UnidadMedida> unidades);
}