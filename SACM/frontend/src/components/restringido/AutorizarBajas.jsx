import { useState, useEffect } from "react";
import { Api } from "../../services/api";


function AutorizarBajas() {
const [bajas, setBajas] = useState([])

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    Api.getAtencionesPendientesDeBaja(token)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setBajas(data.atenciones)
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

    const handleAutorizar = (e) => {
        const token = localStorage.getItem("token");
        if (!token) {
        return;
        }
        const id = e.target.value;
        
        Api.autorizarBajaAtencionMedica(id, token)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
            alert(data.msg);
            window.location.reload();
            } else {
            alert(data.msg);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    console.log(bajas)
  return (
    <div className="col">
        {
            bajas.length !== 0 ? bajas.map((baja) => (
                <div className="card mb-3" key={baja.idAtencion}>
                    <div className="card-body">
                        <h5 className="card-title">Paciente: {baja.Citum.Paciente.name} {baja.Citum.Paciente.lastName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Paramédico: {baja.Citum.Paramedico.name} {baja.Citum.Paramedico.lastName}</h6>
                        <p className="card-text">Fecha de la cita: {baja.Citum.fecha}</p>
                        <br/>
                        <p className="card-text">Autorizar baja de ficha médica</p>
                        <button className="btn btn-primary" onClick={handleAutorizar} value={baja.idAtencion}>Autorizar</button>

                    </div>
                </div>
            )) : <div className="alert alert-danger" role="alert">
            No hay bajas pendientes por gestionar
            </div>
        }

    
    
    
    </div>
  )
}

export default AutorizarBajas;