// crear modelo de historia clinica en sequelize con los siguientes campos: idHistorias, fecha, descripcion, idPaciente, idParamedico

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define(
  "Historia",
  {
    idHistoria: {
      type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "BLOCK", "DELETE", "PENDING"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);
}
