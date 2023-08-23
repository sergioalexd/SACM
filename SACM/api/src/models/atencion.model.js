const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define(
        'Atencion',
        {
            idAtencion: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            descripcion: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            parametrosClinicos: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("ACTIVE", "BLOCK", "DELETE", "PENDING"),
                allowNull: false,
                defaultValue: "ACTIVE",
              },
        }   
    )   
}