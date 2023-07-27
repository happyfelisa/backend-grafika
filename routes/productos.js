
const {Router} = require('express');

const {productosGet,productosPost} = require('../controllers/productos');

const router = Router();
router.get('/', productosGet);
// router.get('/:id', usuariosGetByID);
router.post('/', productosPost);

module.exports = router;