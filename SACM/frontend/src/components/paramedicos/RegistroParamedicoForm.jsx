import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/GlobalContext";
import {
  FaMale,
  FaIdCard,
  FaPhoneAlt,
  FaHouseUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Api } from "../../services/api";

function RegistroParamedicoForm() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(AuthContext);
  const [auth, setAuth] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isLogging, setIsLogging] = useState(false);
  const [buttonAllowed, setButtonAllowed] = useState(false);
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);

  const regionesData = {
    regiones: [
      {
        region: "Arica y Parinacota",
        comunas: ["Arica", "Camarones", "Putre", "General Lagos"],
      },
      {
        region: "Tarapacá",
        comunas: [
          "Iquique",
          "Alto Hospicio",
          "Pozo Almonte",
          "Camiña",
          "Colchane",
          "Huara",
          "Pica",
        ],
      },
      {
        region: "Antofagasta",
        comunas: [
          "Antofagasta",
          "Mejillones",
          "Sierra Gorda",
          "Taltal",
          "Calama",
          "Ollagüe",
          "San Pedro de Atacama",
          "Tocopilla",
          "María Elena",
        ],
      },
      {
        region: "Atacama",
        comunas: [
          "Copiapó",
          "Caldera",
          "Tierra Amarilla",
          "Chañaral",
          "Diego de Almagro",
          "Vallenar",
          "Alto del Carmen",
          "Freirina",
          "Huasco",
        ],
      },
      {
        region: "Coquimbo",
        comunas: [
          "La Serena",
          "Coquimbo",
          "Andacollo",
          "La Higuera",
          "Paiguano",
          "Vicuña",
          "Illapel",
          "Canela",
          "Los Vilos",
          "Salamanca",
          "Ovalle",
          "Combarbalá",
          "Monte Patria",
          "Punitaqui",
          "Río Hurtado",
        ],
      },
      {
        region: "Valparaíso",
        comunas: [
          "Valparaíso",
          "Casablanca",
          "Concón",
          "Juan Fernández",
          "Puchuncaví",
          "Quintero",
          "Viña del Mar",
          "Isla de Pascua",
          "Los Andes",
          "Calle Larga",
          "Rinconada",
          "San Esteban",
          "La Ligua",
          "Cabildo",
          "Papudo",
          "Petorca",
          "Zapallar",
          "Quillota",
          "Calera",
          "Hijuelas",
          "La Cruz",
          "Nogales",
          "San Antonio",
          "Algarrobo",
          "Cartagena",
          "El Quisco",
          "El Tabo",
          "Santo Domingo",
          "San Felipe",
          "Catemu",
          "Llaillay",
          "Panquehue",
          "Putaendo",
          "Santa María",
          "Quilpué",
          "Limache",
          "Olmué",
          "Villa Alemana",
        ],
      },
      {
        region: "Región del Libertador Gral. Bernardo O’Higgins",
        comunas: [
          "Rancagua",
          "Codegua",
          "Coinco",
          "Coltauco",
          "Doñihue",
          "Graneros",
          "Las Cabras",
          "Machalí",
          "Malloa",
          "Mostazal",
          "Olivar",
          "Peumo",
          "Pichidegua",
          "Quinta de Tilcoco",
          "Rengo",
          "Requínoa",
          "San Vicente",
          "Pichilemu",
          "La Estrella",
          "Litueche",
          "Marchihue",
          "Navidad",
          "Paredones",
          "San Fernando",
          "Chépica",
          "Chimbarongo",
          "Lolol",
          "Nancagua",
          "Palmilla",
          "Peralillo",
          "Placilla",
          "Pumanque",
          "Santa Cruz",
        ],
      },
      {
        region: "Región del Maule",
        comunas: [
          "Talca",
          "Constitución",
          "Curepto",
          "Empedrado",
          "Maule",
          "Pelarco",
          "Pencahue",
          "Río Claro",
          "San Clemente",
          "San Rafael",
          "Cauquenes",
          "Chanco",
          "Pelluhue",
          "Curicó",
          "Hualañé",
          "Licantén",
          "Molina",
          "Rauco",
          "Romeral",
          "Sagrada Familia",
          "Teno",
          "Vichuquén",
          "Linares",
          "Colbún",
          "Longaví",
          "Parral",
          "Retiro",
          "San Javier",
          "Villa Alegre",
          "Yerbas Buenas",
        ],
      },
      {
        region: "Región de Ñuble",
        comunas: [
          "Cobquecura",
          "Coelemu",
          "Ninhue",
          "Portezuelo",
          "Quirihue",
          "Ránquil",
          "Treguaco",
          "Bulnes",
          "Chillán Viejo",
          "Chillán",
          "El Carmen",
          "Pemuco",
          "Pinto",
          "Quillón",
          "San Ignacio",
          "Yungay",
          "Coihueco",
          "Ñiquén",
          "San Carlos",
          "San Fabián",
          "San Nicolás",
        ],
      },
      {
        region: "Región del Biobío",
        comunas: [
          "Concepción",
          "Coronel",
          "Chiguayante",
          "Florida",
          "Hualqui",
          "Lota",
          "Penco",
          "San Pedro de la Paz",
          "Santa Juana",
          "Talcahuano",
          "Tomé",
          "Hualpén",
          "Lebu",
          "Arauco",
          "Cañete",
          "Contulmo",
          "Curanilahue",
          "Los Álamos",
          "Tirúa",
          "Los Ángeles",
          "Antuco",
          "Cabrero",
          "Laja",
          "Mulchén",
          "Nacimiento",
          "Negrete",
          "Quilaco",
          "Quilleco",
          "San Rosendo",
          "Santa Bárbara",
          "Tucapel",
          "Yumbel",
          "Alto Biobío",
        ],
      },
      {
        region: "Región de la Araucanía",
        comunas: [
          "Temuco",
          "Carahue",
          "Cunco",
          "Curarrehue",
          "Freire",
          "Galvarino",
          "Gorbea",
          "Lautaro",
          "Loncoche",
          "Melipeuco",
          "Nueva Imperial",
          "Padre las Casas",
          "Perquenco",
          "Pitrufquén",
          "Pucón",
          "Saavedra",
          "Teodoro Schmidt",
          "Toltén",
          "Vilcún",
          "Villarrica",
          "Cholchol",
          "Angol",
          "Collipulli",
          "Curacautín",
          "Ercilla",
          "Lonquimay",
          "Los Sauces",
          "Lumaco",
          "Purén",
          "Renaico",
          "Traiguén",
          "Victoria",
        ],
      },
      {
        region: "Región de Los Ríos",
        comunas: [
          "Valdivia",
          "Corral",
          "Lanco",
          "Los Lagos",
          "Máfil",
          "Mariquina",
          "Paillaco",
          "Panguipulli",
          "La Unión",
          "Futrono",
          "Lago Ranco",
          "Río Bueno",
        ],
      },
      {
        region: "Región de Los Lagos",
        comunas: [
          "Puerto Montt",
          "Calbuco",
          "Cochamó",
          "Fresia",
          "Frutillar",
          "Los Muermos",
          "Llanquihue",
          "Maullín",
          "Puerto Varas",
          "Castro",
          "Ancud",
          "Chonchi",
          "Curaco de Vélez",
          "Dalcahue",
          "Puqueldón",
          "Queilén",
          "Quellón",
          "Quemchi",
          "Quinchao",
          "Osorno",
          "Puerto Octay",
          "Purranque",
          "Puyehue",
          "Río Negro",
          "San Juan de la Costa",
          "San Pablo",
          "Chaitén",
          "Futaleufú",
          "Hualaihué",
          "Palena",
        ],
      },
      {
        region: "Región Aisén del Gral. Carlos Ibáñez del Campo",
        comunas: [
          "Coihaique",
          "Lago Verde",
          "Aisén",
          "Cisnes",
          "Guaitecas",
          "Cochrane",
          "O’Higgins",
          "Tortel",
          "Chile Chico",
          "Río Ibáñez",
        ],
      },
      {
        region: "Región de Magallanes y de la Antártica Chilena",
        comunas: [
          "Punta Arenas",
          "Laguna Blanca",
          "Río Verde",
          "San Gregorio",
          "Cabo de Hornos (Ex Navarino)",
          "Antártica",
          "Porvenir",
          "Primavera",
          "Timaukel",
          "Natales",
          "Torres del Paine",
        ],
      },
      {
        region: "Región Metropolitana de Santiago",
        comunas: [
          "Cerrillos",
          "Cerro Navia",
          "Conchalí",
          "El Bosque",
          "Estación Central",
          "Huechuraba",
          "Independencia",
          "La Cisterna",
          "La Florida",
          "La Granja",
          "La Pintana",
          "La Reina",
          "Las Condes",
          "Lo Barnechea",
          "Lo Espejo",
          "Lo Prado",
          "Macul",
          "Maipú",
          "Ñuñoa",
          "Pedro Aguirre Cerda",
          "Peñalolén",
          "Providencia",
          "Pudahuel",
          "Quilicura",
          "Quinta Normal",
          "Recoleta",
          "Renca",
          "Santiago",
          "San Joaquín",
          "San Miguel",
          "San Ramón",
          "Vitacura",
          "Puente Alto",
          "Pirque",
          "San José de Maipo",
          "Colina",
          "Lampa",
          "Tiltil",
          "San Bernardo",
          "Buin",
          "Calera de Tango",
          "Paine",
          "Melipilla",
          "Alhué",
          "Curacaví",
          "María Pinto",
          "San Pedro",
          "Talagante",
          "El Monte",
          "Isla de Maipo",
          "Padre Hurtado",
          "Peñaflor",
        ],
      },
    ],
  };

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    const correo = e.target.value;
    console.log(correo);
    setData({ ...data, correo });
  };

  const onChangePassword = (e) => {
    const contrasena = e.target.value;
    setData({ ...data, contrasena });
  };

  const onChangeNombre = (e) => {
    const nombre = e.target.value;
    setData({ ...data, nombre });
  };

  const onChangeApellido = (e) => {
    const apellido = e.target.value;
    setData({ ...data, apellido });
  };

  const onChangeRut = (e) => {
    const rutInput = e.target.value;

    let actual = rutInput.replace(/^0+/, "");
    if (actual != "" && actual.length > 1) {
      let sinPuntos = actual.replace(/\./g, "");
      let actualLimpio = sinPuntos.replace(/-/g, "");
      let inicio = actualLimpio.substring(0, actualLimpio.length - 1);
      let rut = "";
      let i = 0;
      let j = 1;
      for (i = inicio.length - 1; i >= 0; i--) {
        let letra = inicio.charAt(i);
        rut = letra + rut;
        if (j % 3 == 0 && j <= inicio.length - 1) {
          rut = "." + rut;
        }
        j++;
      }
      let dv = actualLimpio.substring(actualLimpio.length - 1);
      rut = rut + "-" + dv;

      e.target.value = rut;
      console.log(rut.length);

      setData({ ...data, rut });
    }
  };

  const onChangeTelefono = (e) => {
    const telefono = e.target.value;
    setData({ ...data, telefono });
  };

  const onChangeDireccion = (e) => {
    const address = e.target.value;
    setData({ ...data, address });
  };

  const onChangeComuna = (e) => {
    const comuna = e.target.value;
    setData({ ...data, comuna });
  };

  const onChangeRegion = (e) => {
    const region = e.target.value;
    setData({ ...data, region });
  };

  const handleCick = (e) => {
    if (
      !data.correo ||
      !data.contrasena ||
      !data.nombre ||
      !data.apellido ||
      !data.rut ||
      !data.telefono ||
      !data.address ||
      !data.comuna ||
      !data.region
    ) {
      alert("Debe ingresar usuario y contraseña");
      return;
    }

    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if(!validEmail.test(data.correo)){
      alert("El correo ingresado no es válido");
      return;
    }

    const validPhone = /^[0-9]+$/;
    if(!validPhone.test(data.telefono)){
      alert("El teléfono ingresado no es válido");
      return;
    }

    e.preventDefault();
    setData(data);
    Api.registerPaciente(data)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === 200) {
          setAuth(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.newPaciente));
        } else {
          setData({});
          alert("Error en el registro: " + data.msg);
          navigate("/login-paciente");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });

    document.getElementById("inputRegion").value = "Regiones";
  };

   useEffect(() => {
    if (localStorage.getItem("usuario")) {
      // const usuario = auth.usuario;
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      console.log("useEffect usuario", usuario);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { usuario },
      });
    } else {
      dispatch({
        type: "LOGIN_FAILED",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }
    const usuarioLog = localStorage.getItem("usuario");

    if (!usuarioLog) {
      setIsLogging(false);
    } else {
      setIsLogging(true);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (
      data.correo &&
      data.contrasena &&
      data.nombre &&
      data.apellido &&
      data.rut &&
      data.telefono &&
      data.address &&
      data.comuna &&
      data.region
    ) {
      setButtonAllowed(true);
    } else {
      setButtonAllowed(false);
    }
  }, [data]);

  useEffect(() => {
    setRegiones(regionesData.regiones);
  }, []);

  useEffect(() => {
    const region = data.region;
    const regionSelect = regiones
      .filter((e) => {
        return e.region === region;
      })
      .map((e) => {
        return e.comunas;
      });
    setComunas(regionSelect[0]);
  }, [data.region]);

  return (
    <>
      <div className="container-fluid w-100 rounded-5 bg-white">
        <div className="row">
          <div className="col-md-12 p-5">
            <h1 className="text-center">Registro de paciente</h1>
          </div>
        </div>
        <form className="row g-3 p-3">
          <div className="col-12 d-flex">
            <FaMale
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="text"
              className="form-control"
              id="inputNombre"
              onChange={onChangeNombre}
              placeholder="Nombre"
            />
          </div>
          <div className="col-12 d-flex">
            <FaMale
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="text"
              className="form-control"
              id="inputApellido"
              onChange={onChangeApellido}
              placeholder="Apellido"
            />
          </div>
          <div className="col-12 d-flex">
            <FaIdCard
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="text"
              className="form-control"
              id="inputRut"
              onChange={onChangeRut}
              placeholder="Rut"
              maxLength={12}
            />
          </div>
          <div className="col-12 d-flex">
            <FaPhoneAlt
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="text"
              className="form-control"
              id="inputTelefono"
              onChange={onChangeTelefono}
              placeholder="Telefono"
            />
          </div>

          <div className="col-12 d-flex">
            <FaHouseUser
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="text"
              className="form-control"
              id="inputDireccion"
              onChange={onChangeDireccion}
              placeholder="Direccion"
            />
          </div>
          <div className="col-12 d-flex">
            <FaIdCard
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <select
              className="form-control"
              id="inputRegion"
              onChange={onChangeRegion}
            >
              <option defaultValue>Selecciona una región...</option>
              {regiones.length > 0
                ? regiones.map((e, index) => {
                    return (
                      <option key={index} value={e.region}>
                        {e.region}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="col-12 d-flex">
            <FaIdCard
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <select
              className="form-control"
              id="inputComuna"
              onChange={onChangeComuna}
            >
              <option defaultValue>Selecciona una comuna...</option>
              {comunas &&
                comunas.map((e, index) => {
                  return (
                    <option key={index} value={e}>
                      {e}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-12 d-flex">
            <FaEnvelope
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              onChange={onChangeEmail}
              placeholder="Email"
            />
          </div>
          <div className="col-12 d-flex">
            <FaLock
              style={{
                color: "blue",
                fontSize: "20px",
                marginRight: "5px",
                alignSelf: "center",
              }}
            />
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              onChange={onChangePassword}
              placeholder="Password"
            />
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!buttonAllowed ? true : false}
              onClick={handleCick}
            >
              Registrar paciente
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegistroParamedicoForm;
