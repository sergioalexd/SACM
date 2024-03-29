import { useEffect, useState } from "react";
import { Api } from "../../services/api";
import RegistroParamedicoForm from "./RegistroParamedicoForm";
import UpdateDataParamedicoAdmin from "./UpdateDataParamedicoAdmin";

function SearchParamedico() {
  const [paramedicos, setParamedicos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [paramId, setParamId] = useState("");

  const handleSearch = (e) => {
    setNombre(e.target.value);
  };

  const handleClean = (e) => {
    e.preventDefault();
    setNombre("");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!usuario || !token) {
      return;
    }
    Api.getParamedicos(token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setParamedicos(data.paramedicos);
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
    if (!nombre) {
      alert("Debe ingresar un nombre");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    Api.getParamedicosByNames(nombre, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setParamedicos(data.paramedicos);
          document.getElementById("inputNombre").value = "";
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const habilitarParamedico = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    Api.habilitarParamedico(id, token)
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

  const inhabilitarParamedico = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    console.log("id", id);
    Api.inhabilitarParamedico(id, token)
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

  const deleteParamedico = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    Api.deleteParamedico(id, token)
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

  const showCreateHandle = (e) => {
    e.preventDefault();
    if (showCreate) {
      setShowCreate(false);
    } else {
      setShowCreate(true);
    }
  };

  const updateHandle = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const id = e.target.value;
    setParamId(id)
    console.log(paramId);
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!usuario || !token) {
      return;
    }
    Api.getParamedicos(token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setParamedicos(data.paramedicos);
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
          <button
            type="button"
            className="btn btn-success my-3"
            onClick={showCreateHandle}
          >
            Crear paramédico
          </button>
        </div>
        {showCreate ? (
          <div className="col-12">
            <RegistroParamedicoForm />
          </div>
        ) : null}
      </div>
      <div className="row">
        <div className="col-12">
          <form className="row g-3">
            <h5>Buscar paramédico por nombre</h5>
            <div className="col-md-12 d-flex">
              <input
                type="text"
                className="form-control"
                id="inputNombre"
                placeholder="Nombre del paramédico"
                onChange={handleSearch}
              />
            </div>
          </form>
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
          <div className="col-md-12">
            {paramedicos
              ? paramedicos.map((paramedico) => (
                  <div
                    key={paramedico.idParamedico}
                    className="card my-3"
                    style={
                      paramedico.status === "Eliminado"
                        ? { backgroundColor: "#c9747483" }
                        : null
                    }
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        {paramedico.name} {paramedico.lastName} | Estado:{" "}
                        {paramedico.status}
                      </h5>
                      <p className="card-text">Rut: {paramedico.rut}</p>
                      <p className="card-text">
                        Correo: {paramedico.email} | Telefono:{" "}
                        {paramedico.telefono}
                      </p>
                    </div>

                    <div className="card-footer d-flex">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary mx-3"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={updateHandle}
                        value={paramedico.idParamedico}
                      >
                        Modificar datos
                      </button>

                      {paramedico.status === "Activo" ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          value={paramedico.idParamedico}
                          onClick={inhabilitarParamedico}
                        >
                          Suspender
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          value={paramedico.idParamedico}
                          onClick={habilitarParamedico}
                        >
                          Activar
                        </button>
                      )}
                      {paramedicos.status !== "Eliminado" ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger mx-3"
                          value={paramedico.idParamedico}
                          onClick={deleteParamedico}
                        >
                          Dar de baja
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger mx-3"
                          value={paramedico.idParamedico}
                          onClick={deleteParamedico}
                          disabled
                        >
                          Dar de baja
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
                Actualizar datos del paramédico
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"><UpdateDataParamedicoAdmin id={paramId} /></div>
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

export default SearchParamedico;
