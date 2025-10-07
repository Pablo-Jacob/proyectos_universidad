const express = require('express');
const router = express.Router();
const UsuarioController = require('../controller/usuario_controller');
const auth = require('../../../middlewares/auth');
//Rutas de usuarios públicas
router.post('/', UsuarioController.crearUsuario);
router.post('/cambiar_password_token', UsuarioController.cambiarPasswordPorToken);
router.get('/', UsuarioController.obtenerUsuarios);
router.get('/:id', UsuarioController.obtenerUsuario);
router.put('/:id', UsuarioController.actualizarUsuario);
router.post('/cambiar_password', UsuarioController.cambiarPassword);
router.get('/:id/roles', UsuarioController.obtenerRolesUsuario);
router.post('/asignar_rol', UsuarioController.asignarRolUsuario);
router.delete('/eliminar_rol', UsuarioController.eliminarRolUsuario);

module.exports = router;