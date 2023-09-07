// componente para mostrar error 404 de rutas no encontradas que incluya un link para volver al inicio

import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-12">
            <h1>Error 404</h1>
            <p>La ruta no existe</p>
            <Link to="/">Te invito a volver al inicio para que puedas encontrar información relevante</Link>
            </div>
        </div>
        </div>
    );
    };

export default Error404;