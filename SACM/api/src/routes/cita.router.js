const citaRouter = require("express").Router();

const { crearCita, getCitas } = require("../controllers/citas/cita.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

citaRouter.post("/", isAuthenticated, crearCita);
citaRouter.get("/", isAuthenticated, getCitas);

module.exports = citaRouter;
