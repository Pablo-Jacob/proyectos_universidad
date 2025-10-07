const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/producto_controller');
const auth = require('../../../middlewares/auth');
//Rutas de públicas
router.get('/', ProductosController.obtenerTodosProductos);
router.get('/:id', ProductosController.obtenerProducto);
//Rutas protegidas (requieren autenticación)
router.post('/', ProductosController.crearProducto);
router.put('/:id', ProductosController.actualizarProducto);
router.delete('/:id', ProductosController.eliminarProducto);

module.exports = router;