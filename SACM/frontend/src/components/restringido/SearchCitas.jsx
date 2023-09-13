import { useEffect, useState } from "react";
import { Api } from "../../services/api";

function SearchCitas() {
  const [citas, setCitas] = useState([]);
  const [nombre, setNombre] = useState("");

    const handleSearch = (e) => {
    setNombre(e.target.value);
    }


    const handleClean = (e) => {
      e.preventDefault();
      setNombre("");
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
  }

    const handleClick = (e) => {
        e.preventDefault();
        if (!nombre) {
            alert("Debe ingresar un dato para buscar");
            return;
        }
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }

    Api.getCitasByNames(nombre, token)
        .then((response) => response.json())
        .then((data) => {
        if (data.status === 200) {
            setCitas(data.citas);
            document.getElementById("inputNombre").value = "";
        } else {
            alert(data.msg);
        }
        }
        )
        .catch((error) => {
        console.log(error);
        }
        );
         
    }

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <form className="row g-3">
            <div className="col-md-12 d-flex">
              <input
                type="text"
                className="form-control"
                id="inputNombre"
                placeholder="Busca una cita"
                onChange={handleSearch}
              />
            </div>
          </form>

          <div className="col-md-12 d-flex my-3">
            <button type="button" className="btn btn-primary" onClick={handleClick}>
              Buscar
            </button>
            <button type="button" className="btn btn-danger mx-3" onClick={handleClean}>
              Limpiar
            </button>
          </div>
          <div className="col-md-12">
            {citas
              ? citas.map((cita) => (
                  <div key={cita.idCita} className="card my-3">
                    <div className="card-body">
                        <h5 className="card-text">Fecha: {cita.fecha}</h5>
                        <p className="card-text">Hora: {cita.hora}</p>
                        <p className="card-text">Status: {cita.status}</p>
                        <p className="card-text">Paciente: {cita.Paciente.name} {cita.Paciente.lastName}</p>
                        <p className="card-text">Paramédico: {cita.Paramedico.name} {cita.Paramedico.lastName}</p>
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
