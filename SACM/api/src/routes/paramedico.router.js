const paramedicoRouter = require("express").Router();

const { crearParamedico, getParamedicos, loginParamedico } = require("../controllers/paramedico/paramedico.controller");

paramedicoRouter.post("/", crearParamedico);
paramedicoRouter.get("/getall", getParamedicos );
paramedicoRouter.post("/login", loginParamedico);

module.exports = paramedicoRouter;