
const {Router} = require('express');

const {estadosUsuarioOtGet,estadosUsuarioOtPost} = require('../controllers/estadosUsuarioOt');

const router = Router();
router.get('/', estadosUsuarioOtGet);
// router.get('/:id', usuariosGetByID);
router.post('/', estadosUsuarioOtPost);

module.exports = router;