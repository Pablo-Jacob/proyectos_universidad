require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.port || 3000;

const app = express();
//Middlewares
app.use(cors());
app.use(express.json());
//Importar rutas
const productoRoutes = require('./modules/modulo_1/routes/producto_routes');
const ventasRoutes = require('./modules/modulo_1/routes/venta_routes');
const comprasRoutes = require('./modules/modulo_2/routes/compras_routes');
const existenciaRoutes = require('./modules/modulo_2/routes/existencia_routes');
const proveedorRoutes = require('./modules/modulo_3/routes/proveedor_routes');
const usuarioRoutes = require('./modules/modulo_3/routes/usuario_routes');
const rolRoutes = require('./modules/modulo_3/routes/roles_routes');
//Usar rutas
app.use('/api/productos', productoRoutes);
app.use('/api/ventas', ventasRoutes);
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