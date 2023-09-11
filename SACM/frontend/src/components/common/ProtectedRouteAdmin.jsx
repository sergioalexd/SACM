import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ProtectedRouteAdmin = ({admin, redirecTo = "/admin/restringido/login"}) => {
  
  if (!admin) {
  return <Navigate to={redirecTo} />;
  }
  return <Outlet />;
};
