-- database/setup/01_create_database.sql
/* 
 * Script: Creación de la Base de Datos
 * Autor: Pablo Jacob
 * Descripción: Este script crea la base de datos 'ims' (Integrated Management System) 
 * con la codificación y collation correctos para el proyecto.
 * Es el primer script que debe ejecutarse.
 */
-- Crear la base de datos si no existe
create database if not exists ims character set utf8mb4 collate utf8mb4_spanish_ci;
-- Seleccionar la base de datos para operaciones subsiguientes
use ims;

-- Mensaje de confirmación
select 'Paso 1 Completado: Base de datos "ims" creada' as Resultado;