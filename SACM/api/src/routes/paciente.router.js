const pacienteRouter = require("express").Router();

const { crearPaciente, editarPaciente, loginPaciente, getAllPacientes, getPacientesByNames } = require("../controllers/paciente/paciente.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

pacienteRouter.post("/", crearPaciente);
pacienteRouter.put("/:id", isAuthenticated, editarPaciente);
pacienteRouter.post("/login", loginPaciente);
pacienteRouter.get("/", isAuthenticated, getAllPacientes);
pacienteRouter.get("/bynames/:names", isAuthenticated, getPacientesByNames);

module.exports = pacienteRouter;
