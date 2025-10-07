-- database/modulo_3/procedures/04_sesion_usuario.sql
/*
 * Script: Manejo de sesión de usuario
 * Descripción: Procedimientos para gestionar el usuario actual en sesión
 */
drop procedure if exists establecer_usuario_actual;
drop procedure if exists obtener_usuario_actual;
drop procedure if exists limpiar_usuario_actual;

delimiter //
create procedure establecer_usuario_actual(
	in p_id_usuario		int,
    in p_nombre_usuario	varchar(100)
)
begin
	call usurio_no_existe(p_id_usario);
    -- Establecer variable de sesión
    set @usuario_actual = p_nombre_usuario;
    
    select 'Sesión de usuario establecida correctamente' as mensaje;
end //

create procedure obtener_usuario_actual()
begin
	select @usuario_actual as usuario_actual;
end //

create procedure limpiar_usuario_actual()
begin
	set @usuario_actual = null;
    
    select 'Sesion de usuario limpiada' as mensaje;
end //
delimiter ;