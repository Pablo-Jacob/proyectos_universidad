const ProveedoresModel = require('../models/proveedor_model');

const ProveedoresController = {
    /**
     * Crear un nuevo proveedor
     */
    crearProveedor: async (req, res) => {
        try {
            const { nit, nombre, direccion, telefono } = req.body;
            //Validar campos requeridos
            if(!nit || !nombre) {
                return res.status(400).json({
                    success: false,
                    error: 'NIT y nombre son campos requeridos'
                });
            }
            const resultado = await ProveedoresModel.crearProveedor(
                nit, 
                nombre, 
                direccion || null, 
                telefono || null
            );
            res.status(201).json({
                success: true,
                data: resultado,
                message: 'Proveedor creado exitosamente'
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
     * Obtener todos los proveedores
     */
    obtenerProveedores: async (req, res) => {
        try {
            const proveedores = await ProveedoresModel.obtenerProveedores();

            res.json({
                success: true,
                data: proveedores,
                count: proveedores.length
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
     * Obtener proveedor por ID
     */
    obtenerProveedor: async (req, res) => {
        try {
            const { id } = req.params;

            if(!id) {
                return res.status(400).json({
                    success: false,
                    error: 'ID del proveedor es requerido'
                });
            }
            const proveedor = await ProveedoresModel.obtenerProveedorPorId(parseInt(id));

            if(!proveedor) {
                return res.status(404).json({
                    success: false,
                    error: 'Proveedor no encontrado'
                });
            }
            res.json({
                success: true,
                data: proveedor
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },
    /**
     * Actualizar proveedor
     */
    actualizarProveedor: async (req, res) => {
        try {
            const { id } = req.params;
            const { nit, nombre, direccion, telefono } = req.body;

            if(!id) {
                return res.status(400).json({
                    success: false,
                    error: 'ID del proveedor es requerido'
                });
            }
            if(!nit || !nombre) {
                return res.status(400).json({
                    success: false,
                    error: 'NIT y nombre son campos requeridos'
                });
            }
            const resultado = await ProveedoresModel.actualizarProveedor(
                parseInt(id),
                nit,
                nombre,
                direccion || null,
                telefono || null
            );
            res.json({
                success: true,
                data: resultado,
                message: 'Proveedor actualizado exitosamente'
            });
        }
        catch(error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};
module.exports = ProveedoresController;