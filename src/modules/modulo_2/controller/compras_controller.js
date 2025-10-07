const compras_model = require('../models/compras_model');

const ComprasController = {
    /**
     * Crear compra completa
     */
    crearCompra: async(req, res) => {
        try {
            const { productos, id_proveedor } = req.body;

            if((!Array.isArray(productos)) || (productos.length == 0)) {
                return res.status(400).json({
                    success: false,
                    error: 'Debes enviar al menos un producto'
                });
            }
            const jsonString = JSON.stringify(productos);
            const resultado = await compras_model.crearCompra(jsonString, id_proveedor || null);

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
     * Obtener compra con detalles
     */
    obtenerCompra: async(req, res) => {
        try {
            const { id } = req.params;
            const compra = await compras_model.obtenerCompra(parseInt(id));

            if((!compra) || (!compra.encabezado)) {
                return res.status(400).json({
                    success: false,
                    error: 'Compra no encontrada'
                });
            }
            res.json({
                success: true,
                data: compra
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
     * Obtener todas las compras
     */
    obtenerTodasCompras: async(req, res) => {
        try {
            const { fecha_inicio, fecha_fin } = req.query;
            
            const compras = await compras_model.obtenerTodasCompras(
                fecha_inicio || null,
                fecha_fin || null
            );
            res.json({
                success: true,
                data: compras,
                count: compras.length
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
module.exports = ComprasController;