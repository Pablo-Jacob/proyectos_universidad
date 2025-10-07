const db = require('../../../config/database');

const RolModel = {
    /**
     * Crear nuevo rol
     */
    crearRol: async(nombre) => {
        const query = 'call create_rol(?)';
        const [results] = await db.query(query, [nombre]);
        return results[0][0];
    },
    /**
     * Obtener rol por id
     */
    obtenerRol: async(idRol) => {
        const query = 'call read_rol(?)';
        const [results] = await db.query(query, [idRol]);
        return {
            rol: results[0][0],
            mensaje: results[1][0]
        };
    },
    /**
     * Asignar rol a usuario
     */
    asignarRolUsuario: async(idUsuario, idRol) => {
        const query = 'call asignar_rol_usuario(?, ?)';
        const [results] = await db.query(query, [idUsuario, idRol]);
        return results[0][0];
    },
    /**
     * Obtener roles de un usuario
     */
    obtenerRolesUsuario: async(idUsuario) => {
        const query = 'call obtener_roles_usuario(?)';
        const [results] = await db.query(query, [idUsuario]);
        return results[0];
    },
    /**
     * Obtener todos los roles disponibles
     */
    obtenerTodosRoles: async() => {
        const query = 'call read_roles()';
        const [results] = await db.query(query);
        return {
            roles: results[0],
            total: results[1][0].total_roles,
            mensaje: results[1][0].mensaje
        };
    }
};
module.exports = RolModel;