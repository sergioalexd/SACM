import { createBrowserRouter } from "react-router-dom";
import PacientePage from "../components/pacientes/PacientePage";
import LoginUser from "../components/LoginForm";
import LoginPagePaciente from "../components/pacientes/LoginPagePaciente";
import RegisterPagePaciente from "../components/pacientes/RegisterPagePaciente";
import Error404 from "../components/common/404";
import Home from "../components/layout/Home";
import ParamedicoPage from "../components/paramedicos/ParamedicoPage";
import LoginPageParamedico from "../components/paramedicos/LoginPageParamedico";
import { ProtectedRoute } from "../components/common/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pacientes",
    element: <PacientePage />,
  },
  {
    path: "/login-paciente",
    element: <LoginPagePaciente />,
  },
  {
    path: "/login",
    element: <LoginUser />,
  },
  {
    path: "/registro-paciente",
    element: <RegisterPagePaciente />,
  },
  {
    element: <ProtectedRoute paramedico={
      JSON.parse(localStorage.getItem("usuario")) ? JSON.parse(localStorage.getItem("usuario"))?.idParamedico : false
    } />,
    children: [
      {
        path: "/admin/paramedicos",
        element: <ParamedicoPage />,
      },
    ],
  },
  {
    path: "/admin/login-paramedico",
    element: <LoginPageParamedico />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
