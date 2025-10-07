-- database/modulo_2/schema/02_drop_tables.sql
/*
 * Script: Eliminación de Tablas
 * Descripción: Elimina las tablas del módulo 2 respetando dependencias.
 */
-- Primero eliminar tablas dependientes
drop table if exists compras_det;
drop table if exists existencia;
-- Luego eliminar tablas referenciadas
drop table if exists compras_enc;