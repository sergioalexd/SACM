// crear middleware para autenticar usuario

const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const access_token = req.headers.access_token;

  if (!access_token) {
    return res.status(401).json({
      success: false,
      status: 401,
      msg: "No existe token en la solicitud, debes estar autorizado para ingresar a esta ruta.",
    });
  }

  const user = verifyAuthToken(access_token);
  if (!user) {
    return res.status(402).json({
      success: false,
      status: 401,
      msg: "Token no válido, debes estar autorizado para ingresar a esta ruta.",
    });
  }

  req.user = user;
  next();
};

function verifyAuthToken(token) {
  let user = null;

  try {
    user = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  } catch (err) {
    console.log("El token no es válido", err);
  }

  return user;
}

module.exports = isAuthenticated;
