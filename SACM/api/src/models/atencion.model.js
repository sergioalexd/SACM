const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Atencion", {
    idAtencion: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(255),
    },
    parametrosClinicos: {
      type: DataTypes.STRING(255),
    },
    diagnostico: {
      type: DataTypes.STRING(255),
    },
    indicaciones: {
      type: DataTypes.STRING(255),
    },
    // tipo_visita: {
    //     type: DataTypes.ENUM("CONSULTA", "TRATAMIENTO", "APOYO MÉDICO"),
    //     allowNull: false
    // },
    status: {
      type: DataTypes.ENUM("Cancelada", "Finalizada", "Anulada", "Pendiente", "Dada de baja", "En proceso de baja"),
      allowNull: false,
      defaultValue: "Pendiente",
    },
  });
};
