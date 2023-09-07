import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/GlobalContext";

function SignOut() {

    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(AuthContext);

    const navigate = useNavigate();


    const handleSignOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        dispatch({
          type: "LOGIN_OUT",
        });
        navigate("/");
        window.location.reload();
        
      };

  return (
    <>
     <div className="col-12">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </button>
          </div>
    </>
  )
}

export default SignOut