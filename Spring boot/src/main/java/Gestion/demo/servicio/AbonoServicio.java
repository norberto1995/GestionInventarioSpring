package Gestion.demo.servicio;

import Gestion.demo.dto.AbonoDTO;
import Gestion.demo.modelo.Abono;

import java.util.List;

public interface AbonoServicio {

    Abono registrarAbono(AbonoDTO dto);

    List<Abono> listarPorVenta(Integer ventaId);
}