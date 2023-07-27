
const {Router} = require('express');

const {ordenTrabajoGet,ordenTrabajoPost,usuariosGetByID,ordenTrabajoUpdate} = require('../controllers/ordenTrabajo');

const router = Router();
router.get('/', ordenTrabajoGet);
router.get('/:id', usuariosGetByID);
router.post('/', ordenTrabajoPost);
router.post('/actualizar-estado',ordenTrabajoUpdate)

module.exports = router;