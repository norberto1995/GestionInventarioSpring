package Gestion.demo.servicio;

import Gestion.demo.modelo.Municipio;
import Gestion.demo.repositorio.MunicipioRepositorio;
import Gestion.demo.servicio.MunicipioServicio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MunicipioServicioImpl implements MunicipioServicio {

    private final MunicipioRepositorio municipioRepositorio;

    public MunicipioServicioImpl(MunicipioRepositorio municipioRepositorio) {
        this.municipioRepositorio = municipioRepositorio;
    }

    @Override
    public List<Municipio> listarMunicipios() {
        return municipioRepositorio.findAll();
    }

    @Override
    public Municipio guardarMunicipio(Municipio municipio) {
        return municipioRepositorio.save(municipio);
    }

    @Override
    public void guardarTodos(List<Municipio> municipios) {
        municipioRepositorio.saveAll(municipios);
    }
}