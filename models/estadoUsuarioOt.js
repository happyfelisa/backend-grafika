const { DataTypes } = require("sequelize");
const db = require('../database/database');
const OrdenTrabajo = require("./ordenTrabajo");
const Usuario = require("./usuario");

const EstadosUsuariosOts = db.define("estados_usuarios_ots", {
    id_usuario:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:{
            model:Usuario,
            key:'id'
        }
    },
    id_ot:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:OrdenTrabajo,
            key:'id'
        }
    },
    fecha:{
        type:DataTypes.DATE
    },
    estado:{
        type:DataTypes.STRING
    }
 },
  {
    createdAt: false,
    updatedAt:false
  }
 );

module.exports = EstadosUsuariosOts;