import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/GlobalContext";
import Profile from "../Profile.jsx";
import Cita from "../Cita.jsx";

function LoginForm() {
  const [data, setData] = useState([]);
  const [state, dispatch] = useContext(AuthContext);
  const [auth, setAuth] = useState({});
  const [isLogging, setIsLogging] = useState(false);

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

  const onChangePassword = (e) => {
    const password = e.target.value;
    setData({ ...data, password });
  };

  const handleCick = (e) => {
    if (!data.rut || !data.password) {
      alert("Debe ingresar usuario y contraseña");
      return;
    }
    e.preventDefault();
    setData(data);
    fetch("http://localhost:4000/api/v1/pacientes/login", {
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
          localStorage.setItem("usuario", JSON.stringify(data.paciente));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    document.getElementById("inputRut").value = "";
    document.getElementById("inputPassword4").value = "";
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

  return (
    <>
      {isLogging ? (
        <div className="col-12">
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
        <div>
          <form className="row g-3">
          <div className="col-12 d-flex">
              
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
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                onChange={onChangePassword}
              />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
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
