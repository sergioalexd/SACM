const bcrypt = require("bcrypt");

const {User} = require("../database/conexion.js");

const { generarJWT } = require("../services/generar-jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verificar si el email existe
    const usuario = await User.findOne({ where: { email: email } });
    if (!usuario) {
      return res.status(400).json({
        status: 400,
        msg: "Email no está registrado.",
      });
    }

    // SI el usuario está activo
    if (usuario.status !== "ACTIVE") {
      return res.status(400).json({
        status: 400,
        msg: "Usuario no se encuentra activo. Contacte al administrador.",
      });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        status: 400,
        msg: "Password no es correcto",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.idUser);

    res.json({
      status: 200,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { login };
