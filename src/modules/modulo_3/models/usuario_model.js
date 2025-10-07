const db = require('../../../config/database');

const UsuariosModel = {
    /**
     * Crear un nuevo usuario
     */
    crearUsuario: async (nombreUsuario, password, email) => {
        const query = 'call create_usuario(?, ?, ?)';
        const [results] = await db.query(query, [nombreUsuario, password, email]);
        return results[0][0];
    },
    /**
     * Obtener todos los usuarios
     */
    obtenerUsuarios: async () => {
        const query = 'call read_usuarios()';
        const [results] = await db.query(query);
        return results[0];
    },
    /**
     * Obtener usuario por ID
     */
    obtenerUsuarioPorId: async (idUsuario) => {
        const query = 'call read_usuario(?)';
        const [results] = await db.query(query, [idUsuario]);
        return {
            usuario: results[0][0],
            mensaje: results[1][0]
        };
    },
    /**
     * Actualizar usuario
     */
    actualizarUsuario: async (idUsuario, nombreUsuario, email) => {
        const query = 'call update_usuario(?, ?, ?)';
        const [results] = await db.query(query, [idUsuario, nombreUsuario, email]);
        return results[0][0];
    },
    /**
     * Cambiar contraseña
     */
    cambiarPassword: async (idUsuario, passwordActual, passwordNueva) => {
        const query = 'call cambiar_password(?, ?, ?, @token)';
        await db.query(query, [idUsuario, passwordActual, passwordNueva]);
        const [tokenResult] = await db.query('select @token as token');
        return { token: tokenResult[0].token };
    },
    /**
     * Cambiar contraseña por token
     */
    cambiarPasswordPorToken: async (idUsuario, tokenActual, passwordNueva) => {
        const query = 'call cambiar_password_por_token(?, ?, ?, @token)';
        await db.query(query, [idUsuario, tokenActual, passwordNueva]);
        const [tokenResult] = await db.query('select @token as token');
        return { token: tokenResult[0].token };
    },
    /**
     * Establecer usuario actual en sesión MySQL
     */
    establecerUsuarioActual: async(idUsuario, nombreUsuario) => {
        const query = 'call establecer_usuario_actual(?, ?)';
        const [results] = await db.query(query, [idUsuario, nombreUsuario]);
        return results[0][0];
    },
    /**
     * Obtener usuario acutal de sesión MySQL
     */
    obtenerUsuarioActual: async () => {
        const query = 'CALL obtener_usuario_actual()';
        const [results] = await db.query(query);
        return results[0][0];
    },
    /**
     * Limpiar sesión de usuario en MySQL
     */
    limpiarUsuarioActual: async () => {
        const query = 'call limpiar_usuario_actual()';
        const [results] = await db.query(query);
        return results[0][0];
    }
};
module.exports = UsuariosModel;