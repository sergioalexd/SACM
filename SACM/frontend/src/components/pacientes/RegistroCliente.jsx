import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/GlobalContext";
import Profile from "../Profile.jsx";
import Cita from "../Cita.jsx";
import {
  FaMale,
  FaIdCard,
  FaPhoneAlt,
  FaHouseUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";


function LoginForm() {
  const [data, setData] = useState([]);
  const [state, dispatch] = useContext(AuthContext);
  const [auth, setAuth] = useState({});
  const [isLogging, setIsLogging] = useState(false);
  const [buttonAllowed, setButtonAllowed] = useState(false);
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);

  const navigate = useNavigate();

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

    e.preventDefault();
    setData(data);
    fetch("http://localhost:4000/api/v1/pacientes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === 200) {
          setAuth(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.newPaciente));
        } else {
          setData({});
          alert("Error en el registro: " + data.msg);
          navigate("/login-paciente");
          
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

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setData({});
    setAuth({});
    dispatch({
      type: "LOGIN_OUT",
    });
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
  }, [auth, dispatch]);

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
    fetch("./src/data/regiones.json")
      .then((response) => (response.json()))
      .then((data) => setRegiones(data.regiones))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const region = data.region;
    const regionSelect = regiones.filter((e) => {
      return e.region === region;
    }).map((e) => {
      return e.comunas;
    })
    setComunas(regionSelect[0])
  }, [data.region, regiones])

  return (
    <>
      {isLogging ? (
        <div className="container-fluid">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          <Profile />
          <Cita />
        </div>
      ) : (
        // hacer un contenedor centrado con boostrap
        <div className="mx-auto bg-pink" style={{ width: "500px" }}>
          <form className="row g-3 px-5 text-dark-emphasis">
            <div className="col-12">
              <h1 className="text-dark-emphasis">Crea tu cuenta</h1>
            </div>
            <div className="col-12 d-flex">
              <FaMale
                style={{
                  color: "pink",
                  fontSize: "20px",
                  marginRight: "5px",
                  alignSelf: "center",
                }}
              />
              {/* <label htmlFor="inputNombre" className="form-label">
                Nombre
              </label> */}
              <input
                type="text"
                className="form-control"
                id="inputNombre"
                onChange={onChangeNombre}
                placeholder="Nombre"
              />
            </div>
            <div className="col-12 d-flex">
              {/* <label htmlFor="inputApellido" className="form-label">
                Apellido
              </label> */}
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
                  color: "pink",
                  fontSize: "20px",
                  marginRight: "5px",
                  alignSelf: "center",
                }}
              />
              {/* <label htmlFor="inputRut" className="form-label">
                Rut
              </label> */}
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
                style={{ color: "pink", fontSize: "20px", marginRight: "5px" }}
              />
              {/* <label htmlFor="inputTelefono" className="form-label">
                Telefono
              </label> */}
              <input
                type="text"
                className="form-control"
                id="inputTelefono"
                onChange={onChangeTelefono}
                placeholder="Telefono"
              />
            </div>

            <div className="col-12 d-flex">
              <FaHouseUser
                style={{ color: "pink", fontSize: "20px", marginRight: "5px" }}
              />
              {/* <label htmlFor="inputDireccion" className="form-label">
                Direccion
              </label> */}
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
                style={{ color: "pink", fontSize: "20px", marginRight: "5px" }}
              />
              {/* <label htmlFor="inputComuna" className="form-label">
                Comuna
              </label> */}
              <select
                className="form-control"
                id="inputRegion"
                onChange={onChangeRegion}
              >
                <option value="Regiones">Selecciona una región</option>
                {regiones.length > 0 ? regiones.map((e, index) => {
                  return (
                    <option key={index} value={e.region}>
                      {e.region}
                    </option>
                  );
                }): null}
              </select>
            </div>
            <div className="col-12 d-flex">
              <FaIdCard
                style={{ color: "pink", fontSize: "20px", marginRight: "5px" }}
              />
              {/* <label htmlFor="inputRegion" className="form-label">
                Region
              </label> */}
              <select
                className="form-control"
                id="inputComuna"
                onChange={onChangeComuna}
              >
                <option value="Comunas">Selecciona una comuna</option>
                {comunas && comunas.map((e, index) => {
                  return (
                    <option key={index} value={e}>
                      {e}
                    </option>
                  );
                })
                }
              </select>
            </div>
            <div className="col-12 d-flex">
              <FaEnvelope
                style={{ color: "pink", fontSize: "20px", marginRight: "5px" }}
              />
              {/* <label htmlFor="inputEmail4" className="form-label">
                Email
              </label> */}
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
                style={{ color: "pink", fontSize: "20px", marginRight: "5px" }}
              />
              {/* <label htmlFor="inputPassword4" className="form-label">
                Password
              </label> */}
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginForm;
