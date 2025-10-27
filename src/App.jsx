import { useState } from "react";
import { validateCarrito } from "./utils/validacionCarrito"; 
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
  const [carritoError, setCarritoError] = useState("");

  const intentarActualizarCarrito = (nuevoCarrito) => {
    const errors = validateCarrito(nuevoCarrito); 

    if (errors.total) {
      setCarritoError(errors.total);
      return false; // importante: avisamos que falló
    } else {
      setCarrito(nuevoCarrito);
      setCarritoError("");
      return true;
    }
  };

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

      const ok = intentarActualizarCarrito(nuevoCarrito);
      return ok ? nuevoCarrito : carritoActual;
    });
  };

  const incrementarCantidad = (productoId) => {
    setCarrito((carritoActual) => {
      const nuevoCarrito = carritoActual.map((item) =>
        item.id === productoId
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      );

      const ok = intentarActualizarCarrito(nuevoCarrito);
      return ok ? nuevoCarrito : carritoActual;
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

      const ok = intentarActualizarCarrito(nuevoCarrito);
      return ok ? nuevoCarrito : carritoActual;
    });
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito((carritoActual) => {
      const nuevoCarrito = carritoActual.filter((item) => item.id !== productoId);

      const ok = intentarActualizarCarrito(nuevoCarrito);
      return ok ? nuevoCarrito : carritoActual;
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
