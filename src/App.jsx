import { useEffect, useState } from "react";
import { validateCarrito } from "./utils/validacionCarrito"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Productos from "./components/Productos";
import Login from "./pages/Login";
import MapaSitio from "./pages/MapaSitio";
import Nosotros from "./pages/Nosotros";
import Ayuda from "./pages/Ayuda";
import Carrito from "./components/Carrito";
import Registro from "./pages/Registro";
import CarritoPage from "./pages/CarritoPage";
import ProductosPage from "./pages/ProductosPage";
import PedidosPage from "./pages/PedidosPage";
import ClientesPage from "./pages/ClientesPage";
import CategoriasPage from "./pages/CategoriasPage";
import UsuariosPage from "./pages/UsuariosPage";
import AgregarProdPage from "./pages/AgregarProdPage";

function App() {
  const [carrito, setCarrito] = useState([]); 
  const [carritoError, setCarritoError] = useState("");

  useEffect(()=>{
    const errors = validateCarrito(carrito);
    if(errors.total){
      setCarritoError(errors.total);
    }else{
      setCarritoError("");
    }
  },[carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === producto.id);

      let nuevoCarrito;
      if (existe) {
        nuevoCarrito = carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        nuevoCarrito = [
          ...carritoActual,
          { ...producto, cantidad: 1 }
        ];
      }
      return nuevoCarrito;
    });
  };

  const incrementarCantidad = (productoId) => {
    setCarrito((carritoActual) => {
      const nuevoCarrito = carritoActual.map((item) =>
        item.id === productoId
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      );
      return nuevoCarrito;
    });
  };

  const decrementarCantidad = (productoId) => {
    setCarrito((carritoActual) => {
      const nuevoCarrito = carritoActual
        .map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0); 
      return nuevoCarrito ;
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito((carritoActual) => {
      const nuevoCarrito = carritoActual.filter((item) => item.id !== productoId);
      return nuevoCarrito;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout carrito={carrito} />
          }
        >
          <Route index element={<Home />} />

          <Route
            path="productos"
            element={
              <Productos
                carrito={carrito}
                agregarAlCarrito={agregarAlCarrito}
                incrementarCantidad={incrementarCantidad}
                decrementarCantidad={decrementarCantidad}
              />
            }
          />

          <Route
            path="carrito"
            element={
              <Carrito
                carrito={carrito}
                carritoError={carritoError} 
                eliminarDelCarrito={eliminarDelCarrito}
                incrementarCantidad={incrementarCantidad}
                decrementarCantidad={decrementarCantidad}
              />
            }
          />

          <Route path="nosotros" element={<Nosotros />} />
          <Route path="ayuda" element={<Ayuda />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="mapaSitio" element={<MapaSitio />} />
          <Route path="agregar" element={<AgregarProdPage />} />

          {/* rutas backend */}
          <Route path="admin/carrito" element={<CarritoPage />} />
          <Route path="admin/productos" element={<ProductosPage />} />
          <Route path="admin/pedidos" element={<PedidosPage />} />
          <Route path="admin/clientes" element={<ClientesPage />} />
          <Route path="admin/categorias" element={<CategoriasPage />} />
          <Route path="admin/usuarios" element={<UsuariosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
