import { useState, useEffect } from "react";
import { Api } from "../../services/api";

function GetCitasByIdParamedico() {
  const [citas, setCitas] = useState([]);
  const [idParamedico, setIdParamedico] = useState({});
  const [token, setToken] = useState({});
  const [islooging, setIsLogging] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!token) {
      setIsLogging(false);
      return;
    }
    setToken(token);
    setIdParamedico(user.idParamedico);
    setIsLogging(true);
  }, []);

  useEffect(() => {
    if (!islooging) {
      return;
    } else {
    Api.getCitasByParamedico(idParamedico, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setCitas(data.citas);
        } else {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [idParamedico, islooging, token]);

   const handleCancelar = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    Api.cancelarCitaMedica(id, token)
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

  const handleFinalizar = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    Api.finalizarCitaMedica(id, token)
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

  console.log(citas)

  return (
    <>
      <div
        className="col-12 p-5 text-black rounded-5"
        style={{ backgroundColor: "#ffffff" }}
      >
        {islooging ? (
          <div className="row">
            <div className="col-12">
              <h4>Mis Citas</h4>
            </div>
            <div className="col-12">
              {citas.length > 0 ? (
                citas.slice(0,3).map((cita, index) => (
                  <div className="card my-3 text-black" key={cita.idCita}
                  style={
                    cita.status === "Cancelada"
                      ? { backgroundColor: "#c9747483" } 
                      : cita.status === "Finalizada" ?
                      { backgroundColor: "#74c97e83" }
                      : null
                  }>
                    <div className="card-body">
                      <h5 className="card-title">Cita N° {index + 1} | Estado: {cita.status}</h5>
                      <p className="card-text">Fecha: {cita.fecha} | Hora: {cita.hora}</p>
                      <p className="card-text"><small>Paciente: {cita.Paciente.name} {cita.Paciente.lastName} | Teléfono: {cita.Paciente.telefono}</small></p>
                      <p className="card-text"><small>Dirección: {cita.Paciente.address}, {cita.Paciente.comuna}</small></p>

                    </div>
                    <div className="card-footer">
                      {
                        cita.status === "Cancelada" || cita.status === "Finalizada" ?
                        <button
                        type="button"
                        className="btn btn-sm btn-danger mx-3"
                        onClick={handleCancelar}
                        value={cita.idCita}
                        disabled
                      >
                        Cancelar cita
                      </button>:
                      <button
                      type="button"
                      className="btn btn-sm btn-danger mx-3"
                      onClick={handleCancelar}
                      value={cita.idCita}
                    >
                      Cancelar cita
                    </button>
                      }
                      {
                        cita.status === "Finalizada" ? <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={handleFinalizar}
                        value={cita.idCita}
                        disabled
                      >
                        Finalizar
                      </button>: 
                        <button
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={handleFinalizar}
                        value={cita.idCita}
                      >
                        Finalizar
                      </button>

                      }
                    </div>
                  </div>
                ))
              ) : (
                <h5>No tienes citas agendadas</h5>
              )}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <h4>Debes iniciar sesión para ver tus citas</h4>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default GetCitasByIdParamedico;
