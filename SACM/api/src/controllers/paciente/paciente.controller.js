const { Paciente, FichaMedica } = require("../../database/conexion.js"); // sequalize
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../../services/generar-jwt");
const { validarRut } = require("../../services/validar-rut");

const crearPaciente = async (req, res) => {
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
    celular,
    telefonoFamiliar,
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
    !celular ||
    !telefonoFamiliar
  )
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });

  if (!validarRut(rut)) {
    return res.status(400).json({ msg: "Rut inválido" });
  }

  try {
    const email = await Paciente.findOne({ where: { email: correo } });
    const rutChek = await Paciente.findOne({ where: { rut: rut } });

    const salt = bcrypt.genSaltSync();

    if (!email || !rutChek) {
      const paciente = {
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
        telefonoFamiliar: telefonoFamiliar,
      };
      const newPaciente = await Paciente.create(paciente);
      await newPaciente.save();

      const newFichaMedica = await FichaMedica.create({
        idPaciente: newPaciente.idPaciente
      })

      const token = await generarJWT(newPaciente.idPaciente);

      res.status(200).json({ msg: "paciente registrado", newPaciente, newFichaMedica, token });
    } else {
      res.status(400).json({ msg: "El correo o rut ya esta registrado" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Algo salió mal", error });
    console.log("error", { msg: error });
  }
};

const editarPaciente = async (req, res) => {
  const { id } = req.params;
  const {
    address,
    comuna,
    region,
    telefono,
    whatsapp,
    celular,
    telefonoFamiliar,
  } = req.body;

  const idCheck = await Paciente.findOne({ where: { idPaciente: id } });

  console.log(req.body);

  if (Object.keys(req.body).length === 0){
    return res.status(400).json({ msg: "Indica al menos un campo para actualizar" });
  }

  try {
    const paciente = {
      address: address,
      comuna: comuna,
      region: region,
      telefono: telefono,
      whatsapp: whatsapp,
      celular: celular,
      telefonoFamiliar: telefonoFamiliar,
    };

    if (!idCheck) {
      return res.status(400).json({ msg: "No se ha encontrado el paciente" });
    } else {
      const pacienteEditado = await Paciente.update(paciente, {
        where: { idPaciente: id },
      });
      res.status(200).json({ msg: "paciente editado"});
    }
  } catch (error) {
    res.status(400).json({ msg: "Algo salió mal", error });
    console.log("error", { msg: error });
  }
};

module.exports = { crearPaciente, editarPaciente };
