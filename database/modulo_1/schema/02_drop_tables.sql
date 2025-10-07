-- database/modulo_1/schema/02_drop_tables.sql
/*
 * Script: Eliminación de Tablas
 * Descripción: Elimina las tablas del módulo 1 respetando dependencias.
 */
-- Primero eliminar tablas dependientes
drop table if exists ventas_det;
drop table if exists bitacora_productos;
drop table if exists bitacora_ventas_enc;
-- Luego eliminar tablas referenciadas
drop table if exists ventas_enc;
drop table if exists productos;