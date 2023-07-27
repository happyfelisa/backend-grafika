
// const bcryptjs = require('bcryptjs');
// const Usuario = require('../models/usuario');

const { response } = require('express');
// const Producto = require('../models/producto');
const {Producto} = require('../models')


const productosGet = async (req, res = response)=> {
    const productos = await Producto.findAll();
    console.log('trajo los productos');
    res.json({
        msg:"GETTING PRODUCTOS",
        productos
    });
}

const productosPost = async (req, res= response)=> {
    res.status(200).json({
        ok: true,
        msg:'post API - Controlador'
    })
} 

module.exports = {
    productosGet,
    productosPost
}