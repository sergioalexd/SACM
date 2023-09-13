import { useEffect, useState } from "react";
import { Api } from "../../services/api";

function SearchCitas() {
  const [citas, setCitas] = useState([]);
  const [id, setId] = useState("");
  const [paramedicos, setParamedicos] = useState([{}]);

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
    Api.updateCitaMedica(id, token)
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
                  <div key={cita.idCita} className="card my-3">
                    <div className="card-body">
                      <h5 className="card-text">Fecha: {cita.fecha}</h5>
                      <p className="card-text">Hora: {cita.hora}</p>
                      <p className="card-text">
                        Status:<strong>&nbsp;{cita.status}</strong>
                      </p>
                      <p className="card-text">
                        Paciente: {cita.Paciente.name} {cita.Paciente.lastName}
                      </p>
                      <p className="card-text">
                        Paramédico: {cita.Paramedico.name}{" "}
                        {cita.Paramedico.lastName}
                      </p>
                    </div>
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={hadleEditar}
                        value={cita.idCita}
                      >
                        Editar cita
                      </button>
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
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCitas;
