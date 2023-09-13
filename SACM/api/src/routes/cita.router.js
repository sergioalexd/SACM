const citaRouter = require("express").Router();

const { crearCita, getCitas, getCitasByIdPaciente, getCitasByIdParamedico } = require("../controllers/citas/cita.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

citaRouter.post("/", isAuthenticated, crearCita);
citaRouter.get("/", isAuthenticated, getCitas);
citaRouter.get("/byidpaciente/:id", isAuthenticated, getCitasByIdPaciente);
citaRouter.get("/byidparamedico/:id", isAuthenticated, getCitasByIdParamedico);


module.exports = citaRouter;
