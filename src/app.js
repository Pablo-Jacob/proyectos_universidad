const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.port || 3000;
//Rutas de los módulos
const productoRoutes = require('./modules/modulo_1/routes/producto_routes');
const ventaRoutes = require('./modules/modulo_1/routes/venta_routes');
const comprasRoutes = require('./modules/modulo_2/routes/compras_routes');
const existenciaRoutes = require('./modules/modulo_2/routes/existencia_routes');
const proveedorRoutes = require('./modules/modulo_3/routes/proveedor_routes');
const usuarioRoutes = require('./modules/modulo_3/routes/usuario_routes');
const rolRoutes = require('./modules/modulo_3/routes/roles_routes');
//Middlewares globales
app.use(express.json()); //Para parsear json en req.body
//Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/existencias', existenciaRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', rolRoutes);
//Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Ruta no encontrada'
    });
});
//Manejo de errores global
app.use((error, req, res, next) => {
    console.error('Error del servidor:', error);
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
    });
});
app.listen(process.env.port || port, () => {
    console.log(`servidor corriendo en http://localhost:${port}`);
});
module.exports = app;