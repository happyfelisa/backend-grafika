
// const bcryptjs = require('bcryptjs');
// const Usuario = require('../models/usuario');

const { response } = require('express');

const {Cargo} = require('../models');

const cargosGet = async (req, res = response)=> {
    const cargos = await Cargo.findAll();
    console.log('trajo los cargos');
    res.json({
        msg:"GETTING cargoS",
        cargos
    });
}

const cargosPost = async (req, res= response)=> {
    res.status(200).json({
        ok: true,
        msg:'post API - Controlador Cargos'
    })
} 

module.exports = {
    cargosGet,
    cargosPost
}