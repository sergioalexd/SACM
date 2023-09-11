import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignOut from "../common/SignOut";
import SearchPaciente from "../paramedicos/SearchPaciente";
import SearchParamedico from "./SearchParamedico";
import SearchCitas from "./SearchCitas";

function RestringidoPage() {
  const [isLogin, setIsLogging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const usuarioLog = localStorage.getItem("usuario");
      if (!usuarioLog) {
        setIsLogging(false);
        navigate("/admin/restringido/login");
      } else {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario.rol === "ADMIN") {
          setIsLogging(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLogin, navigate]);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#d4dadf" }}>
      <div className="row">
        <div className="col-6 p-2" style={{ backgroundColor: "#135488" }}>
            <h3 className="text-white">Panel de administración</h3>
        </div>
        <div
          className="col-6 text-end p-2"
          style={{ backgroundColor: "#135488" }}
        >
          {isLogin ? <SignOut /> : null}
        </div>
      </div>
      <div className="row p-2">
        <div className="col-md-4 p-3">
          <h4>Gestionar pacientes</h4>
          <SearchPaciente />
        </div>
        <div className="col-md-4 p-3">
          <h4>Gestionar paramédicos</h4>
          <SearchParamedico />
        </div>
        <div className="col-md-4 p-3">
          <div className="row">
            <div className="col-12">
              <h4>Listado de citas</h4>
              <SearchCitas />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12"></div>
          </div>
          <div className="row my-3"></div>
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
            <h3>Panel de administración</h3>
        </div>
      </div>
    </div>
  );
}

export default RestringidoPage;
