const pacienteRouter = require("express").Router();

const { crearPaciente, editarPaciente } = require("../controllers/paciente/paciente.controller");

pacienteRouter.post("/", crearPaciente);
pacienteRouter.put("/:id", editarPaciente);

module.exports = pacienteRouter;
