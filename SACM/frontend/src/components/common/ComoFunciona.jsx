import {
  FaCalendar,
  FaLocationArrow,
  FaTired,
  FaWhatsappSquare,
} from "react-icons/fa";

function ComoFunciona() {
  return (
    <>
    <div className="container-fluid p-1" style={{ backgroundColor: "#d4dadf" }}>
    <div className="row mx-5">
        <div className="col-12 my-3">
          <h1
            className="d-flex justify-content-center fw-bold"
            style={{
              color: "#135488",
              fontSize: "3em",
              lineHeight: "1",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Cómo funciona
          </h1>
        </div>
      </div>
      <div className="row mx-3 d-flex justify-content-center">
        <div className="col-md-6 col-lg-4 rounded-3 bg-white p-3 mx-1 my-1">
          <FaTired
            style={{
              fontSize: "100px",
              textAlign: "center",
              color: "#2b7fbf",
            }}
            className="p-3"
          />
          <h4>Indicanos la gravedad</h4>
          <p>Escoge el nivel de gravedad del paciente</p>
        </div>
        <div className="col-md-6 col-lg-4 rounded-3 bg-white p-3 mx-1 my-1">
          <FaLocationArrow
            style={{
              fontSize: "100px",
              textAlign: "center",
              color: "#2b7fbf",
            }}
            className="p-3"
          />
          <h4>Indicanos tu dirección</h4>
          <p>Para verficar diponibilidad de atención en tu domicilio</p>
        </div>
        </div>
        <div className="row mx-3 d-flex justify-content-center">
        <div className="col-md-6 col-lg-4 rounded-3 bg-white p-3 mx-1 my-1">
          <FaCalendar
            style={{
              fontSize: "100px",
              textAlign: "center",
              color: "#2b7fbf",
            }}
            className="p-3"
          />
          <h4>Consulta disponibilidad de citas</h4>
          <p>Escoge la hora que mas te acomode dentro de la disponibilidad</p>
        </div>
        <div className="col-md-6 col-lg-4 rounded-3 bg-white p-3 mx-1 my-1">
          <FaWhatsappSquare
            style={{
              fontSize: "100px",
              textAlign: "center",
              color: "#2b7fbf",
            }}
            className="p-3"
          />
          <h4>Recibe la confirmación de tu cita</h4>
          <p>Te neviaremos un recordatorio de tu cita al correo electrónico</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default ComoFunciona;
