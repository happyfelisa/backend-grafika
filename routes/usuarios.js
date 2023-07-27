
const { Router } = require('express');


//OPTIMIZADO
// const { check } = require('express-validator');
// const {validarCampos,validarJWT,esAdminRole,tieneRol} = require('../middlewares');
// const {esRoleValue, emailExiste, existeUsuarioPorId} = require('../helpers/dbValidators')


const { usuariosGet, 
        usuariosGetByID,
        usuariosPost } = require('../controllers/usuarios');


//al que se le va a configurar las rutas
const router = Router();
router.get('/', usuariosGet);
router.get('/:id', usuariosGetByID);
router.post('/', usuariosPost);
// , [
//   check('nombre','el nombre es obligatorio').not().isEmpty(),
//   check('password','el password debe de ser más de 6 letras').isLength({min:6}),
//   check('correo','el correo no es válido').isEmail(),
//   //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
//   //si el argumento de la funcion de flecha es el mismo qué la función qué se llamará solo se pone el nombre del a función (rol) => esRoleValue(rol)
//   check('rol').custom( esRoleValue ),
//   check('correo').custom(emailExiste),
//   validarCampos
// ] 

  module.exports = router;