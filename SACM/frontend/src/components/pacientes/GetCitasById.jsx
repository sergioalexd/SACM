import { useState, useEffect } from "react";
import { Api } from "../../services/api";

function GetCitasById() {
  const [citas, setCitas] = useState([]);
  const [idPaciente, setIdPaciente] = useState({});
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
    setIdPaciente(user.idPaciente);
    setIsLogging(true);
  }, []);

  useEffect(() => {
    if (!islooging) {
      return;
    } else {
    Api.getCitasByPaciente(idPaciente, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setCitas(data.citas);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [idPaciente, islooging, token]);

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
                citas.map((cita, index) => (
                  <div className="card my-3 text-black" key={cita.idCita}>
                    <div className="card-body">
                      <h5 className="card-title">Cita N° {index + 1} | Estado: {cita.status}</h5>
                      <p className="card-text">Fecha: {cita.fecha} | Hora: {cita.hora}</p>
                      <p className="card-text">Paramédico: {cita.Paramedico.name} {cita.Paramedico.lastName}</p>
                    </div>
                    <div className="card-footer">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        // onClick={hadleEditar}
                        value={cita.idCita}
                      >
                        Editar cita
                      </button>
                      {cita.status === "Cancelada" ||
                      cita.status === "Finalizada" ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger mx-3"
                          // onClick={handleCancelar}
                          value={cita.idCita}
                          disabled
                        >
                          Cancelar cita
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger mx-3"
                          // onClick={handleCancelar}
                          value={cita.idCita}
                        >
                          Cancelar cita
                        </button>
                      )}
                      {cita.status === "Finalizada" ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          // onClick={handleFinalizar}
                          value={cita.idCita}
                          disabled
                        >
                          Finalizar
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          // onClick={handleFinalizar}
                          value={cita.idCita}
                        >
                          Finalizar
                        </button>
                      )}
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

export default GetCitasById;
