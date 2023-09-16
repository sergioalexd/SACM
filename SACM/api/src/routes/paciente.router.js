const pacienteRouter = require("express").Router();

const { crearPaciente, editarPaciente, loginPaciente, getAllPacientes, getPacientesByNames, getPacienteFichaMedica, deletePaciente} = require("../controllers/paciente/paciente.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

pacienteRouter.post("/", crearPaciente);
pacienteRouter.put("/:id", isAuthenticated, editarPaciente);
pacienteRouter.post("/login", loginPaciente);
pacienteRouter.get("/", isAuthenticated, getAllPacientes);
pacienteRouter.get("/bynames/:names", isAuthenticated, getPacientesByNames);
pacienteRouter.get("/fichamedica/:id", isAuthenticated, getPacienteFichaMedica);
pacienteRouter.put("/delete/:id", isAuthenticated, deletePaciente);


module.exports = pacienteRouter;
