import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/GlobalContext";

function PerfilCliente() {
  const [state] = useContext(AuthContext);
  const [isLogin, setIsLogging] = useState(false);
  const [profile, setProfile] = useState({});

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
          <div className="row py-1">
            <div className="col-12">
              <img
                src="https://via.placeholder.com/100"
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
              <p>Información del paciente</p>
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
                      <p>&nbsp;{profile.email}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div className="row">
                <div className="col-12">
                  <p>
                    <strong>Dirección</strong>
                  </p>
                  <p>{profile.address}, {profile.comuna}</p>                                  
                </div>
              </div>
            </div>
          </div>
          <div className="row py-5">
            <div className="col-12">
              <h4>Ultima visita</h4>
              <p>Fecha</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilCliente;
