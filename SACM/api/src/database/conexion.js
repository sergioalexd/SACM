require("dotenv").config();
const { Sequelize  } = require('sequelize');
const credentials = require("../config/const");
const fs = require("fs");
const path = require("path");


const dbConnection = new Sequelize(credentials.dbName, credentials.dbUser, credentials.dbPass, {
    host: credentials.dbHost,
    dialect: credentials.dbDialect,
    dialectOptions: credentials.sslOp
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });


modelDefiners.forEach((model) => model(dbConnection));
let entries = Object.entries(dbConnection.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
dbConnection.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Paciente, Paramedico, FichaMedica, Cita, ParamedicoPaciente, Atencion } = dbConnection.models;

    Paciente.hasOne(FichaMedica, { foreignKey: "idPaciente" });
    FichaMedica.belongsTo(Paciente, { foreignKey: "idPaciente" });
    FichaMedica.hasMany(Atencion, { foreignKey: "idFichaMedica" });
    Atencion.hasOne(FichaMedica, { foreignKey: "idFichaMedica" });
    Paramedico.hasMany(Cita, { foreignKey: "idParamedico" });
    Cita.belongsTo(Paramedico, { foreignKey: "idParamedico" });
    Paciente.hasMany(Cita, { foreignKey: "idPaciente" });
    Cita.belongsTo(Paciente, { foreignKey: "idPaciente" });
    Paramedico.belongsToMany(Paciente, { through: "paramedico_paciente"});
    Paciente.belongsToMany(Paramedico, { through: "paramedico_paciente"});
    Cita.hasOne(Atencion, { foreignKey: "idCita" });


module.exports = {
  ...dbConnection.models, 
  conn: dbConnection, 
};