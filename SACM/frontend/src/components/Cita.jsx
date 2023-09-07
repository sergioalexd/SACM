import React, { useState, useEffect } from "react";
// crear componente con formulario con los campos de la cita

function Cita() {
  const [data, setData] = useState({});

  const token = localStorage.getItem("token");
  console.log("token", token);

  const onChangeFecha = (e) => {
    const fecha = e.target.value;
    console.log(fecha);
    setData({ ...data, fecha });
  };

  const onChangeHora = (e) => {
    const hora = e.target.value;
    console.log(hora);
    setData({ ...data, hora });
  };

  const onChangePaciente = (e) => {
    const idPaciente = e.target.value;
    setData({ ...data, idPaciente });
  };

  const onChangeParamedico = (e) => {
    const idParamedico = e.target.value;
    setData({ ...data, idParamedico });
  };

  const onChangeFicha = (e) => {
    const idFichaMedica = e.target.value;
    setData({ ...data, idFichaMedica });
  };

  const deleteData = () => {
    setData({});
    // limpiar los inputs del formulario
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = "";
    });
    };



  const handleCick = (e) => {
    e.preventDefault();
    console.log("data:", data);

    fetch("http://192.168.1.87:8080/api/v1/citas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === 200) {
          setData(data);
          deleteData();
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

//   useEffect(() => {
//     setData(data);
//     console.log("data useEffect", data);
//     }, [data]);

  return (
    <>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-12">
              <h1>Crear Cita</h1>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputFecha" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                id="inputFecha"
                onChange={onChangeFecha}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputHora" className="form-label">
                Hora
              </label>
              <input
                type="time"
                className="form-control"
                id="inputFHora"
                onChange={onChangeHora}
                list="horacita"
              />
              <datalist id="horacita">
                <option value="08:00" />
                <option value="09:00" />
                <option value="10:00" />
                <option value="11:00" />
                <option value="12:00" />
                <option value="13:00" />
                <option value="14:00" />
                <option value="15:00" />
                <option value="16:00" />
                <option value="17:00" />
                <option value="18:00" />
                <option value="19:00" />
                <option value="20:00" />
              </datalist>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPaciente" className="form-label">
                Id Paciente
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPaciente"
                onChange={onChangePaciente}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputParamedico" className="form-label">
                Id Paramédico
              </label>
              <input
                type="text"
                className="form-control"
                id="inputParamedico"
                onChange={onChangeParamedico}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputFicha" className="form-label">
                Id Ficha
              </label>
              <input
                type="text"
                className="form-control"
                id="inputFicha"
                onChange={onChangeFicha}
              />
            </div>
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCick}
            >
              Crear Cita
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cita;
