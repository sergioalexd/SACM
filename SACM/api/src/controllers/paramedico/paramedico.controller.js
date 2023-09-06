
const {Paramedico} = require("../../database/conexion.js");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../../services/generar-jwt");
const {validarRut} = require("../../services/validar-rut"); 

const crearParamedico = async (req, res) => {
  const {
    nombre,
    apellido,
    correo,
    contrasena,
    rut,
    address,
    comuna,
    region,
    telefono,
    whatsapp,
    celular
  } = req.body;

  if (
    !nombre ||
    !apellido ||
    !correo ||
    !contrasena ||
    !rut ||
    !address ||
    !comuna ||
    !region ||
    !telefono ||
    !whatsapp ||
    !celular
  )
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
     if(!validarRut(rut)){
      return res.status(400).json({ msg: "Rut inválido" });
    }

  try {
    const email = await Paramedico.findOne({ where: { email: correo } });
    const rutChek = await Paramedico.findOne({ where: { rut: rut } });

    const salt = bcrypt.genSaltSync();

    if (!email || !rutChek) {
      const paramedico = {
        name: nombre,
        lastName: apellido,
        email: correo,
        password: bcrypt.hashSync(contrasena, salt),
        rut: rut,
        address: address,
        comuna: comuna,
        region: region,
        telefono: telefono,
        whatsapp: whatsapp,
        celular: celular,
      };
      const newParamedico = await Paramedico.create(paramedico);
      await newParamedico.save();

      const token = await generarJWT(newParamedico.idParamedico);

      res.status(200).json({ msg: "paramedico registrado", newParamedico, token });
    } else {
      res.status(400).json({ msg: "El correo o rut ya esta registrado" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Algo salió mal", error });
    console.log("error", { msg: error });
  }
};

module.exports = { crearParamedico };
