const productos_model = require('../models/producto_model');

const ProductosController = {
    /**
     * Crear nuevo producto
     */
    crearProducto: async(req, res) => {
        try {
            const { descripcion, precio_unitario } = req.body;
            //Validaciones
            if(!descripcion || !precio_unitario) {
                return res.status(400).json({
                    success: false,
                    error: 'Descripción y precio unitario son requeridos'
                });
            }
            if(precio_unitario <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'El precio unitario debe ser mayor a 0'
                });
            }
            const resultado = await productos_model.crearProducto(
                descripcion,
                precio_unitario
            );
            res.status(201).json({
                success: true,
                data: resultado,
                message: 'Producto creado exitosamente'
            });
        }
        catch(error) {
            console.error('Error creando producto:', error.message);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },
    /**
     * Obtener producto por ID
     */
    obtenerProducto: async(req, res) => {
        try {
            const { id } = req.params;

            if(!id || isNaN(parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de producto válido es requerido'
                });
            }
            const producto = await productos_model.obtenerProducto(parseInt(id));

            if(!producto) {
                return res.status(404).json({
                    success: false,
                    error: 'Producto no encontrado'
                });
            }
            res.json({
                success: true,
                data: producto
            });
        }
        catch(error) {
            console.error('Error obteniendo producto:', error.message);
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
                count: productos.length,
                message: productos.length === 0 ? 
                    'No hay productos registrados' : 
                    'Productos obtenidos exitosamente'
            });
        }
        catch(error) {
            console.error('Error obteniendo productos:', error.message);
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

            if(!id || isNaN(parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de producto válido es requerido'
                });
            }
            if(!descripcion || !precio_unitario) {
                return res.status(400).json({
                    success: false,
                    error: 'Descripción y precio unitario son requeridos'
                });
            }
            const resultado = await productos_model.actualizarProducto(
                parseInt(id),
                descripcion,
                precio_unitario
            );
            res.json({
                success: true,
                data: resultado,
                message: 'Producto actualizado exitosamente'
            });
        }
        catch(error) {
            console.error('Error actualizando producto:', error.message);
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

            if(!id || isNaN(parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de producto válido es requerido'
                });
            }
            const resultado = await productos_model.eliminarProducto(parseInt(id));

            res.json({
                success: true,
                data: resultado,
                message: 'Producto eliminado exitosamente',
            });
        }
        catch(error) {
            console.error('Error eliminando producto:', error.message);
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
};
module.exports = ProductosController;