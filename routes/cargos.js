
const {Router} = require('express');

const {cargosGet,cargosPost} = require('../controllers/cargos');

const router = Router();
router.get('/', cargosGet);
// router.get('/:id', usuariosGetByID);
router.post('/', cargosPost);

module.exports = router;