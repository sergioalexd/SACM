import { useEffect, useState } from "react";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.idParamedico) {
      setIsLogged(true);
    }
    setIsLogged(false);
  }, []);

  return (
    <>
      <ProtectedRoute
        paramedico={isLogged}
        redirecTo="/admin/login-paramedico"
      />
    </>
  );
}

export default App;
