import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/api";
import { FaIdCard, FaLock } from "react-icons/fa";

function LoginFormAdmin() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(AuthContext);
  const [auth, setAuth] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isLogging, setIsLogging] = useState(false);

  const navigate = useNavigate();

  const onChangePassword = (e) => {
    const password = e.target.value;
    setData({ ...data, password });
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setData({ ...data, email });
  };

  const handleCick = (e) => {
    if (!data.email || !data.password) {
      document.getElementById("evento").innerHTML =
        "Debe ingresar usuario y contraseña";
      return;
    }
    e.preventDefault();
    setData(data);
    Api.loginUser(data)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setAuth(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          document.getElementById("evento-success").innerHTML =
            "Admin logueado correctamente";
          window.location.reload();
        } else {
          document.getElementById("evento").innerHTML = data.msg;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    document.getElementById("inputRut").value = "";
    document.getElementById("inputPassword4").value = "";
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
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    const usuarioLog = localStorage.getItem("usuario");

    if (!usuarioLog) {
      setIsLogging(false);
    } else {
      setIsLogging(true);
      navigate("/admin/restringido");
    }
  }, [isLogging, navigate]);

  return (
    <>
      <div className="container-fluid w-100 rounded-5 bg-white">
        <div className="row">
          <div className="col-md-12 p-5">
            <h1 className="text-center">Accede a tu cuenta de administrador</h1>
          </div>
        </div>
        <form className="row g-3 p-3">
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
              onChange={onChangeEmail}
              placeholder="Correo"
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
              placeholder="Contraseña"
              onChange={onChangePassword}
            />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCick}
            >
              Acceder
            </button>
          </div>
          <span
            className="text-danger text-align-center p-3"
            id="evento"
          ></span>
          <span
            className="text-success text-align-center p-3"
            id="evento-success"
          ></span>
        </form>
      </div>
    </>
  );
}

export default LoginFormAdmin;
