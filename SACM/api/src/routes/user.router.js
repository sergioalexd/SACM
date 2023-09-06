const routerUser = require("express").Router();

const { createUser} = require("../controllers/user.controller");
const { login } = require("../controllers/auth.controller");
const isAdmin = require("../middlewares/isAdmin");

routerUser.post("/createuser", createUser);
routerUser.post("/login", login);

module.exports = routerUser;