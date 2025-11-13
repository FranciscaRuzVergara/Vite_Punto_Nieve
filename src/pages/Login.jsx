import React, { useState } from "react";
import { SHA1 } from "../utils/sha1";
import { validarCorreo, validarContrasena } from "../utils/validacionLogin";
import "../styles/Login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errors, setErrors] = useState({ correo: "", contrasena: "" });
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let error = "";

    if (id === "correo") {
      setCorreo(value);
      error = validarCorreo(value);
    } else if (id === "contrasena") {
      setContrasena(value);
      error = validarContrasena(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));

    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    const newErrors = {
      correo: validarCorreo(correo),
      contrasena: validarContrasena(contrasena),
    };

    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every(
      (error) => error === ""
    );

    if (isFormValid) {
      const contrasenaEncriptada = SHA1(contrasena);

      setSuccessMsg("✅ Inicio de sesión exitoso!");
      console.log("Correo:", correo);
      console.log("Contraseña Encriptada (SHA-1):", contrasenaEncriptada);

      setCorreo("");
      setContrasena("");
    } else {
      console.log("Formulario contiene errores de validación.");
    }
  };

  return (
    <div className="card bg-dark text-white mx-auto mt-2 mb-5 login-card">
      <div className="card-body p-4">
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <i className="bi bi-person-square mb-4 login-icon"></i>
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo electrónico:</label>
            <input
              type="email"
              id="correo"
              className={`form-control ${
                (errors.correo && "is-invalid") ||
                (correo && !errors.correo && "is-valid") ||
                ""
              } login-input`}
              value={correo}
              onChange={handleInputChange}
              aria-describedby="correoError"
              required
            />
            {errors.correo && (
              <div id="correoError" className="text-warning mt-1">
                {errors.correo}
              </div>
            )}
          </div>

          <div className="form-group mb-4 login-form-group-spacing">
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              className={`form-control ${
                (errors.contrasena && "is-invalid") ||
                (contrasena && !errors.contrasena && "is-valid") ||
                ""
              } login-input`}
              value={contrasena}
              onChange={handleInputChange}
              aria-describedby="contrasenaError"
              required
            />
            {errors.contrasena && (
              <div id="contrasenaError" className="text-warning mt-1">
                {errors.contrasena}
              </div>
            )}
          </div>

          <div className="form-group form-check mb-5 login-checkbox-group">
            <input type="checkbox" className="form-check-input" id="check" />
            <label className="form-check-label" htmlFor="check">
              Recuérdame
            </label>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success btn-md login-submit-btn"
            >
              Iniciar sesión
            </button>
          </div>

          {successMsg && (
            <div className="text-center text-light fw-bold">
              {successMsg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
