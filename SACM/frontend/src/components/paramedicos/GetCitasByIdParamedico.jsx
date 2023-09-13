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
                  <div className="card my-3 text-black" key={cita.idCita}>
                    <div className="card-body">
                      <h5 className="card-title">Cita N° {index + 1}</h5>
                      <p className="card-text">Fecha: {cita.fecha}</p>
                      <p className="card-text">Hora: {cita.hora}</p>
                      <p className="card-text">Estado: {cita.status}</p>
                      <p className="card-text">Paciente: {cita.Paciente.name} {cita.Paciente.lastName}</p>
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
