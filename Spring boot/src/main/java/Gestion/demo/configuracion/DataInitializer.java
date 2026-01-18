package Gestion.demo.configuracion;

import Gestion.demo.modelo.Rol;
import Gestion.demo.modelo.Usuario;
import Gestion.demo.repositorio.UsuarioRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepositorio usuarioRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepositorio usuarioRepo, PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificamos si el admin ya existe para no duplicarlo
        if (usuarioRepo.findByUsername("admin").isEmpty()) {

            Usuario admin = new Usuario();
            admin.setUsername("admin");
            // Usamos tu PasswordEncoder para que la clave sea compatible
            admin.setPassword(passwordEncoder.encode("1234"));
            // Usamos tu Enum Rol correctamente
            admin.setRol(Rol.ADMIN);
            admin.setActivo(true);

            usuarioRepo.save(admin);

            System.out.println("--------------------------------------");
            System.out.println("✅ USUARIO ADMIN CREADO AUTOMÁTICAMENTE");
            System.out.println("Username: admin | Password: 1234");
            System.out.println("--------------------------------------");
        }
    }
}