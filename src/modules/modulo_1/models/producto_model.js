const db = require('../../../config/database'); 

const ProductosModel = {
    // ========== PROCEDIMIENTOS DE PRODUCTOS ==========
    /**
     * Crear producto
     */
    crearProducto: async (descripcion, precio_unitario) => {
        const query = 'call create_producto(?, ?)';
        const [results] = await db.query(query, [descripcion, precio_unitario]);
        return results[0][0];
    },
    /**
     * Obtener producto por ID
     */
    obtenerProducto: async(idProducto) => {
        const query = 'call read_producto(?)';
        const [results] = await db.query(query, [idProducto]);
        return results[0][0];
    },
    /**
     * Obtener todos los productos
     */
    obtenerTodosProductos: async() => {
        const query = 'call read_productos()';
        const [results] = await db.query(query);
        return results[0];
    },
    /**
     * Actualizar producto
     */
    actualizarProducto: async(idProducto, descripcion, precio_unitario) => {
        const query = 'call update_producto(?, ?, ?)';
        const [results] = await db.query(query, [idProducto, descripcion, precio_unitario]);
        return results[0][0];
    },
    /**
     * Eliminar producto
     */
    eliminarProducto: async(idProducto) => {
        const query = 'call delete_producto(?)';
        const [results] = await db.query(query, [idProducto]);
        return results[0][0];
    }
};
module.exports = ProductosModel;