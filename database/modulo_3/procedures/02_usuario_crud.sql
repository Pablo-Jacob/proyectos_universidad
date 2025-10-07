-- database/modulo_3/procedures/02_usuario_crud.sql
/*
 * script: creación de procedimientos almacenados.
 * descripción: crud (create, read, update, delete) de usuario.
 */
drop procedure if exists create_usuario;
drop procedure if exists read_usuario;
drop procedure if exists read_usuarios;
drop procedure if exists update_usuario;
drop procedure if exists asignar_rol_usuario;
drop procedure if exists obtener_roles_usuario;
drop procedure if exists eliminar_rol_usario;
drop procedure if exists create_rol;
drop procedure if exists read_rol;
drop procedure if exists read_roles;
drop procedure if exists update_rol;
drop procedure if exists delete_rol;

delimiter //
create procedure create_usuario(
    in p_nombre_usuario varchar(100),
    in p_password       varchar(255),
    in p_email          varchar(150)
)
begin
	declare v_password_encriptada varbinary(64);
    
    call usuario_nombre_duplicado(p_nombre_usuario, null);
    call usuario_email_duplicado(p_email, null);
    
    call encriptar_password(p_password, v_password_encriptada);
    
    insert into usuario(nombre_usuario, pass_word, email)
		values(p_nombre_usuario, v_password_encriptada, p_email);

    select last_insert_id() as id_usr, 'Usuario creado exitosamente' as mensaje;
end //

create procedure read_usuario(in p_id_usuario int)
begin
    call usuario_no_existe(p_id_usuario);

    select id_usr, nombre_usuario, email, token from usuario where id_usr = p_id_usuario;
    
    select 'Usuario obtenido exitosamente' as mensaje;
end //

create procedure read_usuarios()
begin
    select id_usr, nombre_usuario, email, token from usuario order by nombre_usuario;
    
    select count(*) as total_usuarios, 'Consulta de usuarios exitosa' as mensaje from usuario;
end //

create procedure update_usuario(
    in p_id_usuario     int,
    in p_nombre_usuario varchar(100),
    in p_email          varchar(150)
)
begin
    call usuario_no_existe(p_id_usuario);
    call usuario_nombre_duplicado(p_nombre_usuario, p_id_usuario);
    call usuario_email_duplicado(p_email, p_id_usuario);

    update usuario set nombre_usuario = p_nombre_usuario, email = p_email
		where id_usr = p_id_usuario;

    select row_count() as filas_afectadas, 'Usuario actualizado exitosamente' as mensaje;
end //

create procedure asignar_rol_usuario(in p_id_usuario int, in p_id_rol int)
begin
	declare v_existe_usuario	int;
    declare v_existe_rol		int;
    -- verificar que el usuario existe
    select count(*) into v_existe_usuario from usuario where id_usr = p_id_usuario;
    
    if v_existe_usuario = 0 then
		signal sqlstate '45000' set message_text = 'Usuario no existe';
    end if;
    -- verificar que el rol existe
    select count(*) into v_existe_rol from rol where id_rol = p_id_rol;
    
    if v_existe_rol = 0 then
		signal sqlstate '45000' set message_text = 'Rol no existe';
	end if;
    -- asignar rol (ignorar si ya existe por UNIQUE KEY)
    insert ignore into asigna_rol(id_rol, id_usuario) values(p_id_rol, p_id_usuario);
    
    select 'Rol asignado existosamente' as mensaje;
end //

create procedure obtener_roles_usuario(in p_id_usuario int)
begin
	select r.id_rol, r.nombre from rol r inner join asigna_rol ar on
		r.id_rol = ar.id_rol where ar.id_usuario = p_id_usuario;
end //

create procedure eliminar_rol_usario(in p_id_usuario int, in p_id_rol int)
begin
	delete from asigna_rol where id_usuario = p_id_usuario and id_rol = p_id_rol;
    
    select concat('Filas afectadas: ', row_count()) as mensaje;
end //

create procedure create_rol(in p_nombre varchar(100))
begin
	declare v_existe int;    
    -- verificar si el rol ya existe
    select count(*) into v_existe from rol where nombre = p_nombre;
    
    if v_existe > 0 then
        signal sqlstate '45000' set message_text = 'Ya existe un rol con este nombre';
    end if;
    -- insertar nuevo rol
    insert into rol(nombre) values(p_nombre);
    
    select last_insert_id() as id_rol, 'Rol creado exitosamente' as mensaje;
end //

create procedure read_rol(in p_id_rol int)
begin
    declare v_existe int;    
    -- verificar que el rol existe
    select count(*) into v_existe from rol where id_rol = p_id_rol;
    
    if v_existe = 0 then
        signal sqlstate '45000' set message_text = 'Rol no encontrado';
    end if;
    -- obtener rol
    select *from rol where id_rol = p_id_rol;
    
    select 'Rol obtenido exitosamente' as mensaje;
end //

create procedure read_roles()
begin
    -- obtener todos los roles
    select *from rol order by nombre;
    
    select count(*) as total_roles, 'Roles obtenidos exitosamente' as mensaje;
end //

create procedure update_rol(in p_id_rol int, in p_nombre varchar(100))
begin
	declare v_existe			int;
    declare v_nombre_duplicado	int;
    -- verificar que el rol existe
    select count(*) into v_existe from rol where id_rol = p_id_rol;
    
    if v_existe = 0 then
        signal sqlstate '45000' set message_text = 'Rol no encontrado';
    end if;
    -- verificar nombre duplicado (excluyendo el actual)
    select count(*) into v_nombre_duplicado from rol
		where nombre = p_nombre and id_rol != p_id_rol;
    
    if v_nombre_duplicado > 0 then
        signal sqlstate '45000' set message_text = 'Ya existe otro rol con este nombre';
    end if;
    -- actualizar rol
    update rol set nombre = p_nombre where id_rol = p_id_rol;
    
    select row_count() as filas_afectadas, 'Rol actualizado exitosamente' as mensaje;
end //

create procedure delete_rol(in p_id_rol int)
begin
    declare v_existe			int;
    declare v_tiene_usuarios	int;
    -- verificar que el rol existe
    select count(*) into v_existe from rol where id_rol = p_id_rol;
    
    if v_existe = 0 then
        signal sqlstate '45000' set message_text = 'Rol no encontrado';
    end if;
    -- verificar si tiene usuarios asignados
    select count(*) into v_tiene_usuarios from asigna_rol where id_rol = p_id_rol;
    
    if v_tiene_usuarios > 0 then
        signal sqlstate '45000' set message_text = 
			'No se puede eliminar el rol porque tiene usuarios asignados';
    end if;
    -- eliminar rol
    delete from rol where id_rol = p_id_rol;
    
    select row_count() as filas_afectadas, 'Rol eliminado exitosamente' as mensaje;
end //
delimiter ;