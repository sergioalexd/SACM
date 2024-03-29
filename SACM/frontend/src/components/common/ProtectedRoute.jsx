import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({paramedico, redirecTo = "/"}) => {
  
  if (!paramedico) {
  return <Navigate to={redirecTo} />;
  }
  return <Outlet />;
};
