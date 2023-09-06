import "./App.css";
import LoginForm from "./components/LoginForm";
import { UserContextProvider } from "./context/GlobalContext.jsx";

function App() {
  return (
    <>
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    </>
  );
}

export default App;
