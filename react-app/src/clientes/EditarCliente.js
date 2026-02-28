import api from "../api/axiosConfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useOutletContext } from "react-router-dom";

export default function EditarCliente() {
  const navegacion = useNavigate();
  const { id } = useParams();
  const { darkMode } = useOutletContext();

  const [cliente, setCliente] = useState({
    nombre: "", documento: "", dv: "", telefono: "",
    direccion: "", email: "", identificationDocumentId: "",
    legalOrganizationId: "", tributeId: "", municipioId: ""
  });

  const [municipios, setMunicipios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");

  const {
    nombre, documento, dv, telefono, direccion,
    email, identificationDocumentId, legalOrganizationId,
    tributeId, municipioId
  } = cliente;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const responseMunicipios = await api.get("/gestion-app/municipios");
        const municipiosOrdenados = responseMunicipios.data.sort((a, b) => a.name.localeCompare(b.name));
        setMunicipios(municipiosOrdenados);

        const departamentosUnicos = [...new Set(municipiosOrdenados.map((m) => m.department))].sort();
        setDepartamentos(departamentosUnicos);

        const responseCliente = await api.get(`/gestion-app/clientes/${id}`);
        const data = responseCliente.data;

        setCliente({
          nombre: data.nombre || "",
          documento: data.documento || "",
          dv: data.dv || "",
          telefono: data.telefono || "",
          direccion: data.direccion || "",
          email: data.email || "",
          identificationDocumentId: data.identificationDocumentId?.toString() || "",
          legalOrganizationId: data.legalOrganizationId?.toString() || "",
          tributeId: data.tributeId?.toString() || "",
          municipioId: data.municipioId?.toString() || ""
        });

        setDepartamentoSeleccionado(data.departamento || "");
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    };
    cargarDatos();
  }, [id]);

  const onInputChange = (e) => setCliente({ ...cliente, [e.target.name]: e.target.value });

  const onDepartamentoChange = (e) => {
    const departamento = e.target.value;
    setDepartamentoSeleccionado(departamento);
    setCliente({ ...cliente, municipioId: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/gestion-app/clientes/${id}`, {
        ...cliente,
        identificationDocumentId: Number(cliente.identificationDocumentId),
        legalOrganizationId: Number(cliente.legalOrganizationId),
        tributeId: Number(cliente.tributeId),
        municipioId: Number(cliente.municipioId)
      });
      navegacion("/clientes/listar");
    } catch (error) {
      alert("Ocurrió un error al actualizar");
    }
  };

  const labelClass = `form-label small fw-bold ${darkMode ? 'text-info opacity-75' : 'text-muted'}`;

  return (
    <div className="container-fluid py-4 px-md-5">
      <div className="row justify-content-center">
        <div className="col-12">
          
          <Link to="/clientes/listar" className={`text-decoration-none small mb-4 d-inline-flex align-items-center fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>
            <i className="bi bi-chevron-left me-1"></i> Volver sin guardar
          </Link>

          <div className="card shadow-sm rounded-4 overflow-hidden border-0 bg-body-tertiary">
            {/* Header con acento warning sutil */}
            <div className="card-header py-4 px-4 border-bottom border-opacity-10 bg-transparent">
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 p-3 rounded-4 me-3">
                  <i className="bi bi-pencil-square text-warning fs-2"></i>
                </div>
                <div>
                  <h3 className="mb-0 fw-bolder text-body">Actualizar Cliente</h3>
                  <p className="text-muted small mb-0">Modificando registro ID: <span className="fw-bold">{id}</span></p>
                </div>
              </div>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={onSubmit}>
                
                {/* Paso 1 */}
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <span className="badge bg-warning text-dark rounded-pill me-2 px-3">Fiscal</span>
                    <h6 className="text-uppercase fw-bolder small mb-0 tracking-wider text-body opacity-75">Datos de Identificación</h6>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6 col-lg-4">
                      <label className={labelClass}>Tipo de Organización</label>
                      <select className="form-select" name="legalOrganizationId" value={legalOrganizationId} onChange={onInputChange} required>
                        <option value="">Seleccione...</option>
                        <option value="2">Persona Natural</option>
                        <option value="1">Persona Jurídica</option>
                      </select>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <label className={labelClass}>Régimen / Tributo</label>
                      <select className="form-select" name="tributeId" value={tributeId} onChange={onInputChange} required>
                        <option value="">Seleccione...</option>
                        <option value="18">IVA</option>
                        <option value="21">No responsable de IVA</option>
                      </select>
                    </div>
                    <div className="col-lg-4">
                      <label className={labelClass}>Tipo Documento</label>
                      <select className="form-select" name="identificationDocumentId" value={identificationDocumentId} onChange={onInputChange} required>
                        <option value="">Seleccione...</option>
                        <option value="1">Cédula de Ciudadanía</option>
                        <option value="2">NIT</option>
                        <option value="3">Cédula de Extranjería</option>
                      </select>
                    </div>
                    <div className="col-md-12">
                      <label className={labelClass}>Nombre Completo o Razón Social</label>
                      <input type="text" className="form-control" name="nombre" required value={nombre} onChange={onInputChange} />
                    </div>
                    <div className="col-md-9">
                      <label className={labelClass}>Número de Documento</label>
                      <input type="text" className="form-control" name="documento" value={documento} onChange={onInputChange} />
                    </div>
                    <div className="col-md-3">
                      <label className={labelClass}>DV</label>
                      <input type="text" className="form-control text-center fw-bold" name="dv" value={dv} onChange={onInputChange} maxLength="1" />
                    </div>
                  </div>
                </div>

                {/* Paso 2 */}
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-4">
                    <span className="badge bg-warning text-dark rounded-pill me-2 px-3">Contacto</span>
                    <h6 className="text-uppercase fw-bolder small mb-0 tracking-wider text-body opacity-75">Localización</h6>
                  </div>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className={labelClass}>Departamento</label>
                      <select className="form-select" value={departamentoSeleccionado} onChange={onDepartamentoChange} required>
                        <option value="">Seleccione...</option>
                        {departamentos.map((dep, index) => (
                          <option key={index} value={dep}>{dep}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className={labelClass}>Municipio</label>
                      <select className="form-select" name="municipioId" value={municipioId} onChange={onInputChange} required disabled={!departamentoSeleccionado}>
                        <option value="">Seleccione municipio...</option>
                        {municipios.filter((m) => m.department === departamentoSeleccionado).map((m) => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className={labelClass}>Dirección Fiscal</label>
                      <input type="text" className="form-control" name="direccion" value={direccion} onChange={onInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className={labelClass}>Correo Electrónico</label>
                      <input type="email" className="form-control" name="email" value={email} onChange={onInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className={labelClass}>Teléfono</label>
                      <input type="text" className="form-control" name="telefono" value={telefono} onChange={onInputChange} />
                    </div>
                  </div>
                </div>

                {/* Acciones Footer */}
                <div className={`mt-5 p-4 rounded-4 d-flex justify-content-end align-items-center gap-3 ${darkMode ? 'bg-black bg-opacity-20' : 'bg-body'}`}>
                  <Link to="/clientes/listar" className={`text-decoration-none fw-bold me-2 ${darkMode ? 'text-light opacity-50' : 'text-muted'}`}>
                    Descartar cambios
                  </Link>
                  <button type="submit" className="btn btn-warning px-5 py-2 shadow-sm fw-bold rounded-3 text-dark">
                    <i className="bi bi-save2-fill me-2"></i>
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

