import { createBrowserRouter } from "react-router-dom";
import CreatePaciente from "../components/pacientes/RegistroCliente";
import LoginForm from "../components/pacientes/LoginForm";



const router = createBrowserRouter([
    {
      path: "/login-paciente",
      element: <LoginForm />,
    },
    {
        path: "/create-paciente",
        element: <CreatePaciente/>,
    },
    {
        path: "*",
        element: <h1>404</h1>,
    }
  ]);

export default router;