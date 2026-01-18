import api from "../api/axiosConfig";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarCliente() {
  let navegacion = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "",
    documento: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const { nombre, documento, telefono, direccion, email } = cliente;

  const onInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/gestion-app/clientes", cliente);
      navegacion("/clientes/listar");
    } catch (error) {
      alert("No tienes permisos o ocurrió un error");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid px-3 px-md-5">
      <div className="text-center my-3">
        <h2>Agregar Cliente</h2>
      </div>

      <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            required
            value={nombre}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Documento</label>
          <input
            type="text"
            className="form-control"
            name="documento"
            value={documento}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefono</label>
          <input
            type="number"
            className="form-control"
            name="telefono"
            value={telefono}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Direccion</label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            value={direccion}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
          <button type="submit" className="btn btn-primary btn-sm">
            Guardar
          </button>
          <a href="/clientes/listar" className="btn btn-danger btn-sm">
            Regresar
          </a>
        </div>
      </form>
    </div>
  );
}

