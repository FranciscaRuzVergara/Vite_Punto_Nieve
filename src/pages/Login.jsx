import React, { useState } from "react";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Correo:", correo);
    console.log("Contraseña:", contrasena);
  };

  return (
    <div className="card bg-primary text-white mx-auto mt-2 mb-5" style={{ borderRadius: "15px", width: "450px" }}>
      <div className="card-body p-4">
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <i className="bi bi-person-square mb-4" style={{ fontSize: "60px" }}></i>
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico:</label>
            <input
              type="email"
              id="correo"
              className="form-control"
              style={{ borderRadius: "10px" }}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="form-group mb-4" style={{ paddingTop: "20px" }}>
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              className="form-control"
              style={{ borderRadius: "10px" }}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          <div className="form-group form-check mb-5" style={{ marginTop: "20px" }}>
            <input type="checkbox" className="form-check-input" id="check" />
            <label className="form-check-label" htmlFor="check">
              Recuérdame
            </label>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success btn-md" style={{ borderRadius: "10px" }}>
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
