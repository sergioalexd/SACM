import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import SignOut from "../common/SignOut";
import GetCitasByIdParamedico from "./GetCitasByIdParamedico";
import PerfilParamedico from "./PerfilParamedico";
import SearchPaciente from "./SearchPaciente";
import FooterParamedico from "../common/FooterParamedico";

function ParamedicoPage() {
  const [isLogin, setIsLogging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLog = localStorage.getItem("usuario");
    if (!usuarioLog) {
      setIsLogging(false);
      navigate("/admin/restringido/login");
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
          <h4>Buscar pacientes</h4>
          <SearchPaciente />
        </div>
        <div className="col-md-4 p-3">
          <h4>Datos del paramédico</h4>
          <PerfilParamedico />
        </div>
        <div className="col-md-4 p-3">
          <h4>Agenda</h4>
          <GetCitasByIdParamedico />

          <div className="row my-3">
            <div className="col-auto p-5 text-center">
              {isLogin ? <SignOut /> : null}
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="row">
            {/* <div className="col-12">
              <h4>Indicar disponibilidad</h4>
            </div> */}
            <div className="row">
              {/* <div className="col-auto p-5 text-center">
                {isLogin ? <SignOut /> : null}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row p-2 bg-white">
        <div className="col-12">
          <FooterParamedico />
        </div>
      </div>
    </div>
  );
}

export default ParamedicoPage;
