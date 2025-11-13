import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateRegisterForm } from "../utils/validacionRegistro";
import { SHA1 } from "../utils/sha1";
import { cleanRut } from "../utils/validaRut";
import "../styles/Registro.css";

function Registro() {
  const [formData, setFormData] = useState({
    run: "",
    nombre: "",
    apellido: "",
    fechaNac: "",
    correo: "",
    contrasena: "",
    repContrasena: "",
    aceptoTerminos: false,
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const updatedFormData = {
      ...formData,
      [id]: newValue,
    };
    setFormData(updatedFormData);

    const allErrors = validateRegisterForm(updatedFormData);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: allErrors[id] || "",
    }));
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    const newErrors = validateRegisterForm(formData); 
    setErrors(newErrors);

    const isFormValid = Object.keys(newErrors).length === 0;

    if (isFormValid) {
      // estandar run para guardado
      const runLimpio = cleanRut(formData.run); 

      // encriptacion
      const contrasenaEncriptada = SHA1(formData.contrasena); 

      // creacion de objeto
      const dataToSend = {
        ...formData,
        run: runLimpio,
        contrasena: contrasenaEncriptada,
        repContrasena: contrasenaEncriptada,
      };
      setSuccessMsg("✅ Registro exitoso. ¡Bienvenido!");
      console.log("Datos para enviar al Backend (Contraseña Encriptada):", dataToSend); 

      setFormData({
        run: "",
        nombre: "",
        apellido: "",
        fechaNac: "",
        correo: "",
        contrasena: "",
        repContrasena: "",
        aceptoTerminos: false,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center form-container">
      <div className="card bg-dark text-white p-4 my-4 registro-card">
        <h2 className="text-uppercase text-center mb-4">Registro</h2>

        <form id="formularioReg" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="run">Rut</label>
              <input
                type="text"
                id="run"
                className={`form-control ${
                  (errors.run && "is-invalid") ||
                  (formData.run && !errors.run && "is-valid") ||
                  ""
                } registro-input`}
                value={formData.run}
                onChange={handleChange}
              />
              {errors.run && <div className="text-warning">{errors.run}</div>}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="fechaNac">Fecha de nacimiento</label>
              <input
                type="date"
                id="fechaNac"
                className={`form-control ${
                  (errors.fechaNac && "is-invalid") ||
                  (formData.fechaNac && !errors.fechaNac && "is-valid") ||
                  ""
                } registro-input`}
                value={formData.fechaNac}
                onChange={handleChange}
              />
              {errors.fechaNac && (
                <div className="text-warning">{errors.fechaNac}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                className={`form-control ${
                  (errors.nombre && "is-invalid") ||
                  (formData.nombre && !errors.nombre && "is-valid") ||
                  ""
                } registro-input`}
                value={formData.nombre}
                onChange={handleChange}
              />
              {errors.nombre && (
                <div className="text-warning">{errors.nombre}</div>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                className={`form-control ${
                  (errors.apellido && "is-invalid") ||
                  (formData.apellido && !errors.apellido && "is-valid") ||
                  ""
                } registro-input`}
                value={formData.apellido}
                onChange={handleChange}
              />
              {errors.apellido && (
                <div className="text-warning">{errors.apellido}</div>
              )}
            </div>
          </div>

          <div className="form-group mb-2">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              className={`form-control ${
                (errors.correo && "is-invalid") ||
                (formData.correo && !errors.correo && "is-valid") ||
                ""
              } registro-input`}
              value={formData.correo}
              onChange={handleChange}
            />
            {errors.correo && (
              <div className="text-warning">{errors.correo}</div>
            )}
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                className={`form-control ${
                  (errors.contrasena && "is-invalid") ||
                  (formData.contrasena && !errors.contrasena && "is-valid") ||
                  ""
                } registro-input`}
                value={formData.contrasena}
                onChange={handleChange}
              />
              {errors.contrasena && (
                <div className="text-warning">{errors.contrasena}</div>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="repContrasena">Repita su contraseña</label>
              <input
                type="password"
                id="repContrasena"
                className={`form-control ${
                  (errors.repContrasena && "is-invalid") ||
                  (formData.repContrasena && !errors.repContrasena && "is-valid") ||
                  ""
                } registro-input`}
                value={formData.repContrasena}
                onChange={handleChange}
              />
              {errors.repContrasena && (
                <div className="text-warning">{errors.repContrasena}</div>
              )}
            </div>
          </div>

          <div className="form-group form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="aceptoTerminos"
              checked={formData.aceptoTerminos}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="aceptoTerminos">
              Acepto los{" "}
              <a href="#!" className="fw-bold text-white">
                términos de servicio
              </a>
            </label>
            {errors.aceptoTerminos && (
              <div className="text-warning mt-1">
                {errors.aceptoTerminos}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-success px-4 registro-submit-btn"
            >
              Registrarme
            </button>
          </div>

          {successMsg && (
            <div className="text-center text-light mt-3 fw-bold">
              {successMsg}
            </div>
          )}

          <p className="text-center mt-4 mb-0 text-white">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="fw-bold text-white">
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registro;
