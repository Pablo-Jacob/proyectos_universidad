-- database/modulo_3/procedures/03_auxiliares.sql
/*
 * script: procedimientos auxiliares
 * descripción: validaciones y funciones helper
 */
drop procedure if exists proveedor_no_existe;
drop procedure if exists proveedor_nit_duplicado;
drop procedure if exists usuario_no_existe;
drop procedure if exists usuario_nombre_duplicado;
drop procedure if exists usuario_email_duplicado;
drop procedure if exists encriptar_password;
drop procedure if exists cambiar_password;
drop procedure if exists cambiar_password_por_token;

delimiter //
create procedure proveedor_no_existe(in p_id_proveedor int)
begin
    declare v_existe int;
    
    select count(*) into v_existe from proveedor where id_pvr = p_id_proveedor;
    
    if v_existe = 0 then
        signal sqlstate '45000' set message_text = 'Proveedor no existe';
    end if;
end //

create procedure proveedor_nit_duplicado(in p_nit varchar(20), in p_id_proveedor int)
begin
    declare v_existe int;
    
    select count(*) into v_existe from proveedor
		where nit = p_nit and id_pvr != ifnull(p_id_proveedor, 0);
    
    if v_existe > 0 then
        signal sqlstate '45000' set message_text = 'Ya existe proveedor con este nit';
    end if;
end //

create procedure usuario_no_existe(in p_id_usuario int)
begin
    declare v_existe int;
    
    select count(*) into v_existe from usuario where id_usr = p_id_usuario;
    
    if v_existe = 0 then
        signal sqlstate '45000' set message_text = 'Usuario no existe';
    end if;
end //

create procedure usuario_nombre_duplicado(in p_nombre_usuario varchar(100), in p_id_usuario int)
begin
    declare v_existe int;
    
    select count(*) into v_existe from usuario
		where nombre_usuario = p_nombre_usuario and id_usr != ifnull(p_id_usuario, 0);
    
    if v_existe > 0 then
        signal sqlstate '45000' set message_text = 'Nombre de usuario ya existe';
    end if;
end //

create procedure usuario_email_duplicado(in p_email varchar(150), in p_id_usuario int)
begin
    declare v_existe int;
    
    select count(*) into v_existe from usuario
		where email = p_email and id_usr != ifnull(p_id_usuario, 0);
    
    if v_existe > 0 then
        signal sqlstate '45000' set message_text = 'Email ya esta registrado';
    end if;
end //

create procedure encriptar_password(
    in  p_password			varchar(255),
    out p_pass_encriptada	varbinary(64)
)
begin
    set p_pass_encriptada = unhex(sha2(p_password, 256));
end //

create procedure cambiar_password(
    in p_id_usuario         int,
    in p_password_actual    varchar(255),
    in p_password_nueva     varchar(255),
    out p_token             varchar(255)
)
begin
    declare v_password					varbinary(64);
    declare v_pass_actual_encriptada	varbinary(64);
    declare v_pass_nueva_encriptada		varbinary(64);
    
    call usuario_no_existe(p_id_usuario);
    call encriptar_password(p_password_actual, v_pass_actual_encriptada);
    
    select pass_word into v_password from usuario where id_usr = p_id_usuario;
    
    if v_password = v_pass_actual_encriptada then
        call encriptar_password(p_password_nueva, v_pass_nueva_encriptada);
        set p_token = uuid();
        
        update usuario set pass_word = v_pass_nueva_encriptada, token = p_token
            where id_usr = p_id_usuario;
    else
        signal sqlstate '45000' set message_text = 'Password incorrecta';
    end if;
end //

create procedure cambiar_password_por_token(
    in  p_id_usuario     int,
    in  p_token_actual   varchar(255),
    in  p_password_nueva varchar(255),
    out p_token          varchar(255)
)
begin
    declare v_token_guardado		varchar(255);
    declare v_pass_nueva_encriptada	varbinary(64);
    
    call usuario_no_existe(p_id_usuario);
    
    select token into v_token_guardado from usuario where id_usr = p_id_usuario;
    
    if v_token_guardado = p_token_actual then
        call encriptar_password(p_password_nueva, v_pass_nueva_encriptada);
        set p_token = uuid();
        
        update usuario set pass_word = v_pass_nueva_encriptada, token = p_token
            where id_usr = p_id_usuario;
    else
        signal sqlstate '45000' set message_text = 'Token invalido';
    end if;
end //
delimiter ;