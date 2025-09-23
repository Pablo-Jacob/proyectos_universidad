const productos_model = require('../models/producto_model');

const ProductosController = {
    /**
     * Crear nuevo producto
     */
    crearProducto: async(req, res) => {
        try {
            const { descripcion, precio_unitario } = req.body;

            const resultado = await productos_model.crearProducto(
                descripcion,
                precio_unitario
            );
            res.status(201).json({
                success: true,
                data: resultado
            });
        }
        catch(error) {
            res.status(400).json({
                success: false,
                errror: error.message
            });
        }
    },
    /**
     * Obtener producto por ID
     */
    obtenerProducto: async(req, res) => {
        try {
            const { id } = req.params;
            const producto = await productos_model.obtenerProducto(parseInt(id));

            res.json({
                success: true,
                data: producto
            });
        }
        catch(error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },
    /**
     * Obtener todos los productos
     */
    obtenerTodosProductos: async(req, res) => {
        try {
            const productos = await productos_model.obtenerTodosProductos();

            res.json({
                success: true,
                data: productos,
                count: productos.length
            });
        }
        catch(error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    /**
     * Actualizar producto
     */
    actualizarProducto: async (req, res) => {
        try {
            const { id } = req.params;
            const { descripcion, precio_unitario } = req.body;
            
            const resultado = await productos_model.actualizarProducto(
                parseInt(id),
                descripcion,
                precio_unitario,
            );            
            res.json({
                success: true,
                data: resultado
            });
        }
        catch(error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },
    /**
     * Eliminar producto
     */
    eliminarProducto: async (req, res) => {
        try {
            const { id } = req.params;
            
            const resultado = await productos_model.eliminarProducto(
                parseInt(id)
            );         
            res.json({
                success: true,
                data: resultado
            });
        }
        catch(error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
};
module.exports = ProductosController;