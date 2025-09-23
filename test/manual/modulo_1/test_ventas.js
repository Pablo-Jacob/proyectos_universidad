const venta_model = require('../../../src/modules/modulo_1/models/venta_model');

async function testManual() {
    console.log('TEST MANUAL VENTAS\n');

    const venta = [{
        "id": 3,
        "cantidad": 1
    }];
    try {
        /**
         * const crearVenta = await venta_model.crearVenta(JSON.stringify(venta));
         * console.log('Venta creada: ', crearVenta.id_venta_generada);
        */ 
        const fecha_inicio = '2025-09-22';
        const fecha_fin = '2025-09-22';

        const eliminarVenta = await venta_model.eliminarVenta(3);
        console.log('Mensaje: ', eliminarVenta.id_venta);
        
        const consultarVentaEliminada = await venta_model.obtenerVenta(3);
        console.log('Encabezado: ', consultarVentaEliminada.encabezado);
        console.log('Detalles: ', consultarVentaEliminada.detalles);

        const todasVentas = await venta_model.obtenerTodasVentas('2025-09-30', '2025-09-30');
        console.log('Total ventas: ', todasVentas.length);

        if(todasVentas.length > 0) {
            console.log('Total ventas: ', todasVentas.length);
            console.log('\n!TODOS LOS TEST PASARON!');
        }
        else {
            console.log('No se encontraron ventas en el rango de fechas');
        }
    }
    catch(error) {
        console.error('Error: ', error.message);
    }
}
testManual();