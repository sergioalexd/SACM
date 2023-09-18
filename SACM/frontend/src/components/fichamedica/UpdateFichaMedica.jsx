import { useState, useEffect } from "react";
import { Api } from "../../services/api";


// eslint-disable-next-line react/prop-types
function UpdateFichaMedica({idFichaMedica, idAtencion}) {
  const [data, setData] = useState({});

  const updateFicha = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    if (!data.descripcion && !data.parametrosClinicos && !data.diagnostico && !data.indicaciones) {
      alert("Debe ingresar todos los campos para completar la ficha medica");
      return;
    }

    Api.updateFichaMedica(idFichaMedica, token, data)
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
  };

  useEffect(() => {
    setData({ ...data, idAtencion: idAtencion });
    }, [idAtencion]);


  return (
    <div>
      <div className="row">
        <div className="col-12">
          <form className="row g-3 border border-0 p-3 my-1 bg-light rounded">
            <div className="col-md-12 d-flex flex-column">
              <label htmlFor="inputDescripcion" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="inputDescripcion"
                rows="2"
                cols="5"
                onChange={(e) =>
                  setData({ ...data, descripcion: e.target.value })
                }             
                
              ></textarea>
            </div>
            <div className="col-md-12 d-flex flex-column">
              <label htmlFor="inputParametros" className="form-label">
                Parámetros clínicos
              </label>
              <textarea
                className="form-control"
                id="inputParametros"
                rows="2"
                onChange={(e) =>
                  setData({ ...data, parametrosClinicos: e.target.value })
                }
              ></textarea>
            </div>
            <div className="col-md-12 d-flex flex-column ">
              <label htmlFor="inputDiagnostico" className="form-label">
                Diagnóstico
              </label>
              <textarea
                className="form-control"
                id="inputDiagnostico"
                rows="2"
                onChange={(e) =>
                  setData({ ...data, diagnostico: e.target.value })
                }
              ></textarea>
            </div>
            <div className="col-md-12 d-flex flex-column">
              <label htmlFor="inputIndicaciones" className="form-label">
                Indicaciones
              </label>
              <textarea
                className="form-control"
                id="inputIndicaciones"
                rows="2"
                onChange={(e) =>
                  setData({ ...data, indicaciones: e.target.value })
                }
              ></textarea>
            </div>

            <br />
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateFicha}
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateFichaMedica;
