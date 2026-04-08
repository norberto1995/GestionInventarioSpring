package Gestion.demo.servicio;

import Gestion.demo.dto.NotaCreditoRequestDTO;
import Gestion.demo.modelo.NotaCredito;

import java.util.List;

public interface NotaCreditoServicio {

    // 🔥 Crear nota crédito
    NotaCredito crearNotaCredito(NotaCreditoRequestDTO dto);

    // 📋 Listar todas
    List<NotaCredito> listarNotasCredito();

    // 🔍 Buscar por ID
    NotaCredito buscarPorId(Integer idNotaCredito);

    // 🔍 Buscar por venta (MUY IMPORTANTE)
    List<NotaCredito> buscarPorVenta(Integer ventaId);
}