import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/GlobalContext";
import {
  FaMale,
  FaIdCard,
  FaPhoneAlt,
  FaHouseUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Api } from "../../services/api";

function RegistroPacienteForm() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [isLogging, setIsLogging] = useState(false);
  const [buttonAllowed, setButtonAllowed] = useState(false);
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);

  const regionesData = {
    regiones: [
      {
        region: "Valparaíso",
        comunas: [
          "Valparaíso",
          "Casablanca",
          "Concón",
          "Quintero",
          "Viña del Mar",
          "Quilpué",
          "Villa Alemana",
        ],
      },
    ],
  };

  const onChangeEmail = (e) => {
    const correo = e.target.value;
    console.log(correo);
    setData({ ...data, correo });
  };

  const onChangePassword = (e) => {
    const contrasena = e.target.value;
    setData({ ...data, contrasena });
  };

  const onChangeNombre = (e) => {
    const nombre = e.target.value;
    setData({ ...data, nombre });
  };

  const onChangeApellido = (e) => {
    const apellido = e.target.value;
    setData({ ...data, apellido });
  };

  const onChangeRut = (e) => {
    const rutInput = e.target.value;

    let actual = rutInput.replace(/^0+/, "");
    if (actual != "" && actual.length > 1) {
      let sinPuntos = actual.replace(/\./g, "");
      let actualLimpio = sinPuntos.replace(/-/g, "");
      let inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      let rut = "";
      let i = 0;
      let j = 1;
      for (i = inicio.length - 1; i >= 0; i--) {
        let letra = inicio.charAt(i);
        rut = letra + rut;
        if (j % 3 == 0 && j <= inicio.length - 1) {
          rut = "." + rut;
        }
        j++;
      }
      let dv = actualLimpio.substring(actualLimpio.length - 1);
      rut = rut + "-" + dv;

      e.target.value = rut;
      console.log(rut.length);

      setData({ ...data, rut });
    }
  };

  const onChangeTelefono = (e) => {
    const telefono = e.target.value;
    setData({ ...data, telefono });
  };

  const onChangeDireccion = (e) => {
    const address = e.target.value;
    setData({ ...data, address });
  };

  const onChangeComuna = (e) => {
    const comuna = e.target.value;
    setData({ ...data, comuna });
  };

  const onChangeRegion = (e) => {
    const region = e.target.value;
    setData({ ...data, region });
  };

  const handleCick = (e) => {
    if (
      !data.correo ||
      !data.contrasena ||
      !data.nombre ||
      !data.apellido ||
      !data.rut ||
      !data.telefono ||
      !data.address ||
      !data.comuna ||
      !data.region
    ) {
      alert("Debe ingresar usuario y contraseña");
      return;
    }

    const validEmail =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!validEmail.test(data.correo)){
      alert("El correo ingresado no es válido");
      return;
    }

    const validPhone = /^[0-9]+$/;
    if(!validPhone.test(data.telefono) || data.telefono.length < 9){
      alert("El teléfono ingresado no es válido");
      return;
    }

    e.preventDefault();
    setData(data);
    Api.registerPaciente(data)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === 200) {
          alert("Paciente creado correctamente");
          window.location.reload();
        } else {
          setData({});
          alert("Error en el registro: " + data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });

    document.getElementById("inputRegion").value = "Regiones";
  };

  useEffect(() => {
    if (localStorage.getItem("usuario")) {
      // const usuario = auth.usuario;
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      console.log("useEffect usuario", usuario);
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
    if (
      data.correo &&
      data.contrasena &&
      data.nombre &&
      data.apellido &&
      data.rut &&
      data.telefono &&
      data.address &&
      data.comuna &&
      data.region
    ) {
      setButtonAllowed(true);
    } else {
      setButtonAllowed(false);
    }
  }, [data]);

  useEffect(() => {
    setRegiones(regionesData.regiones);
  }, []);

  useEffect(() => {
    const region = data.region;
    const regionSelect = regiones
      .filter((e) => {
        return e.region === region;
      })
      .map((e) => {
        return e.comunas;
      });
    setComunas(regionSelect[0]);
  }, [data.region]);

  return (
    <>
      <div className="container-fluid w-100 rounded-5 bg-white">
        <div className="row">
          <div className="col-md-12 p-5">
            <h1 className="text-center">Crear paciente</h1>
          </div>
        </div>
        <form className="row g-3 p-3">
          <div className="col-12 d-flex">
            <FaMale
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
              id="inputNombre"
              onChange={onChangeNombre}
              placeholder="Nombre"
            />
          </div>
          <div className="col-12 d-flex">
            <FaMale
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
              id="inputApellido"
              onChange={onChangeApellido}
              placeholder="Apellido"
            />
          </div>
          <div className="col-12 d-flex">
            <FaIdCard
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
              id="inputRut"
              onChange={onChangeRut}
              placeholder="Rut"
              maxLength={12}
            />
          </div>
          <div className="col-12 d-flex">
            <FaPhoneAlt
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
              id="inputTelefonoPacienteAdmin"
              onChange={onChangeTelefono}
              placeholder="Telefono"
              maxLength={9}
            />
          </div>

          <div className="col-12 d-flex">
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
              placeholder="Direccion"
            />
          </div>
          <div className="col-12 d-flex">
            <FaIdCard
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <select
              className="form-control"
              id="inputRegion"
              onChange={onChangeRegion}
            >
              <option defaultValue>Selecciona una región...</option>
              {regiones.length > 0
                ? regiones.map((e, index) => {
                    return (
                      <option key={index} value={e.region}>
                        {e.region}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="col-12 d-flex">
            <FaIdCard
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <select
              className="form-control"
              id="inputComuna"
              onChange={onChangeComuna}
            >
              <option defaultValue>Selecciona una comuna...</option>
              {comunas &&
                comunas.map((e, index) => {
                  return (
                    <option key={index} value={e}>
                      {e}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-12 d-flex">
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
              id="inputEmail4"
              onChange={onChangeEmail}
              placeholder="Email"
            />
          </div>
          <div className="col-12 d-flex">
            <FaLock
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              onChange={onChangePassword}
              placeholder="Password"
            />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!buttonAllowed ? true : false}
              onClick={handleCick}
            >
              Registrar paciente
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistroPacienteForm;
