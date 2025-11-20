import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <>
      {/*barra superior*/}
      <header className="bg-dark py-3">
        <div className="container d-flex flex-wrap align-items-center justify-content-between">
          <Link
            to="/"
            className="text-white m-0 text-decoration-none navbar-logo"
          >
            PUNTO NIEVE
          </Link>

          {/* buscador */}
          <form
            className="d-flex ms-auto navbar-search-form"
            role="search"
          >
            <input
              className="form-control me-2 rounded-3"
              type="search"
              placeholder="Búsqueda"
              aria-label="Buscar"
            />
            <button className="btn btn-outline-light" type="submit">
              Buscar
            </button>
          </form>

          {/* íconos */}
          <div className="d-flex align-items-center ms-3">
            <Link
              className="nav-link text-white px-2"
              to="/carrito"
              aria-label="Carrito"
            >
              <i className="bi bi-cart fs-3"></i>
            </Link>
            <Link
              className="nav-link text-white px-2"
              to="/login"
              aria-label="Login"
            >
              <i className="bi bi-person-fill fs-3"></i>
            </Link>
          </div>
        </div>
      </header>

      {/*navbar principal*/}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-top border-secondary">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/prodApi">
                  ProdApi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ayuda">
                  Ayuda
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Iniciar sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registro">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
