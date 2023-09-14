// formulario para actulizar datos del cita
import { useEffect, useState, useContext } from "react";
import { Api } from "../../services/api";
import { AuthContext } from "../../context/GlobalContext";

function UpdateCitaMedica() {
  const [data, setData] = useState({});
  const [idCita, setidCita] = useState("");
  const [token, setToken] = useState({});
  //eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(AuthContext);

  const onChangeFecha = (e) => {
    const fecha = e.target.value;
    setData({ ...data, fecha });
  };

  const onChangeHora = (e) => {
    const hora = e.target.value;
    setData({ ...data, hora });
  };

  const deleteData = () => {
    setData({});
    // limpiar los inputs del formulario
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const handleCick = (e) => {
    e.preventDefault();
    const cita = JSON.parse(localStorage.getItem("cita"))
    setidCita(cita)

    if (!data.fecha || !data.hora) {
      document.getElementById("mensajeerrorcita").innerHTML =
        "Debes ingresar algún campo para modificar";
      setTimeout(() => {
        document.getElementById("mensajeerrorcita").innerHTML = "";
      }, 2000);
      return;
    }

    Api.updateCitaMedica(data, idCita, token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setData(data);
          deleteData();
          localStorage.removeItem("cita");
          document.getElementById("sucess").innerHTML =
            "Datos actualizados correctamente";
          localStorage.setItem("usuario", JSON.stringify(data.citaActualizado));
          window.location.reload();
        } else {
          document.getElementById("evento").innerHTML = data.msg;
          setTimeout(() => {
            document.getElementById("evento").innerHTML = "";
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("usuario")) {
      const token = localStorage.getItem("token");
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("usuario")) {
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
  }, [dispatch]);

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
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleCick}
            >
              Modificar cita
            </button>
          </div>
        </form>
        <span className="text-success" id="mensajecita"></span>
        <span className="text-danger" id="mensajeerrorcita"></span>
      </div>
    </>
  );
}

export default UpdateCitaMedica;
