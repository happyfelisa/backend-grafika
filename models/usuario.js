const { DataTypes } = require("sequelize");
const db = require('../database/database');

const Usuario = db.define("Usuarios", {
    nombre: {
      type: DataTypes.STRING,
      required: true
    },
    clave: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      allowNull: false
    },
    id_cargo: {
      type: DataTypes.INTEGER,
      required: true
    }
 });

module.exports = Usuario;