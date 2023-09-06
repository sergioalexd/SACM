// crear componente para mostrar el perfil del usuario componente funcional

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/GlobalContext";

function Profile() {
  const state = useContext(AuthContext);
  const [isLogin, setIsLogging] = useState(false);


  console.log("isLogging", state[0].state.isLogging);
  console.log("user", state[0].state.user);

  const [profile, setProfile] = useState({});
  useEffect(() => {
    setProfile(state[0].state.user.usuario);
    setIsLogging(state[0].state.isLogging);
  }, [state]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Perfil</h1>

          <div>
            {!isLogin ? (
              <p>{"No estas logueado"}</p>
            ) : (
              <div>
                <p>Nombre: {profile.name}</p>
                <p>Apellido: {profile.lastName}</p>
                <p>Email: {profile.email}</p>
                <p>Rol: {profile.rol}</p>
                <p>id: {profile.idUser}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
