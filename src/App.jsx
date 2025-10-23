import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import MapaSitio from "./pages/MapaSitio";
import Nosotros from "./pages/Nosotros";
import Ayuda from "./pages/Ayuda";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="ayuda" element={<Ayuda />} />
          <Route path="login" element={<Login />} />
          <Route path="mapaSitio" element={<MapaSitio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;