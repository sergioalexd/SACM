import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import PerfilCliente from "./PerfilCliente";
import UpdateDataPaciente from "./UpdateDataPaciente";
import Cita from "../Cita";
import SignOut from "../common/SignOut";
import GetCitasById from "./GetCitasById";
import Footer from "../common/Footer";

function PacientePage() {
  const [isLogin, setIsLogging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLog = localStorage.getItem("usuario");
    if(usuarioLog) {
      const usuario = JSON.parse(usuarioLog);
      const tipoUsuario = Object.prototype.hasOwnProperty.call(usuario, "idParamedico");
      if (tipoUsuario) {
        navigate("/admin/paramedicos");
      }
    }

    if (!usuarioLog) {
      setIsLogging(false);
      navigate("/login-paciente");
    } else {
      setIsLogging(true);
    }
  }, [isLogin, navigate]);
  return (
    <div className="container-fluid" style={{ backgroundColor: "#d4dadf" }}>
      <div className="row">
        <div className="col-12" style={{ backgroundColor: "#135488" }}>
          <NavBar />
        </div>
      </div>
      <div className="row p-2">
        <div className="col-md-4 p-3">
          <h4>Perfil</h4>
          <PerfilCliente />
        </div>
        <div className="col-md-4 p-3">
          <div className="row">
            <div className="col-12">
              <h4>Actualizar datos</h4>
              <UpdateDataPaciente />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12">
              <GetCitasById />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="row">
            <div className="col-12">
              <h4>Agendar cita</h4>
              <Cita />
            </div>
            <div className="row">
              <div className="col-auto p-5 text-center">
                {isLogin ? <SignOut /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-2 bg-white">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PacientePage;
