// crear navbar con cuatro botones: inicio, ficha clinica, pacientes, nosotros alineados a la derecha
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("paciente");

  useEffect(() => {
    const usuarioLog = localStorage.getItem("token");
    if (!usuarioLog) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, [isLogged]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      return;
    }
    const tipoUsuario = Object.prototype.hasOwnProperty.call(usuario, "idParamedico");
    switch (tipoUsuario) {
      case true:
        setTipoUsuario("paramedico");
        break;
      case false:
        setTipoUsuario("paciente");
        break;
      default:
        setTipoUsuario("paciente");
        break;
    }
  }, [tipoUsuario]);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent fw-semibold text-light">
        <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/">Centro Médico</Link>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ color: "white" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  style={{ color: "white" }}
                >
                  Inicio
                </Link>
                {/* <a className="nav-link active" aria-current="page" href="#">
                  Inicio
                </a> */}
              </li>
              {
                tipoUsuario === "paciente" ? null :
                <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/paramedicos"
                  style={{ color: "white" }}
                >
                  Ficha Clínica
                  </Link>
              </li>
              }
              {
                tipoUsuario === "paramedico" ? null :
                <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/pacientes"
                  style={{ color: "white" }}
                >
                  Pacientes
                </Link>
              </li>
              }
              
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ color: "white" }}>
                  Nosotros
                </a>
              </li>
            </ul>
            <div className="d-flex">
                <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">{isLogged ? <SignOut /> : <Link 
            className="nav-link active fw-bold text-info text-decoration-none"
            
            to="/login-paciente"> Iniciar sesión </Link> }</li>
            </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
