const pacienteRouter = require("express").Router();

const { crearPaciente, editarPaciente, loginPaciente } = require("../controllers/paciente/paciente.controller");

pacienteRouter.post("/", crearPaciente);
pacienteRouter.put("/:id", editarPaciente);
pacienteRouter.post("/login", loginPaciente);

module.exports = pacienteRouter;
