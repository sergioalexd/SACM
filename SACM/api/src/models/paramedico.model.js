const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {

  sequelize.define(
  "Paramedico",
  {
    idParamedico: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    comuna: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Activo", "Bloquedo", "Eliminado", "No disponible"),
      allowNull: false,
      defaultValue: "Activo",
    },
  },
  {
    timestamps: true,
  }
);
}
