package Gestion.demo.servicio;

import Gestion.demo.modelo.UnidadMedida;
import Gestion.demo.repositorio.UnidadMedidaRepositorio;
import Gestion.demo.servicio.UnidadMedidaServicio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnidadMedidaServicioImpl implements UnidadMedidaServicio {

    private final UnidadMedidaRepositorio unidadRepositorio;

    public UnidadMedidaServicioImpl(UnidadMedidaRepositorio unidadRepositorio) {
        this.unidadRepositorio = unidadRepositorio;
    }

    @Override
    public List<UnidadMedida> listarUnidades() {
        return unidadRepositorio.findAll();
    }

    @Override
    public void guardarTodos(List<UnidadMedida> unidades) {
        unidadRepositorio.saveAll(unidades);
    }
}
