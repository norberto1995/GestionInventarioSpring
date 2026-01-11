package Gestion.demo.servicio;

import Gestion.demo.modelo.Cliente;

import java.util.List;

public interface ClienteServicio {

    List<Cliente> listarClientes();
    Cliente buscarClientePorId(Integer idCliente);
    Cliente guardarCliente(Cliente cliente);
    void eliminarCliente(Cliente cliente);
    Object buscarPorCriterioSeleccionado(String tipo, String valor);
}
