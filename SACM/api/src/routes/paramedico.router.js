const paramedicoRouter = require("express").Router();

const { crearParamedico } = require("../controllers/paramedico/paramedico.controller");

paramedicoRouter.post("/", crearParamedico);

module.exports = paramedicoRouter;