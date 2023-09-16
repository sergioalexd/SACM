const fichamedicaRouter = require('express').Router();

const updateFichaMedica = require('../controllers/fichamedica/fichamedica.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');

fichamedicaRouter.put('/update/:id', isAuthenticated, updateFichaMedica);

module.exports = fichamedicaRouter;