const db = require('../../../config/database');

const ExistenciaModel = {
    // ========== PROCEDIMIENTOS DE EXISTENCIAS ==========
    /**
     * Registrar entrada de productos (compra)
     */
    registrarEntrada: async(idCompra, idProducto) => {
        const query = 'call insert_entrada(?, ?)';
        const [results] = await db.query(query, [idCompra, idProducto]);
        return results[0][0];
    },
    /**
     * Registrar salida de productos (venta)
     */
    registrarSalida: async(idVenta, idProducto) => {
        const query = 'call insert_salida(?, ?)';
        const [results] = await db.query(query, [idVenta, idProducto]);
        return results[0][0];
    },
    /**
     * Obtener el registro de existencia (cantidad de productos)
     */
    obtenerExistencias: async(idProducto) => {
        const query = 'call read_existencias(?)';
        const [results] = await db.query(query, [idProducto]);
        return results[0][0];
    },
    /**
     * Obtener los movimientos (compra/venta)
     */
    obtenerMovimientos: async(fechaInicio = null, fechaFin = null) => {
        const query = 'call read_movimientos(?, ?)';
        const [results] = await db.query(query, [fechaInicio, fechaFin]);
        return results[0];
    }
};
module.exports = ExistenciaModel;