import NavBar from "../common/NavBar";
import LoginFormParamedico from "./LoginFormParamedico";
import { useNavigate } from "react-router-dom";

function LoginPageParamedico() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid" style={{ backgroundColor: "#d4dadf" }}>
      <div className="row">
        <div className="col-12" style={{ backgroundColor: "#135488" }}>
          <NavBar />
        </div>
      </div>
      <div className="row">
        <div
          className="col-md-12 my-5"
          style={{ width: "400px", margin: "auto" }}
        >
          <LoginFormParamedico />
          <div
            className="row my-3"
            style={{ width: "33%", margin: "auto", textAlign: "center" }}
          >
            <p>¿Llegaste acá por error?</p>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageParamedico;
