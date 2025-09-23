const ventas_model = require('../models/venta_model');

const VentasController = {
    /**
     * Crear venta completa
     */
    crearVenta: async(req, res) => {
        try {
            const { productos } = req.body;

            if((!Array.isArray(productos)) || (productos.length == 0)) {
                return res.status(400).json({
                    success: false,
                    error: 'Debes enviar al menos un producto'
                });
            }
            const jsonString = JSON.stringify(productos);
            const resultado = await ventas_model.crearVenta(jsonString);
            
            res.status(201).json({
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
     * Obtener venta con detalles
     */
    obtenerVenta: async(req, res) => {
        try {
            const { id } = req.params;
            const venta = await ventas_model.obtenerVenta(parseInt(id));

            if((!venta) || (!venta.encabezado)) {
                return res.status(400).json({
                    success: false,
                    error: 'Venta no encontrada'
                });
            }
            res.json({
                success: true,
                data: venta
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
     * Obtener todas las ventas
     */
    obtenerTodasVentas: async(req, res) => {
        try {
            const { fecha_inicio, fecha_fin } = req.query;
            
            const ventas = await ventas_model.obtenerTodasVentas(
                fecha_inicio || null,
                fecha_fin || null
            );
            res.json({
                success: true,
                data: ventas,
                count: ventas.length
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
     * Actualizar venta
     */
    actualizarVenta: async(req, res) => {
        try {
            const { id } = req.params;
            const { fecha } = req.body;
            
            const resultado = await ventas_model.actualizarVenta(
                parseInt(id),
                fecha
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
     * Eliminar venta
     */
    eliminarVenta: async(req, res) => {
        try {
            const { id } = req.params;
            
            const resultado = await ventas_model.eliminarVenta(
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
module.exports = VentasController;