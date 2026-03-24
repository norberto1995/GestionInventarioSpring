package Gestion.demo.controlador;

import Gestion.demo.dto.UsuarioRequestDTO;
import Gestion.demo.dto.UsuarioUpdateDTO;
import Gestion.demo.modelo.Usuario;
import Gestion.demo.servicio.UsuarioServicio;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioControlador {

    private final UsuarioServicio usuarioServicio;

    public UsuarioControlador(UsuarioServicio usuarioServicio) {
        this.usuarioServicio = usuarioServicio;
    }

    // 🔐 CREAR USUARIO (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Usuario crearUsuario(@RequestBody UsuarioRequestDTO dto) {
        return usuarioServicio.crearUsuario(dto);
    }

    // 🔐 LISTAR USUARIOS (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioServicio.listarUsuarios();
    }

    // 🔐 OBTENER USUARIO POR ID (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public Usuario obtenerPorId(@PathVariable Integer id) {
        return usuarioServicio.buscarPorId(id);
    }

    // 🔐 EDITAR USUARIO (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(
            @PathVariable Integer id,
            @RequestBody UsuarioUpdateDTO dto
    ) {
        return usuarioServicio.actualizarUsuario(id, dto);
    }

    // 🔐 ELIMINAR USUARIO (ADMIN)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Integer id) {
        usuarioServicio.eliminarUsuario(id);
    }
}


