import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/GlobalContext";
import UpdateDataParamedico from "./UpdateDataParamedico";

function PerfilParamedico() {
  const [state] = useContext(AuthContext);
  const [isLogin, setIsLogging] = useState(false);
  const [profile, setProfile] = useState({});

  const [showCreate, setShowCreate] = useState(false);

  const showCreateHandle = (e) => {
    e.preventDefault();
    if (showCreate) {
      setShowCreate(false);
    } else {
      setShowCreate(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!token) {
      setIsLogging(false);
      return;
    }
    setProfile(user);
    setIsLogging(true);
  }, [state]);

  return (
    <div className="row">
      {!isLogin ? (
        <p>{"No estas logueado"}</p>
      ) : (
        <div
          className="col-12 p-5 text-black rounded-5"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="row">
            <div className="col-12">
              <img
                src="https://via.placeholder.com/75"
                alt="..."
                className="rounded-circle img-thumbnail img-fluid my-3"
              />
              <p className="fw-bold">
                {profile.name} {profile.lastName}
              </p>
              <p>{profile.telefono}</p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <p>Datos</p>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p>
                        <strong>Rut</strong>
                      </p>
                    </td>
                    <td>
                      <p className="fs-6">{profile.rut}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <strong>Correo</strong>
                      </p>
                    </td>
                    <td className="fs-6">
                      <p>{profile.email}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div className="row">
                <div className="col-12">
                  <p>
                    <strong>Dirección: </strong>{profile.address}, {profile.comuna}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 text-end">
            <button
              type="button"
              className="btn btn-primary my-3"
              onClick={showCreateHandle}
            >
              Modificar datos            </button>
          </div>
          {showCreate ? (
            <div className="col-12">
              <hr />
              <UpdateDataParamedico />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default PerfilParamedico;
