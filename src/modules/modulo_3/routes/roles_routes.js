const express = require('express');
const router = express.Router();
const RolController = require('../controller/roles_controller');
//Rutas
router.post('/', RolController.crearRol);
router.get('/', RolController.obtenerTodosRoles);
router.get('/:id', RolController.obtenerRol);
router.post('/asignar', RolController.asignarRol);
router.get('/usuario/:id', RolController.obtenerRolesUsuario);

module.exports = router;