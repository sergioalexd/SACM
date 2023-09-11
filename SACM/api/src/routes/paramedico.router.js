const paramedicoRouter = require("express").Router();

const { crearParamedico, getParamedicos, loginParamedico, getCitasParamedico } = require("../controllers/paramedico/paramedico.controller");

paramedicoRouter.post("/", crearParamedico);
paramedicoRouter.get("/getall", getParamedicos );
paramedicoRouter.post("/login", loginParamedico);
paramedicoRouter.get("/citas/:id", getCitasParamedico);

module.exports = paramedicoRouter;