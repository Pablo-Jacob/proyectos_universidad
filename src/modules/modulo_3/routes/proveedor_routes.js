const express = require('express');
const router = express.Router();
const ProveedoresController = require('../controller/proveedor_controller');
const auth = require('../../../middlewares/auth');
//Rutas para proveedores públicas
router.get('/', ProveedoresController.obtenerProveedores);
router.get('/:id', ProveedoresController.obtenerProveedor);
router.post('/', ProveedoresController.crearProveedor);
router.put('/:id', ProveedoresController.actualizarProveedor);

module.exports = router;