import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import MapaSitio from "./pages/MapaSitio";
import Nosotros from "./pages/Nosotros";
import Ayuda from "./pages/Ayuda";
import Carrito from "./pages/Carrito";
import Registro from "./pages/Registro";


function App() {
  const [carrito, setCarrito] = useState([]);

  // Añadir producto
  const agregarAlCarrito = (producto) => {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
      setCarrito(
        carrito.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: (item.cantidad || 1) + 1 } 
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Eliminar producto
  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout carrito={carrito}/>}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Productos agregarAlCarrito={agregarAlCarrito}/>} />
          <Route path="carrito" element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito}/>} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="ayuda" element={<Ayuda />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="mapaSitio" element={<MapaSitio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;