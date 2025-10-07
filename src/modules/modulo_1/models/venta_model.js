const db = require('../../../config/database');

const VentasModel = {
    // ========== PROCEDIMIENTOS DE VENTAS ==========
    /**
     * Crear venta 
     */
    crearVenta: async(productosJSON) => {
        const query = 'call create_venta(?)';
        const [results] = await db.query(query, [productosJSON]);
        return results[0][0];
    },
    /**
     * Obtener venta con detalles
     */
    obtenerVenta: async(idVenta) => {
        const query = 'call read_venta(?)';
        const [results] = await db.query(query, [idVenta]);
        return {
            encabezado: results[0][0],
            detalles: results[1]
        };
    },
    /**
     * Obtener todas las ventas
     */
    obtenerTodasVentas: async(fechaInicio = null, fechaFin = null) => {
        const query = 'call read_ventas(?, ?)';
        const [results] = await db.query(query, [fechaInicio, fechaFin]);
        return results[0];
    }
};
module.exports = VentasModel;