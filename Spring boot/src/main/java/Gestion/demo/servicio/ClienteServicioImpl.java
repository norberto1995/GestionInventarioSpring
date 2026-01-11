package Gestion.demo.servicio;

import Gestion.demo.modelo.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import Gestion.demo.repositorio.ClienteRepositorio;

import java.util.List;

@Service
public class ClienteServicioImpl implements ClienteServicio {

    @Autowired
    private ClienteRepositorio clienteRepositorio;
    @Override
    public List<Cliente> listarClientes() {
        return clienteRepositorio.findAll();
    }

    @Override
    public Cliente buscarClientePorId(Integer idCliente) {
        return clienteRepositorio.findById(idCliente).orElse(null);
    }

    @Override
    public Cliente guardarCliente(Cliente cliente) {
        return clienteRepositorio.save(cliente);
    }

    @Override
    public void eliminarCliente(Cliente cliente) {
         clienteRepositorio.delete(cliente);
    }

    @Override
    public Object buscarPorCriterioSeleccionado(String tipo, String valor) {
        switch (tipo.toLowerCase()) {
            case "id":
                return clienteRepositorio.findById(Integer.parseInt(valor))
                        .orElse(null);

            case "nombre":
                // Retorna lista porque varios clientes pueden tener el mismo nombre
                return clienteRepositorio.findByNombreContainingIgnoreCase(valor);

            case "documento":
                return clienteRepositorio.findByDocumento(valor)
                        .orElse(null);

            default:
                throw new IllegalArgumentException("Criterio de búsqueda no válido: " + tipo);
        }

    }


}
