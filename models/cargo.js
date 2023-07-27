const { DataTypes } = require("sequelize");
const db = require('../database/database');

const Cargo = db.define("Cargos", { 
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    }
 },
  {
    createdAt: false,
    updatedAt:false
  }
 );

module.exports = Cargo;