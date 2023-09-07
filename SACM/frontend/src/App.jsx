import "./App.css";
import { UserContextProvider } from "./context/GlobalContext.jsx";
import RegistroCliente from "./components/pacientes/RegistroPacienteForm.jsx";

function App() {
  return (
    <>
      <UserContextProvider>
        {/* <LoginForm /> */}
        <RegistroCliente />
      </UserContextProvider>
    </>
  );
}

export default App;
