import { useNavigate } from "react-router-dom";
import img02 from "../../assets/06.jpg";
import img03 from "../../assets/07.jpg";   

function AgendarOverview() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/pacientes");
    }

  return (
    <>
      <div
        className="container-fluid p-5"
        style={{ backgroundColor: "#BFD8ED" }}
      >
        <div className="row">
          <div className="col-md-3">
            <img
              className="img-fluid img-thumbnail rounded-5"
              src={img03}
              alt="Agendamiento de visitas domiciliarias"
              width="350"
            />
          </div>
          <div className="col-md-3">
            <img
              className="img-fluid img-thumbnail rounded-5"
              src={img02}
              alt="Agendamiento de visitas domiciliarias"
              width="350"
            />
          </div>
          <div className="col-md-6 text-white">
            <h1
              className="p-3 fw-bold"
              style={{
                color: "#135488",
                fontSize: "3em",
                lineHeight: "1",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Agendar una VDI nunca fue tan fácil
            </h1>
            <ul style={{ listStyle: "none" }}>
              <li className="p-1 custom-list-item">Crea tu cuenta</li>
              <li className="p-1 custom-list-item">Selecciona la Fecha</li>
              <li className="p-1 custom-list-item">Selecciona la Hora</li>
              <li className="p-1 custom-list-item">Elige a uno de nuestro Paramédicos</li>
              <li className="p-1 custom-list-item">Recibe la confirmación de tu cita</li>
              <li className="p-1 custom-list-item"></li>
              <li className="p-1 custom-list-item"></li>
            </ul>
            <div className="text-center">
              <button className="btn btn-primary btn-lg" onClick={handleClick}>Agendar ahora</button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgendarOverview;
