const existencia_model = require('../models/existencia_model');

const ExistenciaController = {
    /**
     * Registrar entrada de productos (compra)
     */
    registrarEntrada: async(req, res) => {
        try {
            const { idCompra, idProducto } = req.query;

            const registro = await existencia_model.registrarEntrada(
                idCompra,
                idProducto
            );
            res.json({
                success: true,
                data: registro,
                count: registro.length
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
     * Registrar salida de productos (venta)
     */
    registrarSalida: async(req, res) => {
        try {
            const { idVenta, idProducto } = req.query;

            const registro = await existencia_model.registrarSalida(
                idVenta,
                idProducto
            );
            res.json({
                success: true,
                data: registro,
                count: registro.length
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
     * Obtener el registro de existencia
     */
    obtenerExistencias: async(req, res) => {
        try {
            const { id } = req.params;
            const registro = await existencia_model.obtenerExistencias(parseInt(id));

            if(!registro) {
                return res.status(400).json({
                    success: false,
                    error: 'Registro no encontrado'
                });
            }
            res.json({
                success: true,
                data: registro
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
     * Obtener los movimientos (compra/venta)
     */
    obntenerrMovimientos: async(req, res) => {
        try {
            const { fecha_inicio, fecha_fin } = req.query;
            
            const registro = await existencia_model.obtenerMovimientos(
                fecha_inicio || null,
                fecha_fin || null
            );
            res.json({
                success: true,
                data: registro,
                count: registro.length
            });
        }
        catch(error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};
module.exports = ExistenciaController;