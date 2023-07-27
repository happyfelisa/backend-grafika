const { DataTypes } = require("sequelize");
const db = require('../database/database');

const OrdenTrabajo = db.define("ots", {
    stock: {   
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull:true
    },
    id_producto:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    observacion:{
      type:DataTypes.TEXT,
      allowNull:true
    }
 },
  {
    createdAt: false,
    updatedAt:false
  }
 );

module.exports = OrdenTrabajo;