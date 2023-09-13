const citaRouter = require("express").Router();

const {
  crearCita,
  getCitas,
  getCitasByIdPaciente,
  getCitasByIdParamedico,
  updateCitaMedica,
  cancelarCitaMedica,
  finalizarCitaMedica,
} = require("../controllers/citas/cita.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

citaRouter.post("/", isAuthenticated, crearCita);
citaRouter.get("/", isAuthenticated, getCitas);
citaRouter.get("/byidpaciente/:id", isAuthenticated, getCitasByIdPaciente);
citaRouter.get("/byidparamedico/:id", isAuthenticated, getCitasByIdParamedico);
citaRouter.put("/update/:id", isAuthenticated, updateCitaMedica);
citaRouter.put("/cancelar/:id", isAuthenticated, cancelarCitaMedica);
citaRouter.put("/finalizar/:id", isAuthenticated, finalizarCitaMedica);

module.exports = citaRouter;
