const { request } = require('express');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req=request,res=response,next) =>{
    //se envía así en le header
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:'No está autorizado'
        })
    }

    try {

        const {uid} = jwt.verify( token, process.env.SECRETORPUBLICKEY);
        
        req.uid = uid;

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'No está autorizado - usuario no existe en BD'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'No está autorizado - usuario eliminado'
            })
        }
        
        req.usuario = usuario;
        req.nombre = usuario.nombre;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:'Token no valido'
        });
    }
   
}

module.exports = {
    validarJWT
}