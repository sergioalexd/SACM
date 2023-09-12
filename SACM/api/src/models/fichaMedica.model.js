// crear modelo de FichaMedica clinica en sequelize con los siguientes campos: idFichaMedicas, fecha, descripcion, idPaciente, idParamedico

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define(
  "FichaMedica",
  {
    idFichaMedica: {
      type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("Activa", "Eliminada", "Bloqueda", "Pendiente"),
      allowNull: false,
      defaultValue: "Activa",
    },
  },
  {
    timestamps: true,
  }
);
}
