
const { Router } = require('express');
const { check } = require('express-validator');

const { loginUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/' ,loginUsuario );

// Validar y revalidar token
router.get( '/renew', validarJWT );

module.exports = router;
