const db = require('../../../config/database');

const ComprasModel = {
    // ========== PROCEDIMIENTOS DE COMPRAS ==========
    /**
     * Crear compra
     */
    crearCompra: async(productosJSON, idProveedor = null) => {
        const query = 'call create_compra(?, ?)';
        const [results] = await db.query(query, [productosJSON, idProveedor]);
        return results[0][0];
    },
    /**
     * Obtener compra con detalles
     */
    obtenerCompra: async(idCompra) => {
        const query = 'call read_compra(?)';
        const [results] = await db.query(query, [idCompra]);
        return {
            encabezado: results[0][0],
            detalles: results[1]
        };
    },
    /**
     * Obtener todas las compras
     */
    obtenerTodasCompras: async(fechaInicio = null, fechaFin = null) => {
        const query = 'call read_compras(?, ?)';
        const [results] = await db.query(query, [fechaInicio, fechaFin]);
        return results[0];
    }
};
module.exports = ComprasModel;