const { DataTypes } = require("sequelize");
const db = require('../database/database');

const Producto = db.define("Productos", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
 },
  {
    createdAt: false,
    updatedAt:false
  }
 );

module.exports = Producto;