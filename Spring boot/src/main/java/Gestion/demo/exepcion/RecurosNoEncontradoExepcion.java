package Gestion.demo.exepcion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class RecurosNoEncontradoExepcion extends RuntimeException{

    public RecurosNoEncontradoExepcion (String mensaje){
        super(mensaje);
    }
}
