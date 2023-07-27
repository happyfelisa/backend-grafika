
const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const loginUsuario = async(req,res=response) => {
    console.log("entrando a la weaita");
    console.log(req, "request")

    const { nombre, clave } = req.body
    console.log(`nombre: ${nombre} clave: ${clave} `);
    try{
        //verificar si el correo existe
        const usuario = await Usuario.findOne({where:{nombre:nombre,clave:clave}});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son validos - nombre'
            });
        }
        //el usuario está activo enn la BD
        // if(!usuario.estado){
        //     return res.status(400).json({
        //         msg:'Usuario / Password no son validos - estado:false'
        //     });
        // }
        //verificar la contraseña
        // const validPassword = bcryptjs.compareSync(clave, usuario.clave);
        // if(!validPassword){
        //     return res.status(400).json({
        //         msg:'Usuario / Password no son validos - password'
        //     });
        // }
        //generar el JWT
        console.log(`el usuario ${usuario.id}`);
        console.log(`el usuario ${usuario.nombre}`);
        const token = await generarJWT( usuario.id, usuario.nombre );
        res.json({
            nombre:usuario.nombre,
            token
        })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        });
    }
}

const revalidarToken = async(req, res = response ) => {

  const { id } = req;

  // Leer la base de datos
  const usuario = await Usuario.findById(id);

  // Generar el JWT
  const token = await generarJWT( id, usuario.nombre );

  return res.json({
      ok: true,
      id, 
      nombre: usuario.nombre,
      token
  });

}
module.exports = {
  loginUsuario,
  revalidarToken
}