const express = require('express');
const router = express.Router();
const VentasController = require('../controllers/venta_controller');
const auth = require('../../../middlewares/auth');
//Rutas de ventas, todas protegidas
router.post('/', VentasController.crearVenta);
router.get('/', VentasController.obtenerTodasVentas);
router.get('/:id', VentasController.obtenerVenta);

module.exports = router;