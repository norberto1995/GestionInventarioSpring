package Gestion.demo.servicio;

import Gestion.demo.dto.ClienteRequestDTO;
import Gestion.demo.dto.ClienteResponseDTO;

import java.util.List;

public interface ClienteServicio {

    List<ClienteResponseDTO> listarClientes();

    ClienteResponseDTO buscarClientePorId(Integer id);

    ClienteResponseDTO guardarCliente(ClienteRequestDTO dto);

    ClienteResponseDTO actualizarCliente(Integer id, ClienteRequestDTO dto);

    void eliminarCliente(Integer id);
}
