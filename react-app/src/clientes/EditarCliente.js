import api from "../api/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarCliente() {
  const navegacion = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState({
    nombre: "",
    documento: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const { nombre, documento, telefono, direccion, email } = cliente;

  useEffect(() => {
    const cargarCliente = async () => {
      const resultado = await api.get(`/gestion-app/clientes/${id}`);
      setCliente(resultado.data);
    };
    cargarCliente();
  }, [id]);

  const onInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/gestion-app/clientes/${id}`, cliente);
    navegacion("/clientes/listar");
  };

  return (
    <div className="container-fluid px-3 px-md-5">
      <div className="text-center my-4">
        <h2>Editar Cliente</h2>
      </div>

      <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={nombre}
            onChange={onInputChange}
            required
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
          <label className="form-label">Teléfono</label>
          <input
            type="number"
            className="form-control"
            name="telefono"
            value={telefono}
            onChange={onInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
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
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-3">
          <button type="submit" className="btn btn-primary btn-sm">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => navegacion("/clientes/listar")}
          >
            Regresar
          </button>
        </div>
      </form>
    </div>
  );
}


