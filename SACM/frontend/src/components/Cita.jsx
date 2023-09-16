import { useState, useEffect, useContext } from "react";
import { Api } from "../services/api";
import { AuthContext } from "../context/GlobalContext";
// crear componente con formulario con los campos de la cita

function Cita() {
  const [data, setData] = useState({});
  const [state, dispatch] = useContext(AuthContext);
  const [isLogging, setIsLogging] = useState(false);
  const [paramedicos, setParamedicos] = useState([]);
  const token = localStorage.getItem("token");

  const onChangeFecha = (e) => {
    const fecha = e.target.value;
    setData({ ...data, fecha });
  };

  const onChangeHora = (e) => {
    const hora = e.target.value;
    setData({ ...data, hora });
  };

  const onChangeParamedico = (e) => {
    const idParamedico = e.target.value;
    setData({ ...data, idParamedico });
  };

  const deleteData = () => {
    if (isLogging && state.state.user.usuario.FichaMedica) {
      const idPaciente = state.state.user.usuario.idPaciente;
      const idFichaMedica = state.state.user.usuario.FichaMedica.idFichaMedica;
      setData({ ...data, idPaciente, idFichaMedica });
    }
    // limpiar los inputs del formulario
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });

    const selects = document.querySelectorAll("select");
    selects.forEach((select) => {
      select.value = "";
    });
  };

  const handleCick = (e) => {
    e.preventDefault();

    if (!data.fecha || !data.hora || !data.idParamedico) {
      document.getElementById("mensajecita-error").innerHTML =
        "Debe ingresar todos los  campos";
      return;
    }

    if (!token) {
      document.getElementById("mensajecita-exito").innerHTML = "";
      document.getElementById("mensajecita-error").innerHTML =
        "Debe iniciar sesión para avanzar con la creación de la cita";
      return;
    }

    Api.createCita(data, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setData(data);
          deleteData();
          document.getElementById("mensajecita-error").innerHTML = "";
          document.getElementById("mensajecita-exito").innerHTML =
            "Cita creada correctamente.";
          window.location.reload();
        } else {
          document.getElementById("mensajecita-exito").innerHTML = "";
          document.getElementById("mensajecita-error").innerHTML = data.msg;
          if (isLogging && state.state.user.usuario.FichaMedica) {
            const idPaciente = state.state.user.usuario.idPaciente;
            const idFichaMedica = state.state.user.usuario.FichaMedica.idFichaMedica;
            setData({ ...data, idPaciente, idFichaMedica });
          }
          document.getElementById("inputFecha").value = "";
          document.getElementById("inputFHora").value = "";
          document.getElementById("inputParamedico").value = "";          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("usuario")) {
      // const usuario = auth.usuario;
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { usuario },
      });
    } else {
      dispatch({
        type: "LOGIN_FAILED",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }
    const usuarioLog = localStorage.getItem("usuario");

    if (!usuarioLog) {
      setIsLogging(false);
    } else {
      setIsLogging(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLogging && state.state.user.usuario.FichaMedica) {
      const idPaciente = state.state.user.usuario.idPaciente;
      const idFichaMedica = state.state.user.usuario.FichaMedica.idFichaMedica;
      setData({ ...data, idPaciente, idFichaMedica });
    }
  }, [isLogging]);

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

  return (
    <>
      <div
        className="col-12 p-5 text-black rounded-5"
        style={{ backgroundColor: "#ffffff" }}
      >
        <form>
          <div className="row">
            <div className="col-12"></div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="inputFecha">
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                id="inputFecha"
                onChange={onChangeFecha}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="inputFHora">
                Hora
              </label>
              <input
                type="time"
                className="form-control"
                id="inputFHora"
                onChange={onChangeHora}
                list="horacita"
              />
              <datalist id="horacita">
                <option value="08:00" />
                <option value="09:30" />
                <option value="11:00" />
                <option value="12:30" />
                <option value="14:00" />
                <option value="15:30" />
                <option value="17:00" />
                <option value="18:30" />
                <option value="20:00" />
              </datalist>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputParamedico" className="form-label">
                Paramédico
              </label>
              <select
                className="form-select"
                onChange={onChangeParamedico}
                id="inputParamedico"
              >
                <option defaultValue>Seleccione un Paramédico</option>
                {paramedicos.map((paramedico, index) => (
                  <option key={index} value={paramedico.idParamedico}>
                    {paramedico.name} {paramedico.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleCick}
            >
              Crear Cita
            </button>
          </div>
        </form>
        <span className="text-success" id="mensajecita-exito"></span>
        <span className="text-danger" id="mensajecita-error"></span>
      </div>
    </>
  );
}

export default Cita;
