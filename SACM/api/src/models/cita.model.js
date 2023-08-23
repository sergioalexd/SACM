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
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora: {
      type: DataTypes.ENUM("08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00","15:00","16:00","17:00","18:00","19:00","20:00"),
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