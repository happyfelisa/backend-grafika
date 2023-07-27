
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const { response } = require('express');
// const Usuario = require('../models/usuario');
const { Cargo, OrdenTrabajo} = require('../models')

const usuariosGetByID = async (req, res = response)=> {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findOne({ _id: id, estado: true }, 'id nombre clave');
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró un usuario con el ID ${id}`
            });
        }
        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrió un error al buscar el usuario'
        });
    }
}


  const usuariosGet = async (req, res = response)=> {

    /**
     * el siguiente metodo trae todos los usuarios y trae el atributo nombre de los usuarios
     * ademas hace join con Cargo y trae el atributo tipo del cargo asociado.
     */
    const usuarios = await Usuario.findAll({
        attributes:['id','nombre'],
        include:[
            {
                model:Cargo,
                attributes:['tipo']
            },
            {
                model:OrdenTrabajo,
                as:'OtsAsignadas',
                attributes:['id','id_producto']
            }
        ]
    });

    res.json({
        msg:"GETTING USERS",
        usuarios
    });
  }

// const usuariosPost = async (req, res= response)=> {
//     // //el req recibe el body de la peticion
//     // const {nombre, correo, password, rol} = req.body;
//     // const usuario = new Usuario({nombre,correo,password,rol});

//     // //encriptar la contrase;a 10 por defecto
//     // const salt = bcryptjs.genSaltSync();
//     // usuario.password = bcryptjs.hashSync(password, salt);
//     // //GUARDAR EN DB
//     // await usuario.save();
//     const { nombre, clave, id_cargo } = req.body;
//     const usuario = new Usuario({ nombre, clave, id_cargo });
//     const salt = bcryptjs.genSaltSync();
//     usuario.clave = bcryptjs.hashSync(clave, salt);
//     await usuario.save();
//     res.status(200).json({
//         ok: true,
//         msg:'post API - Controlador',
//         usuario
//     })
// } 
const usuariosPost = async (req, res) => {
    const { nombre, clave, id_cargo } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const password = bcryptjs.hashSync(clave, salt);
    
    try {
      const usuario = await Usuario.create({ nombre, clave: password, id_cargo });
      res.status(201).json({
        ok: true,
        msg: 'Usuario creado correctamente',
        usuario
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al crear el usuario'
      });
    }
  };
// const usuariosPut = async (req, res= response)=> {
//     //se obtiene el parametro de la ruta llamado id en el routes
//     //const id = req.params.id
//     const {id} = req.params;
//     const {_id, password, google, correo, ...resto } = req.body;

//     //TODO validar con la base de datos
//     if(password){
//         const salt = bcryptjs.genSaltSync();
//         resto.password = bcryptjs.hashSync(password, salt);
//     }

//     const usuario = await Usuario.findByIdAndUpdate(id, resto)
//     res.json({
//         usuario
//     })
// }

// const usuariosPatch =  (req, res= response)=> {
//     res.status(400).json({
//         ok: true,
//         msg:'patch API - Controlador',
//     })
// }

// const usuariosDelete = async(req, res= response)=> {

//     const { id } = req.params;

//     const usuario = await Usuario.findByIdAndUpdate(id, {estado:false} );

//     res.status(400).json({
//         usuario
//     })
// }

  
  
  
module.exports = {
    usuariosGet,
    usuariosGetByID,
    usuariosPost
    // usuariosPut,
    // usuariosPatch,
    // usuariosDelete
}