const jwt = require('jsonwebtoken');
const UsuariosModel = require('../modules/modulo_3/models/usuario_model');

const auth = {
    /**
     * Middleware de autenticación JWT
     */
    authenticateToken: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if(!token) {
                return res.status(401).json({ 
                    success: false,
                    error: 'Token de autenticación requerido' 
                });
            }
            //Convertir a Promise para mejor manejo de errores
            const user = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if(err) reject(err);
                    else resolve(decoded);
                });
            });
            req.user = user;
            next();            
        }
        catch(error) {
            console.error('Error en autenticación:', error.message);
            
            if(error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    error: 'Token expirado'
                });
            }
            else if(error.name === 'JsonWebTokenError') {
                return res.status(403).json({
                    success: false,
                    error: 'Token inválido'
                });
            }
            else {
                return res.status(500).json({
                    success: false,
                    error: 'Error en la autenticación'
                });
            }
        }
    },
    /**
     * Middleware para establecer sesión de usuario en MySQL
     */
    establecerSesionMySQL: async (req, res, next) => {
        try {
            //Verificar que el usuario está autenticado primero
            if(!req.user) {
                return next();
            }
            const userId = req.user.id;
            const username = req.user.nombre_usuario;
            
            if(userId && username) {
                await UsuariosModel.establecerUsuarioActual(userId, username);
                console.log(`Sesión MySQL establecida para usuario: ${username}`);
            }
            next();
        }
        catch(error) {
            console.error('Error estableciendo sesión MySQL:', error.message);
            //No bloqueamos la request por este error
            next();
        }
    },
    /**
     * Middleware para limpiar sesión al finalizar la respuesta
     */
    limpiarSesionMySQL: async (req, res, next) => {
        //Registrar el evento solo si hay usuario autenticado
        if(req.user) {
            res.on('finish', async () => {
                try {
                    await UsuariosModel.limpiarUsuarioActual();
                    console.log(`Sesión MySQL limpiada para usuario: ${req.user.nombre_usuario}`);
                }
                catch(error) {
                    console.error('Error limpiando sesión MySQL:', error.message);
                }
            });
        }
        next();
    },
    /**
     * Middleware combinado: Autenticación + Sesión MySQL
     * (Para usar en rutas que requieren ambos)
     */
    authenticateAndSetSession: [
        this.authenticateToken,
        this.establecerSesionMySQL,
        this.limpiarSesionMySQL
    ],
    /**
     * Middleware opcional para rutas públicas que podrían tener usuario
     */
    optionalAuth: async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(token) {
            try {
                const user = await new Promise((resolve, reject) => {
                    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                        if(err) reject(err);
                        else resolve(decoded);
                    });
                });
                req.user = user;
            }
            catch(error) {
                //Token inválido, pero no bloqueamos la request
                console.log('Token opcional inválido:', error.message);
            }
        }
        next();
    }
};
//Corregir la referencia circular en el array combinado
auth.authenticateAndSetSession = [
    auth.authenticateToken,
    auth.establecerSesionMySQL,
    auth.limpiarSesionMySQL
];
module.exports = auth;