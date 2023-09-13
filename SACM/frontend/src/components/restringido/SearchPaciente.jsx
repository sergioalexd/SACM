import { useEffect, useState } from "react";
import { Api } from "../../services/api";
import RegistroPacienteForm from "./RegistroPacienteForm";

function SearchPaciente() {
  const [pacientes, setPacientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [showCreate, setShowCreate] = useState(false);

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
      Api.getAllPacientes(token)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setPacientes(data.pacientes);
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
            alert("Debe ingresar un nombre");
            return;
        }
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }

    Api.getPacientesByNames(nombre, token)
        .then((response) => response.json())
        .then((data) => {
        if (data.status === 200) {
            setPacientes(data.pacientes);
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

    const showCreateHandle = (e) => {
      e.preventDefault();
      if (showCreate) {
        setShowCreate(false);
      } else {
      setShowCreate(true);
      }
    };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!usuario || !token) {
      return;
    }
    Api.getAllPacientes(token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setPacientes(data.pacientes);
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
          <button type="button" className="btn btn-success my-3" onClick={showCreateHandle}>
            Crear paciente
          </button>
        </div>
        {
          showCreate ? (
            <div className="col-12">
            <RegistroPacienteForm />
            </div>
          ) : null  
        }
        </div>
      <div className="row">
        <div className="col-12">
          <form className="row g-3">
          <h5>Buscar paciente por nombre</h5>
            <div className="col-md-12 d-flex">
              <input
                type="text"
                className="form-control"
                id="inputNombre"
                placeholder="Nombre del paciente"
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
            {pacientes
              ? pacientes.map((paciente) => (
                  <div key={paciente.idPaciente} className="card my-3">
                    <div className="card-body">
                      <h5 className="card-title">
                        {paciente.name} {paciente.lastName}
                      </h5>
                        <p className="card-text">Rut: {paciente.rut}</p>
                        <p className="card-text">Telefono: {paciente.telefono}</p>
                        <p className="card-text">Dirección: {paciente.address}</p>
                        <p className="card-text">Comuna: {paciente.comuna}</p>
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

export default SearchPaciente;
