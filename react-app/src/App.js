import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListarCliente from "./clientes/ListarCliente";
import AgregarCliente from "./clientes/AgregarCliente";
import EditarCliente from "./clientes/EditarCliente";
import Navegacion from "./plantilla/navegacion";
import ListarProducto from "./productos/ListarProducto";
import EditarProducto from "./productos/EditarProducto";
import AgregarProducto from "./productos/AgregarProducto";


function App() {
  return (
    <BrowserRouter>
      <div className=" d-flex">
        
        <Navegacion />

        <div className="container p-4" style={{width: "100%"}}>
          <Routes>
            <Route path="/clientes/listar" element={<ListarCliente />} />
            <Route path="/clientes/agregar" element={<AgregarCliente />} />
            <Route path="/clientes/editar/:id" element={<EditarCliente />} />

             <Route path="/productos/listar" element={<ListarProducto />} />
            <Route path="/productos/agregar" element={<AgregarProducto/>} />
            <Route path="/productos/editar/:id" element={<EditarProducto />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
