-- database/setup/02_grant_privileges.sql
/*
 * Script: Asignación de Privilegios
 * Descripción: Crear usuario dedicado para la aplicación con permisos específicos
 */
-- Crear un usuario específico para la aplicación
drop user if exists 'app_ims_user'@'localhost';
create user if not exists 'app_ims_user'@'localhost' identified by 'password_proyect_123';
-- Otorgar permisos SOLO sobre la base de datos del proyecto
grant select, insert, update, delete, execute on ims.* to 'app_ims_user'@'localhost';
-- Recargar privilegios para que surtan efecto
flush privileges;
-- Mensaje de confimación
select 'Usuario: app_ims_user creado con permisos de aplicación' as Resultado;