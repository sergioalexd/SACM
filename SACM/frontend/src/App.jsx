import "./App.css";
import LoginForm from "./components/LoginForm";
import { UserContextProvider } from "./context/GlobalContext.jsx";
import RegistroCliente from "./components/pacientes/RegistroCliente.jsx";

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
