import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import { Api } from "../../services/api";
import { useParams } from "react-router-dom";
import UpdateFichaMedica from "./UpdateFichaMedica";

function FichaPage() {
  const [isLogin, setIsLogging] = useState(false);
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({});
  const [atenciones, setAtenciones] = useState([]);
  const [fichaMedica, setFichaMedica] = useState("");
  const [atencionParaEditar, setAtencionParaEditar] = useState("");
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
          setFichaMedica(data.paciente.FichaMedica.idFichaMedica);
          setAtenciones(data.paciente.FichaMedica.Atencions);
          console.log(fichaMedica);
          console.log();
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const hadleEditar = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    setAtencionParaEditar(id);
  };

  const handleSolicitarBajaAtencion = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    Api.solicitarBajaAtencionMedica(id, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          alert(data.msg);
          window.location.reload();
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                <p>
                  Nombre: {paciente.name} {paciente.lastName}
                </p>
                <p>Rut: {paciente.rut}</p>
                <p>
                  Dirección: {paciente.address} {paciente.comuna}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-md-4 p-3">
          <div className="row">
            <div className="col-12">
              <h4>Historial de atenciones</h4>
              {atenciones ? (
                atenciones.map((atencion, index) => {
                  return (
                    <div
                      className="card my-2"
                      key={index}
                      style={
                        atencion.status === "Dada de baja"
                          ? { backgroundColor: "#c9747483" }
                          : atencion.status === "Finalizada"
                          ? { backgroundColor: "#74c97e83" }
                          : null
                      }
                    >
                      <div className="card-body">
                        <div className="col-12">
                          <p className="card-text">
                            <strong>
                              Fecha: {atencion.Citum.fecha} | Hora:{" "}
                              {atencion.Citum.hora}
                            </strong>
                          </p>
                          <p>Estado: {atencion.status}</p>
                          {atencion.descripcion !== null ||
                          atencion.parametrosClinicos !== null ||
                          atencion.diagnostico !== null ||
                          atencion.indicaciones !== null ? (
                            <>
                              <p className="card-text">
                                Descripción: {atencion.descripcion}
                              </p>
                              <p className="card-text">
                                Diagnostico: {atencion.diagnostico}
                              </p>
                              <p className="card-text">
                                Parámetros Clínicos:{" "}
                                {atencion.parametrosClinicos}
                              </p>
                              <p className="card-text">
                                Indicaciones: {atencion.indicaciones}
                              </p>{" "}
                            </>
                          ) : null}
                        </div>
                        <div className="col-12 d-flex ">
                          {atencion.status === "Dada de baja" ? null : (
                            <button
                              type="button"
                              className="btn btn-sm btn-primary my-3 mx-1"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              value={atencion.idAtencion}
                              onClick={hadleEditar}
                            >
                              Agregar datos
                            </button>
                          )}
                          {atencion.status === "Dada de baja" ? null : (
                            <button
                              type="button"
                              className="btn btn-sm btn-danger my-3 mx-1"
                              value={atencion.idAtencion}
                              onClick={handleSolicitarBajaAtencion}
                            >
                              Solcitar baja
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12">
                  <p>No no tienes citas creadas aún</p>
                </div>
              )}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12"></div>
          </div>
        </div>
        <div className="col-md-4 p-3"></div>
        <div className="row p-2 bg-white">
          <div className="col-12">
            <Footer />
          </div>
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Actualizar datos de la atención médica
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <UpdateFichaMedica
                  idAtencion={atencionParaEditar}
                  idFichaMedica={fichaMedica}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FichaPage;
