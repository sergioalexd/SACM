// controladores de para gestionar las atenciones medicas

const {
  Atencion,
  Cita,
  Paciente,
  Paramedico,
} = require("../../database/conexion.js");

// controlador para obtener todas las atenciones medicas

const getAtencionesPendientesDeBaja = async (req, res) => {
  try {
    const atenciones = await Atencion.findAll({
        where: { status: "En proceso de baja" },
      attributes: [
        "idAtencion",
        "descripcion",
        "parametrosClinicos",
        "diagnostico",
        "indicaciones",
        "status",
      ],
      include: [
        {
          model: Cita,
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
                "comuna",
              ],
            },
            {
              model: Paramedico,
              attributes: [
                "idParamedico",
                "name",
                "lastName",
                "rut",
                "email",
                "address",
                "telefono",
                "status",
              ],
            },
          ],
        },
      ],
    });
    res.json({
      ok: true,
      atenciones,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las atenciones medicas",
      status: 500,
    });
  }
};

// controlador para cambiar el status de una atencion medica

const solicitarBajaAtencionMedica = async (req, res) => {
  const { id } = req.params;
  try {
    const atencion = await Atencion.findOne({ where: { idAtencion: id } });
    if (!atencion) {
      return res.status(400).json({
        ok: false,
        msg: "La ficha medica para esta atención no existe",
        status: 400,
      });
    }
    atencion.status = "En proceso de baja";
    await atencion.save();
    res.json({
      ok: true,
      msg: "Solicitud de baja de atención medica realizada con exito.",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al procesar la solicitud de baja de atención medica",
      status: 500,
    });
  }
};

const autorizarBajaAtencionMedica = async (req, res) => {
    const { id } = req.params;
    try {
      const atencion = await Atencion.findOne({ where: { idAtencion: id } });
      if (!atencion) {
        return res.status(400).json({
          ok: false,
          msg: "La ficha medica para esta atención no existe",
          status: 400,
        });
      }
      atencion.status = "Dada de baja";
      await atencion.save();
      res.json({
        ok: true,
        msg: "Solicitud de baja de atención medica realizada con exito.",
        status: 200,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Error al procesar la solicitud de baja de atención medica",
        status: 500,
      });
    }
  };



module.exports = {
  getAtencionesPendientesDeBaja,
  solicitarBajaAtencionMedica,
  autorizarBajaAtencionMedica
};
