package Gestion.demo.servicio;

import Gestion.demo.modelo.Municipio;
import java.util.List;

public interface MunicipioServicio {

    List<Municipio> listarMunicipios();

    Municipio guardarMunicipio(Municipio municipio);

    void guardarTodos(List<Municipio> municipios);
}
