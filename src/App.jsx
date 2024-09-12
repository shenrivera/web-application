import { BrowserRouter, Routes, Route } from "react-router-dom"

//aui esta mis layout
import LayoutAuth from "./layouts/LayoutAuth"
import LayoutAdmin from "./layouts/LayoutAdmin"
//traemos las paguinas de autenticacion
import Loguin from "./pages/auth/Loguin"
import Recupera from "./pages/auth/OlvidoPassword"
// traemos las paginas de administardor 
import Error404 from "./pages/Error404"
import Home from "./pages/admin/Home"
import Desarmonias from "./pages/admin/Desarmonias"
import PerfilUser from "./pages/admin/PerfilUser"
import DetalleCasos from "./pages/admin/DetalleCasos"
import Seguimiento from "./pages/admin/Seguimiento"
import Reportes from "./pages/admin/Reportes"


function App() {
  

  return (
    <BrowserRouter >
    <Routes>
    <Route path="/loguin" element={<Loguin/>}/>
    <Route path="/recuperar" element={<Recupera/>}/>
      
      
      <Route path="/" element={<LayoutAdmin/>}>
        <Route index element={<Home/>}/>
        
        <Route path="perfil" element={<PerfilUser/>}/>
        <Route path="desarmonias" element={<Desarmonias/>}/>
        <Route path="detalles/:radicado" element={<DetalleCasos/>}/>
        <Route path="/seguimiento/:radicado" element={<Seguimiento/>}/>
        <Route path="Reportes" element={<Reportes/>}/>
      </Route>

      <Route path="*" element={<Error404/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
