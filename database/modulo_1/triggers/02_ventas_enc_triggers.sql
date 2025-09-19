-- database/modulo_1/tiggers/02_ventas_triggers.sql
/*
 * Script: Creación de triggers.
 * Descripción: Creción de los siguientes triggers: Registra en bitacora_ventas_enc las operaciones INSERT, UPDATE Y DELETE
 */
drop trigger if exists ventas_enc_insert;
drop trigger if exists ventas_enc_update;
drop trigger if exists ventas_enc_delete;

delimiter //
create trigger ventas_enc_insert after insert on ventas_enc
for each row
begin
	insert into bitacora_ventas_enc(id_venta, total, usuario, operacion)
		values(new.id_venta, new.total, @usuario_actual, 'INSERT');
end //

create trigger update_ventas_enc after update on ventas_enc
for each row
begin
	-- insertar valores antiguos
    insert into bitacora_ventas_enc(id_venta, total, usuario, operacion)
		values(old.id_venta, old.total, @usuario_actual, 'UPDATE');
	-- insertar valores nuevos
    insert into bitacora_ventas_enc(id_venta, total, usuario, operacion)
		values(new.id_venta, new.total, @usuario_actual, 'UPDATE');
end //

create trigger delete_ventas_enc after delete on ventas_enc
for each row
begin
    insert into bitacora_ventas_enc(id_venta, total, usuario, operacion)
		values(old.id_venta, old.total, @usuario_actual, 'DELETE');
end //
delimiter ;