// footer con 4 contenedores: logo, contacto, redes sociales, links hecho una grilla de bootstrap
import { useState, useEffect } from "react";

function FooterParamedico() {
  const [tipoUsuario, setTipoUsuario] = useState("paciente");

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      return;
    }
    const tipoUsuario = Object.prototype.hasOwnProperty.call(
      usuario,
      "idParamedico"
    );

    switch (tipoUsuario) {
      case true:
        setTipoUsuario("paramedico");
        
        break;
      case false:
        setTipoUsuario("paciente");
        break;
      default:
        setTipoUsuario("paramedico");
        break;
    }

  }, [tipoUsuario]);

  return (
    <footer>
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-md-3">
            <h2>Centro Médico</h2>
          </div>
          <div className="col-md-3">
            <h3>Compañia</h3>
            <p>
              <a href="mailto:contacto@centromedico.cl">contacto@centromedico.cl</a>
            </p>
            <p>
              <a href="tel:+56987654321">+56 9 87654321</a>
            </p>
          </div>
          <div className="col-md-3">
            <h3>Comunidad</h3>
            <p>
              <a href="https://www.facebook.com/">Facebook</a>
            </p>
            <p>
              <a href="https://www.instagram.com/">Instagram</a>
            </p>
          </div>
          <div className="col-md-3">
            <h3>Ayuda</h3>
            <p>Texto de ayuda y links</p>
            <p>Texto de ayuda</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterParamedico;
