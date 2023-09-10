const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define(
  "Cita",
  {
    idCita: {
      type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora: {
      type: DataTypes.ENUM("08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00","18:30","20:00"),
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