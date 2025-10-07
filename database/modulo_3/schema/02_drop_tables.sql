-- database/modulo_3/schema/02_drop_tables.sql
/*
 * script: eliminación de tablas módulo 3
 * descripción: elimina las tablas del módulo 3 respetando dependencias.
 */

-- 1. verificar y eliminar la foreign key si existe
set @var = 0;
select count(*) into @var from information_schema.table_constraints 
where constraint_schema = database() 
and table_name = 'compras_enc' 
and constraint_name = 'fk_id_proveedor';

set @sql = if(@var > 0, 'alter table compras_enc drop foreign key fk_id_proveedor', 'select "fk no existe"');
prepare stmt from @sql;
execute stmt;
deallocate prepare stmt;

-- 2. eliminar tablas del módulo 3
drop table if exists asigna_rol;
drop table if exists usuario;
drop table if exists rol;
drop table if exists proveedor;