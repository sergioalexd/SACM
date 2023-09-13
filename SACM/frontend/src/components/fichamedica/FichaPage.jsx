import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import { Api } from "../../services/api";
import { useParams } from "react-router-dom";

function FichaPage() {
  const [isLogin, setIsLogging] = useState(false);
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({});
  const [atenciones, setAtenciones] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const usuarioLog = localStorage.getItem("usuario");

    if (!usuarioLog) {
      setIsLogging(false);
    } else {
      setIsLogging(true);
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    Api.getFichaMedicaByIdPaciente(id, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setPaciente(data.paciente);
          setAtenciones(data.paciente.FichaMedica.Atencions);
          console.log();
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#d4dadf" }}>
      <div className="row">
        <div className="col-12" style={{ backgroundColor: "#135488" }}>
          <NavBar />
        </div>
      </div>
      <div className="row p-2">
        <div className="col-12">
          <Link to="/pacientes" className="btn btn-primary">
            Volver
          </Link>
        </div>
        <div className="col-md-4 p-3">
          <h4>Paciente</h4>
          {paciente ? (
            <div className="card">
              <div className="card-body">
                <p>Nombre: {paciente.name}</p>
                <p>Apellido: {paciente.lastName}</p>
                <p>Rut: {paciente.rut}</p>
                <p>Comuna: {paciente.comuna}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-md-4 p-3">
          <div className="row">
            <div className="col-12">
              <h4>Historial de atenciones</h4>
              {paciente
                ? atenciones.map((atencion, index) => {
                    return (
                      <div className="card my-2" key={index}>
                        <div className="card-body">
                          <div className="col-12">
                            <p className="card-text">Fecha: {atencion.Citum.fecha}</p>
                            <p className="card-text">Hora: {atencion.Citum.hora}</p>
                            <p className="card-text">Diagnostico: {atencion.descripcion}</p>
                            <p className="card-text">Tratamiento: {atencion.diagnostico}</p>
                            <p className="card-text">Indicaciones: {atencion.indicaciones}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12"></div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="row">
           
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

export default FichaPage;
