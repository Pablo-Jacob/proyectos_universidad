-- database/modulo_1/data/test_data.sql
/*
 * Script: Datos de prueba usando procedimientos almacenados
 * Descripción:
 *  - Inserción de productos usando SP
 *  - Creación de ventas usando SP
 *  - Validación de bitácoras
 */
-- Usuario de prueba
-- Limpiar tablas (opcional para reiniciar pruebas)
set foreign_key_checks = 0;
truncate table ventas_det;
truncate table ventas_enc;
truncate table productos;
truncate table bitacora_productos;
truncate table bitacora_ventas_enc;
set foreign_key_checks = 1;
-- Insertar productos (SP create_producto)
call create_producto('Teclado Inalambrico Logitech', 292.00);
call create_producto('Mouse Inalambrico Micrososft', 165.00);
-- Leer productos
call read_productos();
-- Crear ventas de prueba (SP create_venta)
-- Venta 1: 1 Teclado y 1 mouse
call create_venta(
  '[{"id":1,"cantidad":1},{"id":2,"cantidad":1}]'
);
set @id_venta = last_insert_id();
-- Consultar ventas
call read_ventas(null, null);  -- todas las ventas
call read_venta(@id_venta);	   -- detalle de la primera venta
-- Consultar bitácoras
select *from bitacora_productos order by fecha_hora desc;
select *from bitacora_ventas_enc order by fecha_hora desc;