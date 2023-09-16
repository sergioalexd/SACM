import { useEffect, useState } from "react";
import { Api } from "../../services/api";
import UpdateCitaMedica from "../common/UpdateCitaMedica";

function SearchCitas() {
  const [citas, setCitas] = useState([]);
  const [id, setId] = useState("");
  const [paramedicos, setParamedicos] = useState([{}]);
  const [citaId, setCitaId] = useState("");

  const handleSearch = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
  };

  const hadleEditar = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    setCitaId(id)
    console.log(id);
    // Api.updateCitaMedica(id, token)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.status === 200) {
    //       alert(data.msg);
    //       window.location.reload();
    //     } else {
    //       alert(data.msg);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

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

  const handleClean = (e) => {
    e.preventDefault();
    setId("");
    document.getElementById("inputNombre").value = "";
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!usuario || !token) {
      return;
    }
    Api.getAllCitas(token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setCitas(data.citas);
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!id) {
      alert("Selecciona un paramedico de la lista");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    Api.getCitasByIdParamedico(id, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setCitas(data.citas);
          console.log(data.citas);
          document.getElementById("inputNombre").value = "";
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!usuario || !token) {
      return;
    }
    Api.getAllCitas(token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setCitas(data.citas);
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Api.getParamedicos()
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setParamedicos(data.paramedicos);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(citas);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <form className="row g-3">
            <div className="col-md-12 d-flex"></div>
            <select
              id="inputNombre"
              list="paramedicosList"
              className="form-control"
              onChange={handleSearch}
            >
              <option defaultValue>Selecciona un parámedico...</option>
              {citas
                ? paramedicos.map((paramedico) => (
                    <option
                      key={paramedico.idCita}
                      value={paramedico.idParamedico}
                    >
                      {paramedico.name} {paramedico.lastName}
                    </option>
                  ))
                : null}
            </select>
            <div className="col-md-12 d-flex my-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Buscar
              </button>
              <button
                type="button"
                className="btn btn-danger mx-3"
                onClick={handleClean}
              >
                Limpiar
              </button>
            </div>
          </form>
          <div className="col-md-12">
            {citas
              ? citas.map((cita) => (
                  <div
                    key={cita.idCita}
                    className="card my-3"
                    style={
                      cita.status === "Cancelada"
                        ? { backgroundColor: "#c9747483" }
                        : cita.status === "Finalizada"
                        ? { backgroundColor: "#74c97e83" }
                        : null
                    }
                  >
                    <div className="card-body">
                      <h6 className="card-text">
                        <small>
                          Fecha: {cita.fecha} | Hora: {cita.hora} | Estatus:{" "}
                          {cita.status}
                        </small>
                      </h6>
                      <p className="card-text">
                        <small>
                          Paramédico: {cita.Paramedico.name}{" "}
                          {cita.Paramedico.lastName} | Paciente:{" "}
                          {cita.Paciente.name} {cita.Paciente.lastName}
                        </small>
                      </p>
                    </div>
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={hadleEditar}
                        value={cita.idCita}
                      >
                        Editar cita
                      </button>
                      {cita.status === "Cancelada" ||
                      cita.status === "Finalizada" ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger mx-3"
                          onClick={handleCancelar}
                          value={cita.idCita}
                          disabled
                        >
                          Cancelar cita
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger mx-3"
                          onClick={handleCancelar}
                          value={cita.idCita}
                        >
                          Cancelar cita
                        </button>
                      )}
                      {cita.status === "Finalizada" ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={handleFinalizar}
                          value={cita.idCita}
                          disabled
                        >
                          Finalizar
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={handleFinalizar}
                          value={cita.idCita}
                        >
                          Finalizar
                        </button>
                      )}
                    </div>
                  </div>
                ))
              : null}
          </div>
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
                Actualizar cita médica
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"><UpdateCitaMedica id={citaId} /></div>
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
  );
}

export default SearchCitas;
