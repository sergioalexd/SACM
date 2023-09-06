//crear controladores para las rutas de citas medicas donde se pueda seleccionar, crear, editar y eliminar una cita medica, bloqueada o no bloqueada, solo los paramedicos pueden crear, editar y eliminar una cita medica, los pacientes solo pueden seleccionar una cita medica

const { Cita, Paciente, Paramedico, Atencion } = require("../../database/conexion.js");

const getCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    res.json({
      ok: true,
      citas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las citas medicas",
      status: 500,
    });
  }
};

const crearCita = async (req, res = response) => {
  const { fecha, hora, idPaciente, idParamedico, idFichaMedica } = req.body;

  // Verificar si la hora está disponible en la base de datos
  const citaExistente = await Cita.findOne({
    where: {
      fecha: fecha,
      hora: hora,
    }
  });

  if (citaExistente) {
    return res.status(400).json({ mensaje: "La cita ya está reservada", status: 400 });
  }
  try {
    const cita = await Cita.create(
      {
        fecha,
        hora,
        idPaciente,
        idParamedico,
      },
    );
    const citaCreated = await cita.save();

    const newAtencion = await Atencion.create({
      idCita: citaCreated.idCita,
      idFichaMedica
    });

    res.json({
      ok: true,
      status: 200,
      cita,
      newAtencion
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      status: 500,
      msg: "Error al crear la cita medica",
    });
  }
};

module.exports = { getCitas, crearCita };
