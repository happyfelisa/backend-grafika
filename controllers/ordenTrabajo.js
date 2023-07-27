
// const bcryptjs = require('bcryptjs');
// const Usuario = require('../models/usuario');

const { response,request } = require('express');
// const OrdenTrabajo = require('../models/ordenTrabajo');
const {OrdenTrabajo, Usuario, EstadosUsuariosOts, Producto,Cargo} = require('../models')


const ordenTrabajoGet = async (req, res = response)=> {
    const ordenTrabajo = await OrdenTrabajo.findAll({
        attributes:['id','id_producto','observacion'],
        include: [
            // {model:EstadosUsuariosOts,attributes:['fecha','estado']},
            {   
                model:Usuario,
                as:'UsuariosAsignados',
                attributes:['nombre']
            },
            {
                model:Producto,
                attributes:['nombre']
            }
    ]
    });
    console.log('trajo los ordenTrabajo');
    res.json({
        msg:"GETTING ordenTrabajo",
        ordenTrabajo
    });
}

const ordenTrabajoPost = async (req=request, res= response)=> {

    // const datos = req.query;
    const { idProducto, observacion, idUsuario} = req.body;
    // Agregar la orden de trabajo a la tabla de OTs
    const nuevaOT = new OrdenTrabajo({
        id_producto: idProducto,
        observacion: observacion
    });

    await nuevaOT.save();
    // Obtener el ID de la nueva OT
    const idOT = nuevaOT.id;
    console.log(`NUEVA ID DE OT ${idOT}`);
   
    
    const usuario = await Usuario.findOne({where:{id:idUsuario}});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario no es valido'
            });
        }

    const cargo = await Cargo.findOne({where:{id:usuario.id_cargo}});

     //fecha con formato
     let currentDate = new Date();
     let day = currentDate.getDate();
     let month = currentDate.getMonth() + 1; // Note that month starts at 0, so we add 1 to get the current month
     let year = currentDate.getFullYear();
     let formattedDate = `${day}/${month}/${year}`;

     const fechaActual = new Date();
    // Agregar la relación entre usuario y OT a la tabla de estados_usuarios_ots
    const nuevoEstado = new EstadosUsuariosOts({
        id_usuario: idUsuario,
        id_ot: idOT,
        fecha:fechaActual,
        estado: cargo.tipo
    });
    
    await nuevoEstado.save();
    
    res.status(201).send({ mensaje: 'Orden de trabajo agregada correctamente.' });
    //buscar como ingresar datos con el ORM

    /**
     * el flujo es el siguiente... ingresar una ot con el stock, id de producto y la observacion.
     * devolver el id de ese ot generado.
     * ingresar el estado usuario ot buscando al usuario con tal id y asignandole el estado es el cargo del usuario.
     * devolver un mensaje de que se ingreso correctamente :D
     */
} 

const ordenTrabajoUpdate = async (req=request, res= response)=>{
    const {nuevoNombre, idOT} = req.body;

    const usuario = await Usuario.findOne({where:{nombre:nuevoNombre}});
    if(!usuario){
        return res.status(400).json({
            msg:'Usuario no es valido'
        });
    }

    const cargo = await Cargo.findOne({where:{id:usuario.id_cargo}});

    const fechaActual = new Date();
    // Agregar la relación entre usuario y OT a la tabla de estados_usuarios_ots
    const nuevoEstado = new EstadosUsuariosOts({
        id_usuario: usuario.id,
        id_ot: idOT,
        fecha:fechaActual,
        estado: cargo.tipo
    });
    
    await nuevoEstado.save();

    res.status(201).send({ mensaje: 'Orden de trabajo actualizada correctamente.' });

}

const usuariosGetByID = async (req=request, res= response)=>{
    const { id } = req.params; // obtenemos el id de los parámetros de la petición
    try {
        const ordenTrabajo = await OrdenTrabajo.findByPk(id, {
            attributes:['id','id_producto','observacion'],
            include: [
                // {model:EstadosUsuariosOts,attributes:['fecha','estado']},
                {   
                    model:Usuario,
                    as:'UsuariosAsignados',
                    attributes:['nombre']
                },
                {
                    model:Producto,
                    attributes:['nombre']
                }
            ]
        });
        if(!ordenTrabajo){
            return res.status(404).json({
                msg: 'No se encontró una orden de trabajo con ese ID'
            });
        }
        console.log('trajo la orden de trabajo');
        res.json({
            msg: "GETTING orden de trabajo",
            ordenTrabajo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener la orden de trabajo"
        });
    }
}
//agregar orden de trabajo 

module.exports = {
    ordenTrabajoGet,
    ordenTrabajoPost,
    usuariosGetByID,
    ordenTrabajoUpdate
}