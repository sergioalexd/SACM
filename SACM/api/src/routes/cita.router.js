const citaRouter = require("express").Router();

const { crearCita, getCitas } = require("../controllers/citas/cita.controller");

citaRouter.post("/", crearCita);
citaRouter.get("/", getCitas);

module.exports = citaRouter;
