import { useNavigate } from "react-router-dom";
import img02 from "../../assets/02.jpg";
import img03 from "../../assets/03.jpg";   

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
            />
          </div>
          <div className="col-md-3">
            <img
              className="img-fluid img-thumbnail rounded-5"
              src={img02}
              alt="Agendamiento de visitas domiciliarias"
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
              <li className="p-1">Selecciona el tipo de cita</li>
              <li className="p-1">Selecciona la fecha</li>
              <li className="p-1">Ingresa tus datos</li>
              <li className="p-1">Recibe la confirmación de tu cita</li>
            </ul>
            <button className="btn btn-primary btn-lg" onClick={handleClick}>Agendar ahora</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgendarOverview;
