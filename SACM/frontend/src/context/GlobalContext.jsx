// importamos React junto a useReducer y createContext
import { useReducer, createContext } from "react";

// Recuerda que para acceder a nuestro contexto desde multiples lugares de
// nuestra app, deberemos exportarlo
export const AuthContext = createContext();

// Aquí vamos a crear el estado inicial que tendrá el context y consumiremos con
// useReducer
const initialState = { user: {}, isLogging: false, pacientesList: [] };

// Este será nuestro reducer que nos ayudará a crear o eliminar los productos
// dependiendo el action.type que reciba
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        state: {isLogging: true, user: action.payload },
      };
    case "LOGIN_FAILED":
      return {
        state: {isLogging: false, user: {}}
      };
      case "LOGIN_OUT":
      return {
        state: {isLogging: false, user: {}}
      };
    case "GET_PACIENTES":
      return {
        ...state,
        pacientesList: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

// De igual forma, exportaremos el provider que envolvera todos los componentes
// de nuestra app
// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Dentro del value del provider colocaremos el state y el dispatch para
  // manejar el estado global
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
