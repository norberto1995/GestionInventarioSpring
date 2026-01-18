package Gestion.demo.controlador;

import Gestion.demo.dto.LoginRequestDTO;
import Gestion.demo.dto.LoginResponseDTO;
import Gestion.demo.seguridad.JwtUtil;
import Gestion.demo.servicio.UsuarioServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthControlador {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UsuarioServicio usuarioServicio;

    public AuthControlador(AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil,
                           UsuarioServicio usuarioServicio) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.usuarioServicio = usuarioServicio;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String rol = userDetails.getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        String token = jwtUtil.generarToken(
                userDetails.getUsername(),
                rol
        );

        return ResponseEntity.ok(new LoginResponseDTO(token, rol));

    }
}





