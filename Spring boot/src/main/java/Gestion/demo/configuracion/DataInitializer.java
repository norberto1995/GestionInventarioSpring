package Gestion.demo.configuracion;

import Gestion.demo.factus.service.MunicipioSyncService;
import Gestion.demo.factus.service.UnidadSyncService;
import Gestion.demo.modelo.Rol;
import Gestion.demo.modelo.Usuario;
import Gestion.demo.repositorio.MunicipioRepositorio;
import Gestion.demo.repositorio.UnidadMedidaRepositorio;
import Gestion.demo.repositorio.UsuarioRepositorio;
import Gestion.demo.servicio.MunicipioServicioImpl;
import Gestion.demo.servicio.UnidadMedidaServicioImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepositorio usuarioRepo;
    private final PasswordEncoder passwordEncoder;
    private final MunicipioSyncService municipioSyncService;
    private final UnidadSyncService unidadSyncService;
    private final MunicipioRepositorio municipioRepositorio;
    private final UnidadMedidaRepositorio unidadMedidaRepositorio;

    public DataInitializer(UsuarioRepositorio usuarioRepo, PasswordEncoder passwordEncoder, MunicipioSyncService municipioSyncService, UnidadSyncService unidadSyncService, MunicipioRepositorio municipioRepositorio, UnidadMedidaRepositorio unidadMedidaRepositorio) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
        this.municipioSyncService = municipioSyncService;
        this.unidadSyncService = unidadSyncService;
        this.municipioRepositorio = municipioRepositorio;
        this.unidadMedidaRepositorio = unidadMedidaRepositorio;
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
            System.out.println("USUARIO ADMIN CREADO AUTOMÁTICAMENTE");
            System.out.println("Username: admin | Password: 1234");
            System.out.println("--------------------------------------");




        }

        if(municipioRepositorio.findById(1).isEmpty()){

            // ===============================
            // 2️⃣ Sincronizar municipios
            // ===============================
            municipioSyncService.sincronizarMunicipios();

            // ===============================
            // 3️⃣ Sincronizar unidades
            // ===============================
            unidadSyncService.sincronizarUnidades();

            System.out.println("Catálogos sincronizados correctamente.");
        }
    }
}