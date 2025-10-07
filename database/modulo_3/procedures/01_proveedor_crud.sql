-- database/modulo_3/procedures/01_proveedor_crud.sql
/*
 * script: creación de procedimientos almacenados.
 * descripción: crud (create, read, update, delete) de proveedor.
 */
drop procedure if exists create_proveedor;
drop procedure if exists read_proveedor;
drop procedure if exists read_proveedores;
drop procedure if exists update_proveedor;

delimiter //
create procedure create_proveedor(
    in p_nit        varchar(15),
    in p_nombre     varchar(100),
    in p_direccion  text,
    in p_telefono   varchar(20)
)
begin
    call proveedor_nit_duplicado(p_nit, null);
    
    insert into proveedor(nit, nombre, direccion, telefono)
		values(p_nit, p_nombre, p_direccion, p_telefono);
        
    select last_insert_id() as id_proveedor_generado, 'Proveedor creado exitosamente' as mensaje;
end //

create procedure read_proveedor(in p_id_proveedor int)
begin
    call proveedor_no_existe(p_id_proveedor);
    
    select *from proveedor where id_pvr = p_id_proveedor;
    
    select 'Proveedor obtenido exitosamente' as mensaje;
end //

create procedure read_proveedores()
begin
    select *from proveedor order by nombre;
    select count(*) as total_proveedores, 'Consulta de proveedores exitosa' as mensaje
		from proveedor;
end //

create procedure update_proveedor(
    in p_id_proveedor   int,
    in p_nit            varchar(15),
    in p_nombre         varchar(100), 
    in p_direccion      text,
    in p_telefono       varchar(20)
)
begin
    call proveedor_no_existe(p_id_proveedor);
    call proveedor_nit_duplicado(p_nit, p_id_proveedor);
    
    update proveedor set nit = p_nit, nombre = p_nombre,
		direccion = p_direccion, telefono = p_telefono where id_pvr = p_id_proveedor;
    
    select row_count() as filas_afectadas, 'Proveedor actualizado exitosamente' as mensaje;
end //
delimiter ;