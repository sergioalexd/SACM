// formulario para actulizar datos del paciente
import { useEffect, useState, useContext } from "react";
import { Api } from "../../services/api";
import { AuthContext } from "../../context/GlobalContext";
import {
  FaPhoneAlt,
  FaHouseUser,
  FaEnvelope,
} from "react-icons/fa";

function UpdateDataParamedico() {
  const [data, setData] = useState({});
  const [idParamedico, setIdPaciente] = useState({});
  const [token, setToken] = useState({});
  //eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(AuthContext);

  const onChangeTelefono = (e) => {
    const telefono = e.target.value;
    setData({ ...data, telefono });
  };

  const onChangeDireccion = (e) => {
    const address = e.target.value;
    setData({ ...data, address });
  };

  const onChangeEmail = (e) => {
    const email= e.target.value;
    setData({ ...data, email });
  };

  const deleteData = () => {
    setData({});
    // limpiar los inputs del formulario
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  const handleSumit = (e) => {
    e.preventDefault();
    if (!data.telefono && !data.address && !data.email) {
      document.getElementById("evento").innerHTML =
        "Ingresa al menos un campo para editar";
      return;
    }

    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if(!validEmail.test(data.email)){
      alert("El correo ingresado no es válido");
      return;
    }

    const validPhone = /^[0-9]+$/;
    if(!validPhone.test(data.telefono) || data.telefono.length < 9){
      alert("El teléfono ingresado no es válido");
      return;
    }

    Api.updateDataParamedico(idParamedico, token, data)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setData(data);
          deleteData();
          document.getElementById("sucess").innerHTML = "Datos actualizados correctamente";
          localStorage.setItem(
            "usuario",
            JSON.stringify(data.paramedicoActualizado)
          );
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
    if(localStorage.getItem("usuario")){
    const token = localStorage.getItem("token");
    const idParamedico = JSON.parse(localStorage.getItem("usuario")).idParamedico;
    setIdPaciente(idParamedico);
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
        <form className="row g-3 border border-1 p-3 my-3">
          <div className="col-md-12 d-flex">
            <FaPhoneAlt
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="phone"
              className="form-control"
              id="inputTelefono"
              onChange={onChangeTelefono}
              placeholder="Teléfono"
            />
          </div>
          <div className="col-md-12 d-flex">
            <FaHouseUser
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="text"
              className="form-control"
              id="inputDireccion"
              onChange={onChangeDireccion}
              placeholder="Dirección"
            />
          </div>
          <div className="col-md-12 d-flex">
            <FaEnvelope
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              onChange={onChangeEmail}
              placeholder="Email"
            />
          </div>
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSumit}
            >
              Actualizar
            </button>
            <br />
            <span
              className="mx-3 text-danger text-align-center"
              id="evento"
            ></span>
            <span className="mx-3 text-success text-align-center" id="sucess"></span>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateDataParamedico;
