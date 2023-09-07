import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({paramedico, redirecTo = "/"}) => {
  // const [paramedico, setParamedico] = useState(false);

  // useEffect(() => {
  //   const usuario = JSON.parse(localStorage.getItem("usuario"));
  //   if (!usuario) {
  //     return;
  //   } 
  //   console.log("ProtectedRoute", usuario)
  //   console.log("ProtectedRoute", usuario.idParamedico)
  //   console.log("ProtectedRoute", paramedico)
  //   if (usuario.idParamedico.length > 0) {
  //     setParamedico(true);
  //   }
  //   setParamedico(false);
  // }, [paramedico]);
  
  if (!paramedico) {
  return <Navigate to={redirecTo} />;
  }
  return <Outlet />;
};
