//crear controladores para las rutas de citas medicas donde se pueda seleccionar, crear, editar y eliminar una cita medica, bloqueada o no bloqueada, solo los paramedicos pueden crear, editar y eliminar una cita medica, los pacientes solo pueden seleccionar una cita medica

const { Cita, Paciente, Paramedico } = require("../../database/conexion.js");

// Path: api\src\controllers\citas\cita.controller.js

const getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        {
          model: Paramedico,
          attributes: ["name", "lastName", "idParamedico"],
        },
        {
          model: Paciente,
          attributes: ["name", "lastName", "idPaciente"],
        },
      ],
    });
    res.json({
      ok: true,
      citas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las citas medicas",
    });
  }
};

const crearCita = async (req, res = response) => {
  const { fecha, hora, idPaciente, idParamedico } = req.body;

  // Verificar si la hora está disponible en la base de datos
  const citaExistente = await Cita.findOne({
    where: {
      fecha: fecha,
      hora: hora,
    },
  });

  if (citaExistente) {
    return res.status(400).json({ mensaje: "La cita ya está reservada" });
  }
  try {
    const cita = await Cita.create(
      {
        fecha,
        hora,
        idPaciente,
        idParamedico,
      }
    );
    res.json({
      ok: true,
      cita,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear la cita medica",
    });
  }
};

module.exports = { getCitas, crearCita };
