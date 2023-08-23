const {User} = require("../database/conexion.js");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;

  if (!nombre || !apellido || !correo || !contrasena)
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });

  try {
    const email = await User.findOne({ where: { email: correo } });

    const salt = bcrypt.genSaltSync();

    if (!email) {
      const usuario = {
        name: nombre,
        lastName: apellido,
        email: correo,
        password: bcrypt.hashSync(contrasena, salt),
      };
      await User.create(usuario);
      res.status(200).json({ msg: "Usuario registrado con éxito" });
    } else {
      res.status(400).json({ msg: "El correo ya esta registrado" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Algo salió mal", error });
    console.log("error", { msg: error });
  }
};

module.exports = { createUser };
