package Gestion.demo.servicio;

import Gestion.demo.dto.ClienteRequestDTO;
import Gestion.demo.dto.ClienteResponseDTO;
import Gestion.demo.modelo.Cliente;
import Gestion.demo.modelo.Municipio;
import Gestion.demo.repositorio.ClienteRepositorio;
import Gestion.demo.repositorio.MunicipioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClienteServicioImpl implements ClienteServicio {

    private final ClienteRepositorio clienteRepositorio;
    private final MunicipioRepositorio municipioRepositorio;

    @Override
    public List<ClienteResponseDTO> listarClientes() {
        return clienteRepositorio.findAll()
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ClienteResponseDTO buscarClientePorId(Integer id) {
        Cliente cliente = clienteRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        return convertirAResponse(cliente);
    }

    @Override
    public ClienteResponseDTO guardarCliente(ClienteRequestDTO dto) {
        System.out.println("Municipio ID recibido: " + dto.getMunicipioId());
        Municipio municipio = municipioRepositorio.findById(dto.getMunicipioId())
                .orElseThrow(() -> new RuntimeException("Municipio no encontrado"));

        Cliente cliente = new Cliente();
        mapearRequestAEntidad(dto, cliente);
        cliente.setMunicipio(municipio);

        Cliente guardado = clienteRepositorio.save(cliente);

        return convertirAResponse(guardado);
    }

    @Override
    public ClienteResponseDTO actualizarCliente(Integer id, ClienteRequestDTO dto) {

        Cliente cliente = clienteRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Municipio municipio = municipioRepositorio.findById(dto.getMunicipioId())
                .orElseThrow(() -> new RuntimeException("Municipio no encontrado"));

        mapearRequestAEntidad(dto, cliente);
        cliente.setMunicipio(municipio);

        Cliente actualizado = clienteRepositorio.save(cliente);

        return convertirAResponse(actualizado);
    }

    @Override
    public void eliminarCliente(Integer id) {

        Cliente cliente = clienteRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        clienteRepositorio.delete(cliente);
    }

    // 🔥 MÉTODOS PRIVADOS DE MAPEO

    private void mapearRequestAEntidad(ClienteRequestDTO dto, Cliente cliente) {
        cliente.setNombre(dto.getNombre());
        cliente.setDocumento(dto.getDocumento());
        cliente.setTelefono(dto.getTelefono());
        cliente.setEmail(dto.getEmail());
        cliente.setDireccion(dto.getDireccion());
        cliente.setDv(dto.getDv());
        cliente.setIdentificationDocumentId(dto.getIdentificationDocumentId());
        cliente.setLegalOrganizationId(dto.getLegalOrganizationId());
        cliente.setTributeId(dto.getTributeId());
    }

    private ClienteResponseDTO convertirAResponse(Cliente cliente) {

        ClienteResponseDTO dto = new ClienteResponseDTO();

        dto.setIdCliente(cliente.getIdCliente());
        dto.setNombre(cliente.getNombre());
        dto.setDocumento(cliente.getDocumento());
        dto.setTelefono(cliente.getTelefono());
        dto.setEmail(cliente.getEmail());
        dto.setDireccion(cliente.getDireccion());
        dto.setDv(cliente.getDv());
        dto.setIdentificationDocumentId(cliente.getIdentificationDocumentId());
        dto.setLegalOrganizationId(cliente.getLegalOrganizationId());
        dto.setTributeId(cliente.getTributeId());

        dto.setMunicipioId(cliente.getMunicipio().getId());
        dto.setMunicipioNombre(cliente.getMunicipio().getName());
        dto.setDepartamento(cliente.getMunicipio().getDepartment());

        return dto;
    }
}
