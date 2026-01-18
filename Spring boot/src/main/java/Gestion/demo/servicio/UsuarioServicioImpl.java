package Gestion.demo.servicio;

import Gestion.demo.dto.UsuarioRequestDTO;
import Gestion.demo.dto.UsuarioUpdateDTO;
import Gestion.demo.modelo.Rol;
import Gestion.demo.modelo.Usuario;
import Gestion.demo.repositorio.UsuarioRepositorio;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServicioImpl implements UsuarioServicio {

    private final UsuarioRepositorio usuarioRepo;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServicioImpl(UsuarioRepositorio usuarioRepo,
                               PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Usuario crearUsuario(UsuarioRequestDTO dto) {

        Usuario usuario = new Usuario();
        usuario.setUsername(dto.getUsername());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuario.setRol(Rol.valueOf(dto.getRol()));
        usuario.setActivo(true);

        return usuarioRepo.save(usuario);
    }

    @Override
    public Usuario actualizarUsuario(Long id, UsuarioUpdateDTO dto) {

        Usuario usuario = buscarPorId(id);

        usuario.setRol(Rol.valueOf(dto.getRol()));
        usuario.setActivo(dto.getActivo());

        return usuarioRepo.save(usuario);
    }

    @Override
    public void eliminarUsuario(Long id) {
        usuarioRepo.deleteById(id);
    }

    @Override
    public Usuario buscarPorUsername(String username) {
        return usuarioRepo.findByUsername(username).orElse(null);
    }

    @Override
    public Usuario buscarPorId(Long id) {
        return usuarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepo.findAll();
    }
}


