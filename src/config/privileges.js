const db = require('./database');
require('dotenv').config();
//Configuración de conexión para el usuario de la aplicación
const APP_USER_CONFIG = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};
//Roles y permisos alineados con los privilegios de la DB
const ROLES = {
    ADMIN: 'admin',
    VENTAS: 'usuario_ventas',
    COMPRAS: 'usuario_compras',
    PROVEEDORES: 'usuario_proveedores',
    CONSULTA: 'usuario_consulta'
};
//Mapeo de permisos por módulo (basado en los grants SQL)
const MODULE_PRIVILEGES = {
    //Todos los user heredan los permisos básicos del app_user
    ALL: {
        [ROLES.ADMIN]: ['select', 'insert', 'update', 'delete', 'execute'],
        [ROLES.VENTAS]: ['select', 'insert', 'update', 'delete', 'execute'],
        [ROLES.COMPRAS]: ['select', 'insert', 'update', 'delete', 'execute'],
        [ROLES.PROVEEDORES]: ['select', 'insert', 'update', 'delete', 'execute'],
        [ROLES.CONSULTA]: ['select'] //Solo lectura
    }
};
//Verificar conexión con el usuario de la aplicación
const testAppUserConnection = async() => {
    try {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(APP_USER_CONFIG);
        await connection.execute('select 1');
        await connection.end();
        console.log('Conexión con app_ims_user verificada correctamente');
        return true;
    }
    catch(error) {
        console.error('Error conectando con app_ims_user:', error.message);
        return false;
    }
};
//Middleware para verificar permisos
const checkPermission = (action) => {
    return async (req, res, next) => {
        try {
            //Si el usuario es admin, tiene todos los permisos
            if(req.user && req.user.rol === ROLES.ADMIN) {
                return next();
            }
            //Para usuarios de consulta, solo permitir SELECT
            if(req.user && req.user.rol === ROLES.CONSULTA && action != 'select') {
                return res.status(403).json({
                    error: 'Permiso denegado: Rol de solo consulta'
                });
            }
            //Verificar permisos específicos según el rol
            const userRol = req.user?.rol
            const allowedActions = MODULE_PRIVILEGES.ALL[userRol] || [];

            if(allowedActions.includes(action)) {
                next();
            }
            else {
                res.status(403).json({
                    error: `Permiso denegado para ${action}`
                });
            }
        }
        catch(error) {
            console.error('Error verificando permisos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
};
//Función para obtener la configuración del ususrio de la app
const getAppDbConfig = () => {
    return APP_USER_CONFIG;
};
//Verificar roles
const hasRole = (user, role) => {
    return user && user.rol === role;
};
module.exports = {
    APP_USER_CONFIG,
    ROLES,
    MODULE_PRIVILEGES,
    testAppUserConnection,
    checkPermission,
    getAppDbConfig,
    hasRole
};