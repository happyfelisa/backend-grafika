const db = require('../database/database');
const Cargo = require('./cargo');
const EstadosUsuariosOts = require('./estadoUsuarioOt');
const OrdenTrabajo = require('./ordenTrabajo');
const Producto = require('./producto');
const Usuario = require('./usuario');


/**
 * Para definir las relaciones tenemos los siguientes metodos:
 * 
 * A.hasOne(B): asociacion 1 a 1 entre A y B, donde la llave foranea esta en B
 * A.belongsTo(B): asociacion 1 a 1 entre A y B, donde la llave foranea esta en A
 * A.hasMany(B): asociacion 1 a muchos entre A y B, donde la llave foranea esta en B
 * A.belongsToMany(B,{through:'C'}): asociacion muchos a muchos entre A y B, usando la tabla 'C' como tabla intermedia con las llaves foraneas de A y B
 * 
 */


//llave foranea esta en A y se le indica la foreign_key
Usuario.belongsTo(Cargo,{foreignKey:'id_cargo'});
//la llave foranea esta en B
Cargo.hasMany(Usuario,{foreignKey:'id'});

//esta el hasOne donde la llave foranea esta en A

OrdenTrabajo.belongsTo(Producto,{foreignKey:'id_producto'});
Producto.hasMany(OrdenTrabajo,{foreignKey:'id'});

Usuario.belongsToMany(OrdenTrabajo, { through: EstadosUsuariosOts, as: 'OtsAsignadas', foreignKey: 'id_usuario', otherKey: 'id_ot' });
OrdenTrabajo.belongsToMany(Usuario, { through: EstadosUsuariosOts, as: 'UsuariosAsignados', foreignKey: 'id_ot', otherKey: 'id_usuario' });

module.exports = {
    Cargo,
    EstadosUsuariosOts,
    OrdenTrabajo,
    Producto,
    Usuario
}