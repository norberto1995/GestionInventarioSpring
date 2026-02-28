package Gestion.demo;

import Gestion.demo.factus.service.FactusAuthService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import Gestion.demo.modelo.Rol;
import Gestion.demo.modelo.Usuario;
import Gestion.demo.servicio.UsuarioServicio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class GiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GiApplication.class, args);
	}




}
