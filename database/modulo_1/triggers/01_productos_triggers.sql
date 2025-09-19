-- database/modulo_1/tiggers/01_productos_triggers.sql
/*
 * Script: Creación de triggers.
 * Descripción: Creción de los siguientes triggers: Registra en bitacora_productos las operaciones INSERT, UPDATE Y DELETE
 */
drop trigger if exists productos_insert;
drop trigger if exists productos_update;
drop trigger if exists productos_delete;

delimiter //
create trigger productos_insert after insert on productos
for each row
begin
	insert into bitacora_productos(id_producto, descripcion, precio_unitario, usuario, operacion)
		values(new.id_producto, new.descripcion, new.precio_unitario, @usuario_actual, 'INSERT');
end //

create trigger productos_update after update on productos
for each row
begin
	-- insertar valores antiguos
    insert into bitacora_productos(id_producto, descripcion, precio_unitario, usuario, operacion)
		values(old.id_producto, odl.descripcion, old.precio_unitario, @usuario_actual, 'UPDATE');
	-- insertar valores nuevos
    insert into bitacora_productos(id_producto, descripcion, precio_unitario, usuario, operacion)
		values(new.id_producto, new.descripcion, new.precio_unitario, @usuario_actual, 'UPDATE');
end //

create trigger productos_delete after delete on productos
for each row
begin
	insert into bitacora_productos(id_producto, descripcion, precio_unitario, usuario, operacion)
		values(old.id_producto, old.descripcion, old.precio_unitario, @usuario_actual, 'DELETE');
end //
delimiter ;