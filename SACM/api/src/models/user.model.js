
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define(
    "User",
    {
        idUser: {
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
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("ACTIVE", "BLOCK", "DELETE", "PENDING"),
            allowNull: false,
            defaultValue: "ACTIVE",
          },
          rol: {
            type: DataTypes.ENUM("ADMIN", "USER"),
            allowNull: false,
            defaultValue: "USER",
          }
    },
    {
        timestamps: true,
    }
);
}