const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const bodyParser = require("body-parser");
const { conn } = require("../../src/database/conexion.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.paths = {
      frontend: "/front",
      usuarios: "/api/v1/usuarios",
      citas: "/api/v1/citas",
      pacientes: "/api/v1/pacientes",
      paramedicos: "/api/v1/paramedicos",
      fichamedica: "/api/v1/fichamedica",
      atencion:"/api/v1/atencion"
    };

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Vistas
    this.views();

    // Directorio Público
    this.app.use(express.static("public"));
  }


  middlewares() {
    // Lectura y parseo del body
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // CORS
    this.app.use(cors(
      {
        origin: "*", //para que el backend reciba peticiones de cualquier ubicacion 
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      }
    ));

    // Lectura y parseo del body
    this.app.use(express.json());

    // Morgan
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(this.paths.usuarios, require("../routes/user.router.js"));
    this.app.use(this.paths.citas, require("../routes/cita.router.js"));
    this.app.use(this.paths.pacientes, require("../routes/paciente.router.js"));
    this.app.use(this.paths.frontend, (req, res) => res.render("index"));
    this.app.use(this.paths.paramedicos, require("../routes/paramedico.router.js"));
    this.app.use(this.paths.fichamedica, require("../routes/fichamedica.router.js"));
    this.app.use(this.paths.atencion, require("../routes/atencion.router.js"));
  }

  views() {
    this.app.set("view engine", "ejs");
    this.app.use(express.static(__dirname + "/public"));
  }

  listen() {
    conn.sync({ force: false}).then(() => {
      this.app.listen(this.port, () => {
        console.log("Servidor corriendo en puerto", this.port);
      });
    });
  }
}

module.exports = Server;
