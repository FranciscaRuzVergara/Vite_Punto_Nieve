import { Link } from "react-router-dom";
function Navbar(){
    return(
        <>
        <header className="bg-primary p-3">
            <div className="container d-flex flex-wrap aling-items-center">
                <h1>Punto Nieve</h1>
                <form className="d-flex ms-auto" role="search" style={{maxWidth:"400px"}}>
                    <input className="form-control me-2" type="search" placeholder="buscar" style={{borderRadius:"10px"}}/>
                    <button className="btn btn-outline-light" type="submit">Buscar</button>
                </form>
                <div className="d-flex align-items-center">
                    <Link className="nav-link text-white px-2" to="/carrito">
                        <i className="bi bi-cart fs-3"></i>
                    </Link>
                    <Link className="nav-link text-white px-2" to="/login">
                        <i className="bi bi-person-fill fs-3"></i>
                    </Link>
                </div>
            </div>
        </header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
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
            <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ayuda">Ayuda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registro">Registrarse</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
    );
}

export default Navbar;