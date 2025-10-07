const UsuariosModel = require('../models/usuario_model');

const UsuarioController = {
    /**
     * Crear un nuevo usuario
     */
    crearUsuario: async(req, res) => {
        try {
            const { nombre_usuario, password, email } = req.body;

            if (!nombre_usuario || !password || !email) {
                return res.status(400).json({
                    success: false,
                    error: 'Todos los campos son requeridos: nombre_usuario, password, email'
                });
            }
            const resultado = await UsuariosModel.crearUsuario(nombre_usuario, password, email);
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
     * Obtener todos los usuarios
     */
    obtenerUsuarios: async(req, res) => {
        try {
            const usuarios = await UsuariosModel.obtenerUsuarios();
            res.json({
                success: true,
                data: usuarios,
                count: usuarios.length
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
     * Obtener usuario por ID
     */
    obtenerUsuario: async(req, res) => {
        try {
            const { id } = req.params;
            const usuario = await UsuariosModel.obtenerUsuarioPorId(parseInt(id));

            if(!usuario.usuario) {
                return res.status(404).json({
                    success: false,
                    error: 'Usuario no encontrado'
                });
            }
            res.json({
                success: true,
                data: usuario
            });
        }
        catch(error) {
            res.status(404).json({
                success: false,
                error: error.message
            });
        }
    },
    /**
     * Actualizar usuario
     */
    actualizarUsuario: async(req, res) => {
        try {
            const { id } = req.params;
            const { nombre_usuario, email } = req.body;

            if(!nombre_usuario || !email) {
                return res.status(400).json({
                    success: false,
                    error: 'Nombre de usuario y email son requeridos'
                });
            }
            const resultado = await UsuariosModel.actualizarUsuario(
                parseInt(id),
                nombre_usuario,
                email
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
     * Cambiar contraseña
     */
    cambiarPassword: async(req, res) => {
        try {
            const { id_usuario, password_actual, password_nueva } = req.body;

            if(!id_usuario || !password_actual || !password_nueva) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario, contraseña actual y nueva contraseña son requeridos'
                });
            }
            const resultado = await UsuariosModel.cambiarPassword(
                id_usuario,
                password_actual,
                password_nueva
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
     * Cambiar contraseña por token
     */
    cambiarPasswordPorToken: async(req, res) => {
        try {
            const { id_usuario, token_actual, password_nueva } = req.body;

            if(!id_usuario || !token_actual || !password_nueva) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario, token actual y nueva contraseña son requeridos'
                });
            }
            const resultado = await UsuariosModel.cambiarPasswordPorToken(
                id_usuario,
                token_actual,
                password_nueva
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
     * obtener roles de un usuario
     */
    obtenerRolesUsuario: async(req, res) => {
        try {
            const { id } = req.params;
            const roles = await UsuariosModel.obtenerRolesUsuario(parseInt(id));

            res.json({
                success: true,
                data: roles,
                count: roles.length
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
     * Asignar rol a usuario
     */
    asignarRolUsuario: async(req, res) => {
        try {
            const { id_usuario, id_rol } = req.body;

            if(!id_usuario || !id_rol) {
                return res.status(400).json({
                    success: false,
                    error: 'id de Usuario y id de Rol son requeridos'
                });
            }
            const resultado = await UsuariosModel.asignarRolUsuario(
                parseInt(id_usuario),
                parseInt(id_rol)
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
     * Eliminar rol de usuario
     */
    eliminarRolUsuario: async(req, res) => {
        try {
            const { id_usuario, id_rol } = req.body;

            if(!id_usuario || !id_rol) {
                return res.status(400).json({
                    success: false,
                    error: 'id de usuario y id de rol son requeridos'
                });
            }
            const resultado = await UsuariosModel.eliminarRolUsuario(
                parseInt(id_usuario),
                parseInt(id_rol)
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
module.exports = UsuarioController;