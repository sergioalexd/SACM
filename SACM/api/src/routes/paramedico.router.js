const paramedicoRouter = require("express").Router();

const { crearParamedico, getParamedicos, loginParamedico, getCitasParamedico, inhabilitarParamedico, habilitarParamedico, deleteParamedico, getParamedicoByNames, updateDataParamedico } = require("../controllers/paramedico/paramedico.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

paramedicoRouter.post("/", crearParamedico);
paramedicoRouter.get("/getall", getParamedicos );
paramedicoRouter.post("/login", loginParamedico);
paramedicoRouter.get("/citas/:id", getCitasParamedico);
paramedicoRouter.put("/inhabilitar/:id", isAuthenticated, inhabilitarParamedico);
paramedicoRouter.put("/habilitar/:id", isAuthenticated, habilitarParamedico);
paramedicoRouter.delete("/delete/:id", isAuthenticated, deleteParamedico);
paramedicoRouter.get("/bynames/:names", getParamedicoByNames);
paramedicoRouter.put("/update/:id", isAuthenticated, updateDataParamedico);

module.exports = paramedicoRouter;