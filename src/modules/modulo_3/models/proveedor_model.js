const db = require('../../../config/database');

const ProveedoresModel = {
    /**
     * Crear Proveedor
     */
    crearProveedor: async (nit, nombre, direccion, telefono) => {
        const query = 'call create_proveedor(?, ?, ?, ?)';
        const [results] = await db.query(query, [nit, nombre, direccion, telefono]);
        return results[0][0];
    },
    /**
     * Obtener todos los proveedores
     */
    obtenerProveedores: async () => {
        const query = 'call read_proveedores()';
        const [results] = await db.query(query);
        return results[0];
    },
    /**
     * Obtener Proveedor por id
     */
    obtenerProveedorPorId: async (idProveedor) => {
        const query = 'call read_proveedor(?)';
        const [results] = await db.query(query, [idProveedor]);
        return results[0][0];
    },
    /**
     * Actualizar Proveedor
     */
    actualizarProveedor: async (idProveedor, nit, nombre, direccion, telefono) => {
        const query = 'call update_proveedor(?, ?, ?, ?, ?)';
        const [results] = await db.query(query, [idProveedor, nit, nombre, direccion, telefono]);
        return results[0][0];
    }
};
module.exports = ProveedoresModel;