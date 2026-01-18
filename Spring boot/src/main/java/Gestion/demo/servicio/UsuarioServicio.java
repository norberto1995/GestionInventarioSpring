package Gestion.demo.servicio;

import Gestion.demo.dto.UsuarioRequestDTO;
import Gestion.demo.dto.UsuarioUpdateDTO;
import Gestion.demo.modelo.Usuario;

import java.util.List;

public interface UsuarioServicio {

    Usuario crearUsuario(UsuarioRequestDTO dto);

    Usuario actualizarUsuario(Long id, UsuarioUpdateDTO dto);

    void eliminarUsuario(Long id);

    Usuario buscarPorUsername(String username);

    Usuario buscarPorId(Long id);

    List<Usuario> listarUsuarios();
}



