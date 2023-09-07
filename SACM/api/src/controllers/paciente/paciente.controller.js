const { Paciente, FichaMedica } = require("../../database/conexion.js"); // sequalize
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../../services/generar-jwt");
const { validarRut, retonarRut } = require("../../services/validar-rut");

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
    telefono
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
    !telefono
  )
    return res.status(400).json({ msg: "Todos los campos son obligatorios", status: 400 });

  if (!validarRut(rut)) {
    return res.status(400).json({ msg: "Rut inválido", status: 400 });
  }

  try {
    const rutFormateado = retonarRut(rut);
    const email = await Paciente.findOne({ where: { email: correo } });
    const rutChek = await Paciente.findOne({ where: { rut: rutFormateado } });

    if(email){
      return res.status(400).json({ msg: "El correo ya esta registrado", status: 400 });
    }
    if(rutChek){
      return res.status(400).json({ msg: "El rut ya esta registrado", status: 400 });
    }

    const salt = bcrypt.genSaltSync();
      const paciente = {
        name: nombre,
        lastName: apellido,
        email: correo,
        password: bcrypt.hashSync(contrasena, salt),
        rut: rutFormateado,
        address: address,
        comuna: comuna,
        region: region,
        telefono: telefono
      };
      const newPaciente = await Paciente.create(paciente);
      await newPaciente.save();

      const newFichaMedica = await FichaMedica.create({
        idPaciente: newPaciente.idPaciente
      })

      const token = await generarJWT(newPaciente.idPaciente);

      res.status(200).json({ msg: "paciente registrado", newPaciente, newFichaMedica, token, status: 200 });
    
  } catch (error) {
    res.status(500).json({ msg: "Algo salió mal", error, status: 500 });
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
    correo
  } = req.body;

  const idCheck = await Paciente.findOne({ where: { idPaciente: id } });

  console.log(req.body);

  if (Object.keys(req.body).length === 0){
    return res.status(400).json({ msg: "Indica al menos un campo para actualizar", status: 400 });
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
      email: correo
    };

    if (!idCheck) {
      return res.status(400).json({ msg: "No se ha encontrado el paciente", status: 400 });
    } else {
      const pacienteEditado = await Paciente.update(paciente, {
        where: { idPaciente: id },
      });
      const pacienteActualizado = await Paciente.findOne({ where: { idPaciente: id },
        include: [ FichaMedica ] });
      res.status(200).json({ msg: "paciente editado", pacienteActualizado, status: 200});
    }
  } catch (error) {
    res.status(500).json({ msg: "Algo salió mal", error, status: 500 });
    console.log("error", { msg: error });
  }
};

const loginPaciente = async (req, res) => {
  const { rut, password } = req.body;

  if (!rut || !password) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios", status: 400 });
  }

  try {
    const rutFormateado = retonarRut(rut);
    const paciente = await Paciente.findOne({ where: { rut: rutFormateado },
      include: [ FichaMedica ]
    
    });

    if (!paciente) {
      return res.status(400).json({ msg: "El paciente no existe", status: 400 });
    }

    const validPassword = bcrypt.compareSync(password, paciente.password);

    if (!validPassword) {
      return res.status(400).json({ msg: "Contraseña incorrecta", status: 400 });
    }

    const token = await generarJWT(paciente.idPaciente);

    res.status(200).json({ msg: "Paciente logeado", paciente, token, status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "Algo salió mal", error, status: 500 });
    console.log("error", { msg: error });
  }

};

const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.status(200).json({ msg: "Pacientes obtenidos", pacientes, status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "Algo salió mal", error, status: 500 });
    console.log("error", { msg: error });
  }
}



module.exports = { crearPaciente, editarPaciente, loginPaciente, getAllPacientes };
