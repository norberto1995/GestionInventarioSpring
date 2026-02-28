import React, { useEffect, useState } from "react";
import { obtenerProductos, obtenerClientes } from "../Ventas/services/ventaService";
import api from "../api/axiosConfig"; // Para la llamada directa a ventas
import { useOutletContext } from "react-router-dom";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

export default function Dashboard() {
  const { darkMode } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVentas: 0,
    conteoClientes: 0,
    productosBajos: [],
    datosGrafica: []
  });

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      // Ejecutamos todas las peticiones en paralelo
      const [resProd, resCli, resVentas] = await Promise.all([
        obtenerProductos(),
        obtenerClientes(),
        api.get("/gestion-app/ventas") // Traemos historial de ventas
      ]);

      const productos = resProd.data;
      const clientes = resCli.data;
      const ventas = resVentas.data;

      // 1. Filtrar productos con stock bajo (ej: menos de 10 o según su stockMinimo)
      const bajos = productos.filter(p => p.stockActual <= (p.stockMinimo || 5)).slice(0, 5);

      // 2. Calcular total de ventas (Sumatoria de los totales de las facturas)
      const totalDinero = ventas.reduce((acc, v) => acc + (v.total || 0), 0);

      // 3. Formatear datos para la gráfica (Agrupar ventas por fecha)
      // Agrupamos las últimas ventas para mostrar tendencia
      const ultimasVentas = ventas.slice(-7).map(v => ({
        name: v.fecha ? v.fecha.split('T')[0] : 'Venta', // Ajustar según formato de tu fecha
        monto: v.total
      }));

      setStats({
        totalVentas: totalDinero,
        conteoClientes: clientes.length,
        productosBajos: bajos,
        datosGrafica: ultimasVentas
      });
    } catch (error) {
      console.error("Error cargando dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (val) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(val);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className={`container-fluid p-4 animate__animated animate__fadeIn ${darkMode ? 'text-white' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bolder mb-1">Panel de Control</h2>
          <p className="text-muted small">Resumen en tiempo real de tu sistema</p>
        </div>
        <button className="btn btn-sm btn-outline-primary rounded-3" onClick={cargarEstadisticas}>
          <i className="bi bi-arrow-clockwise me-2"></i>Actualizar
        </button>
      </div>

      {/* KPI Cards */}
      <div className="row g-4 mb-4">
        <StatCard titulo="Ingresos Totales" valor={formatMoney(stats.totalVentas)} icono="bi-cash-stack" color="success" darkMode={darkMode} />
        <StatCard titulo="Base de Clientes" valor={stats.conteoClientes} icono="bi-people-fill" color="primary" darkMode={darkMode} />
        <StatCard titulo="Alertas de Stock" valor={stats.productosBajos.length} icono="bi-box-seam" color="danger" darkMode={darkMode} />
      </div>

      <div className="row g-4">
        {/* Gráfica */}
        <div className="col-lg-8">
          <div className={`card border-0 shadow-sm rounded-4 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`}>
            <div className="card-body p-4">
              <h6 className="fw-bold mb-4 border-bottom pb-2">Tendencia de Ventas (Últimos registros)</h6>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={stats.datosGrafica}>
                    <defs>
                      <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={darkMode ? "#0dcaf0" : "#0d6efd"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={darkMode ? "#0dcaf0" : "#0d6efd"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: darkMode ? '#aaa' : '#666'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: darkMode ? '#1e1e1e' : '#fff', border: 'none', borderRadius: '10px', color: darkMode ? '#fff' : '#000' }}
                      itemStyle={{ color: '#0d6efd' }}
                    />
                    <Area type="monotone" dataKey="monto" stroke={darkMode ? "#0dcaf0" : "#0d6efd"} strokeWidth={3} fillOpacity={1} fill="url(#colorV)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Bajo */}
        <div className="col-lg-4">
          <div className={`card border-0 shadow-sm rounded-4 h-100 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`}>
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3 text-danger">Stock Crítico</h6>
              <div className="list-group list-group-flush">
                {stats.productosBajos.length > 0 ? (
                  stats.productosBajos.map(p => (
                    <div key={p.idProducto} className="list-group-item bg-transparent border-opacity-10 px-0 py-2 d-flex justify-content-between">
                      <span className="small">{p.nombre}</span>
                      <span className={`badge ${p.stockActual === 0 ? 'bg-danger' : 'bg-warning text-dark'} rounded-pill`}>
                        {p.stockActual} {p.unidadMedida?.code}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small py-4 text-center">Todo el stock está al día 👍</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ titulo, valor, icono, color, darkMode }) {
  return (
    <div className="col-md-4">
      <div className={`card border-0 shadow-sm rounded-4 ${darkMode ? 'bg-secondary bg-opacity-10' : 'bg-white'}`}>
        <div className="card-body p-4 d-flex align-items-center">
          <div className={`bg-${color} bg-opacity-10 rounded-circle p-3 me-3`}>
            <i className={`bi ${icono} text-${color} fs-4`}></i>
          </div>
          <div>
            <p className="text-muted small fw-bold mb-0">{titulo}</p>
            <h4 className="mb-0 fw-bolder">{valor}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}