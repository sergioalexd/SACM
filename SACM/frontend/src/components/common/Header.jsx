import NavBar from "./NavBar";
import img1 from "../../assets/01.jpg"
import Cita from "../Cita";

function Header() {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-12"
            style={{ backgroundColor: "#135488" }}
            >
                <NavBar />
            </div>
        </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 p-5 ">
          <div className="row">
            <div className="col-6">
              <h4>Centro Médico</h4>
            </div>
          </div>
          <div className="row overflow-hidden">
            <div className="col-12 p-3 text-wrap">
              <h1 className="fw-bold"
              style={{ color: "#135488", fontSize: "4em", lineHeight: "1",
              fontFamily: "Roboto, sans-serif"
            
            }}
              >Agende su visita domiciliaria en pocos clicks</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>Consulta una hora</p>
            </div>
          </div>
          <Cita />
          {/* aqui va el fomulario de 3 campos */}
          {/* <form className="row g-3 border border-1 p-3 my-3">
            <div className="col-6">
              <label htmlFor="inputType" className="form-label">
                Tipo de visita
              </label>
              <select
                id="inputType"
                className="form-select"
                // onChange={onChangeEmail}
              >
                <option defaultValue>Selecciona...</option>
                <option value="CONSULTA">Consulta</option>
                <option value="TRATAMIENTO">Tratamiento</option>
                <option value="APOYO MÉDICO">Apoyo médico</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                id="inputFecha"
                //onChange={onChangeFecha}
              />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                // onClick={handleCick}
              >
                Buscar
              </button>
            </div>
          </form> */}
        </div>
        <div
        //   className="col-md-6 p-5 d-none d-md-block"
        className="col-md-6 p-5 bg-primary bg-gradient align-items-center"
          style={{ backgroundColor: "#135488" }}
        >
          <div className="row">
            <div className="col-12">
              <img
                className="img-fluid img-thumbnail rounded-5 d-inline-block"
                src={img1}
                alt="Agendamiento de visitas domiciliarias"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
