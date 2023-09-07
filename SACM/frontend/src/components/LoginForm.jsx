import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/GlobalContext.jsx";
import Profile from "./Profile.jsx";
import Cita from "./Cita.jsx";
import { Api } from "../services/api.js";

function LoginUser() {
  const [data, setData] = useState([]);
  //eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(AuthContext);
  const [auth, setAuth] = useState({});
  const [isLogging, setIsLogging] = useState(false);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    console.log(email);
    setData({ ...data, email });
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setData({ ...data, password });
  };

  const handleCick = (e) => {
    if (!data.email || !data.password) {
      alert("Debe ingresar usuario y contraseña");
      return;
    }
    e.preventDefault();
    setData(data);
    Api.loginUser(data)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === 200) {
          setAuth(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    document.getElementById("inputEmail4").value = "";
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
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                onChange={onChangeEmail}
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

export default LoginUser;
