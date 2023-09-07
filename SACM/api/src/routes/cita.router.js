const citaRouter = require("express").Router();

const { crearCita, getCitas, getCitasByIdPaciente} = require("../controllers/citas/cita.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

citaRouter.post("/", isAuthenticated, crearCita);
citaRouter.get("/", isAuthenticated, getCitas);
citaRouter.get("/byidpaciente/:id", isAuthenticated, getCitasByIdPaciente);

module.exports = citaRouter;
