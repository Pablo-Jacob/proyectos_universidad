const producto_model = require('../../../src/modules/modulo_1/models/producto_model');

async function testManual() {
    console.log('TEST MANUAL PRODUCTOS\n');

    try {
        /**
         * const nuevoProducto = await producto_model.crearProducto('Teclado Inalambrico Logitech"', 292.00);
         * console.log('Producto creado:', nuevoProducto.id_producto);

         * const producto = await producto_model.obtenerProducto(nuevoProducto.id_producto);
         * console.log('Producto obtenido:', producto.descripcion);

         * const todosProductos = await producto_model.obtenerTodosProductos();
        */
       console.log('Total productos:', todosProductos.length);

        const modificarProducto = await producto_model.actualizarProducto(3, 'Monitor 27 "', 299.99);
        console.log('Producto modificado correctamente', modificarProducto);

        console.log('\n¡TODOS LOS TESTS PASARON!');

    }
    catch(error) {
        console.error('Error:', error.message);
    }
}
testManual();