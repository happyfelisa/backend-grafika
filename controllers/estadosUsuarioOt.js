
// const bcryptjs = require('bcryptjs');
// const Usuario = require('../models/usuario');

const { response } = require('express');
// const EstadosUsuarioOt = require('../models/estadoUsuarioOt');

const {EstadosUsuarioOt} = require('../models')

const estadosUsuarioOtGet = async (req, res = response)=> {
    const estadosUsuarioOt = await EstadosUsuarioOt.findAll();
    console.log('trajo los estadoUsuarioOt');
    res.json({
        msg:"GETTING estadoUsuarioOt",
        estadosUsuarioOt
    });
}

const estadosUsuarioOtPost = async (req, res= response)=> {
    res.status(200).json({
        ok: true,
        msg:'post API - Controlador estadoUsuarioOt'
    })
} 

module.exports = {
    estadosUsuarioOtGet,
    estadosUsuarioOtPost
}