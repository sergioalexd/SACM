import NavBar from "../common/NavBar";
import { useNavigate } from "react-router-dom";
import RegistroPacienteForm from "./RegistroPacienteForm";

function RegisterPageParamedico() {

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
          <RegistroPacienteForm />
          <div className="row my-3" style={{ width: "33%", margin: "auto", textAlign:"center" }}>
            <p>¿Ya tiene cuenta?</p>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                navigate("/login-paciente");
              }}
            >
              Accede con tu cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPageParamedico;
