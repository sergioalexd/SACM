
const {Paramedico, Cita, Paciente} = require("../../database/conexion.js");
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
    !telefono 
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

      res.status(200).json({ msg: "paramedico registrado", newParamedico, token, status: 200 });
    } else {
      res.status(400).json({ msg: "El correo o rut ya esta registrado" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Algo salió mal", error });
    console.log("error", { msg: error });
  }
};

const getParamedicos = async (req, res) => {
  try {
    const paramedicos = await Paramedico.findAll();
    res.status(200).json({ msg: "paramedicos", paramedicos, status: 200 });
  } catch (error) {
    res.status(400).json({ msg: "Algo salió mal", error, status: 400 });
    console.log("error", { msg: error });
  }
};

const loginParamedico = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });

  try {
    const paramedico = await Paramedico.findOne({ where: { email: email } });
    if (!paramedico) {
      return res.status(400).json({
        status: 400,
        msg: "Email no está registrado.",
      });
    }

    // SI el usuario está activo
    if (paramedico.status !== "Activo") {
      return res.status(400).json({
        status: 400,
        msg: "Usuario no se encuentra activo. Contacte al administrador.",
      });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, paramedico.password);
    if (!validPassword) {
      return res.status(400).json({
        status: 400,
        msg: "Password no es correcto",
      });
    }
    
    // Generar el JWT
    const token = await generarJWT(paramedico.idParamedico);

    res.json({
      status: 200,
      paramedico,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
      status: 500,
    });
  }
};

//get citas por paramedico

const getCitasParamedico = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      where: {
        idParamedico: req.params.id,
      },
      attributes: ["idCita", "fecha", "hora", "status"],
      include: [
        {
          model: Paciente,
          attributes: [
            "idPaciente",
            "name",
            "lastName",
            "rut",
            "email",
            "address",
            "telefono",
            "status",
            "comuna"
          ],
        }
      ],
    });
    res.json({
      status: 200,
      ok: true,
      citas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las citas",
    });
  }
};

// inhabilitar paramedico
const inhabilitarParamedico = async (req, res) => {
  const { id } = req.params;
  try {
    const paramedico = await Paramedico.findOne({ where: { idParamedico: id } });
    if (!paramedico) {
      return res.status(400).json({
        status: 400,
        msg: "El paramedico no existe",
      });
    }
    paramedico.status = "Bloqueado";
    await paramedico.save();
    res.json({
      status: 200,
      ok: true,
      msg: "Paramedico inhabilitado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al inhabilitar el paramedico",
    });
  }
};

const habilitarParamedico = async (req, res) => {
  const { id } = req.params;
  try {
    const paramedico = await Paramedico.findOne({ where: { idParamedico: id } });
    if (!paramedico) {
      return res.status(400).json({
        status: 400,
        msg: "El paramedico no existe",
      });
    }
    paramedico.status = "Activo";
    await paramedico.save();
    res.json({
      status: 200,
      ok: true,
      msg: "Paramedico habilitado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al habilitar el paramedico",
      status: 500,
    });
  }
};

const deleteParamedico = async (req, res) => {
  const { id } = req.params;
  try {
    const paramedico = await Paramedico.findOne({ where: { idParamedico: id } });
    if (!paramedico) {
      return res.status(400).json({
        status: 400,
        msg: "El paramedico no existe",
      });
    }
    paramedico.status = "Eliminado";
    await paramedico.save();
    res.json({
      status: 200,
      ok: true,
      msg: "Paramedico eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar el paramedico",
    });
  }
};

const getParamedicoByNames = async (req, res) => {
  const { names } = req.params;
  try {
    const paramedicos = await Paramedico.findAll(
      {
        where: {
          name: names,
        }, 
      }
    );
    res.status(200).json({ msg: "Pacientes obtenidos", paramedicos, status: 200 });
  } catch (error) {
    res.status(500).json({ msg: "Algo salió mal", error, status: 500 });
    console.log("error", { msg: error });
  }
}

module.exports = { crearParamedico, getParamedicos, loginParamedico, getCitasParamedico, inhabilitarParamedico, habilitarParamedico, deleteParamedico, getParamedicoByNames };
