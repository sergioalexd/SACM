const {
  Paciente,
  FichaMedica,
  Paramedico,
  Atencion,
  Cita,
} = require("../../database/conexion.js"); // sequalize
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../../services/generar-jwt.js");
const { validarRut, retonarRut } = require("../../services/validar-rut.js");

const updateFichaMedica = async (req, res) => {
  const { id } = req.params;

  const { descripcion, parametrosClinicos, diagnostico, indicaciones, idAtencion } =
    req.body;

  try {
    const fichaMedica = await FichaMedica.findOne({
      where: { idFichaMedica: id },
    });

    if (!fichaMedica) {
      return res.status(400).json({
        msg: "No existe ficha medica",
        status: 400,
      });
    }

    const fichaEditar = {
      descripcion,
      parametrosClinicos,
      diagnostico,
      indicaciones,
    };

    const atencionEditada = await Atencion.update(fichaEditar, {
      where: { idAtencion: idAtencion },
    });

    const fichaActualizada = await FichaMedica.findOne({
      where: { idFichaMedica: id },
      include: [
        {
          model: Atencion,
          attributes: [
            "idAtencion",
            "descripcion",
            "parametrosClinicos",
            "diagnostico",
            "indicaciones",
          ],
        },
      ],
    });

    res.json({
      fichaActualizada,
      ok: true,
      msg: "Ficha medica actualizada",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar la ficha medica",
      status: 500,
    });
  }
};

module.exports = updateFichaMedica;

