const express = require('express');
const router = express.Router();
const ExistenciaController = require('../controller/existencia_controller');

//Rutas de existencia
router.get('/:id', ExistenciaController.obtenerExistencias);
router.get('/', ExistenciaController.obntenerrMovimientos);
module.exports = router;