const RolModel = require('../models/roles_model');

const RolController = {
    /**
     * Crear nuevo rol
     */
    crearRol: async(req, res) => {
        try {
            const { nombre } = req.body;

            if(!nombre) {
                return res.status(400).json({
                    success: false,
                    error: 'El nombre del rol es requerido'
                });
            }
            const resultado = await RolModel.crearRol(nombre);

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
     * Obtener rol por id
     */
    obtenerRol: async(req, res) => {
        try {
            const { id } = req.params;

            if(!id || isNaN(parseInt(id))) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de rol válido es requerido'
                });
            }
            const resultado = await RolModel.obtenerRol(parseInt(id));

            if(!resultado.rol) {
                return res.status(404).json({
                    success: false,
                    error: 'Rol no encontrado'
                });
            }
            res.json({
                success: true,
                data: resultado
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
     * Obtener todos los roles
     */
    obtenerTodosRoles: async(req, res) => {
        try {
            const resultado = await RolModel.obtenerTodosRoles();

            res.json({
                success: true,
                data: resultado.roles,
                total: resultado.total,
                message: resultado.mensaje
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
     * Asignar rol a usuario
     */
    asignarRol: async(req, res) => {
        try {
            const { id_usuario, id_rol } = req.body;

            if(!id_usuario || !id_rol) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de usuario y id de rol son requeridos'
                });
            }
            const resultado = await RolModel.asignarRolUsuario(
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
     * Obtener roles de un usuario
     */
    obtenerRolesUsuario: async(req, res) => {
        try {
            const { id } = req.params;
            const roles = await RolModel.obtenerRolesUsuario(parseInt(id));

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
    }
};
module.exports = RolController;