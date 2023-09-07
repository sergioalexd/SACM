const pacienteRouter = require("express").Router();

const { crearPaciente, editarPaciente, loginPaciente } = require("../controllers/paciente/paciente.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

pacienteRouter.post("/", crearPaciente);
pacienteRouter.put("/:id", isAuthenticated, editarPaciente);
pacienteRouter.post("/login", loginPaciente);

module.exports = pacienteRouter;
