package Gestion.demo.seguridad;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    // ⚠️ MINIMO 32 CARACTERES
    private static final String SECRET =
            "clave_super_secreta_de_32_caracteres_minimo";

    // ⏱ 10 horas
    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 10;

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // =========================
    // GENERAR TOKEN
    // =========================
    public String generarToken(String username, String rol) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "ROLE_" + rol); // 🔥 IMPORTANTE

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME)
                )
                .signWith(key) // ✅ AQUÍ ESTABA EL ERROR
                .compact();
    }

    // =========================
    // OBTENER USERNAME
    // =========================
    public String obtenerUsername(String token) {
        return obtenerClaims(token).getSubject();
    }

    // =========================
    // VALIDAR TOKEN
    // =========================
    public boolean validarToken(String token, UserDetails userDetails) {
        String username = obtenerUsername(token);
        return username.equals(userDetails.getUsername())
                && !tokenExpirado(token);
    }

    // =========================
    // MÉTODOS PRIVADOS
    // =========================
    private boolean tokenExpirado(String token) {
        return obtenerClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private Claims obtenerClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}




