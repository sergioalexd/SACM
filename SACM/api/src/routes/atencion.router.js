const atencionRouter = require("express").Router();

const {
    solicitarBajaAtencionMedica,
    getAtencionesPendientesDeBaja,
    autorizarBajaAtencionMedica
} = require("../controllers/atencion/atencion.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");

atencionRouter.get("/atencionesporbajar", isAuthenticated, getAtencionesPendientesDeBaja);
atencionRouter.put("/baja/:id", isAuthenticated, solicitarBajaAtencionMedica);
atencionRouter.put("/autorizarbaja/:id", isAuthenticated, autorizarBajaAtencionMedica);

module.exports = atencionRouter;

