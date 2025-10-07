const express = require('express');
const router = express.Router();
const ComprasController = require('../controller/compras_controller');
const auth = require('../../../middlewares/auth');
//Rutas de compras, todas protegidas
router.post('/', ComprasController.crearCompra);
router.get('/', ComprasController.obtenerTodasCompras);
router.get('/:id', ComprasController.obtenerCompra);

module.exports = router;