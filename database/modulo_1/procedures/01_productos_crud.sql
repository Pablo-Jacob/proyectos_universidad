-- database/modulo_1/procedures/01_productos_crud.sql
/*
 * Script: Creación de procedimiento almacenado.
 * Descripción: CRUD (Create, Read, Update, Delete) de productos.
 */
drop procedure if exists create_producto;
drop procedure if exists read_prouducto;
drop procedure if exists read_productos;
drop procedure if exists update_producto;
drop procedure if exists delete_producto;

delimiter //
create procedure create_producto(in p_descripcion varchar(100), in p_precio_unitario decimal(10,2))
begin
	declare v_id_producto	int;
    declare v_existe		int;
    -- Verificar si el producto ya existe
    select count(*) into v_existe from productos where descripcion = p_descripcion;
    
    if v_existe > 0 then
		signal sqlstate '45000' set message_text = 'El producto ya existe';
    end if;
    -- Insertar nuevo producto
    insert into productos(descripcion, precio_unitario) values(p_descripcion, p_precio_unitario);
	
    set v_id_producto = last_insert_id();
    
    select v_id_producto as id_producto, 'Producto insertado exitosamente' as mensaje;
end //

create procedure read_prouducto(in p_id_producto int)
begin
    -- verificar si el producto existe
    call producto_no_existe(p_id_producto);
    
    select id_producto, descripcion, precio_unitario, date_format((select max(fecha_hora)
		from bitacora_productos where id_producto = p_id_producto), '%Y-%m-%d %H:%i:%s')
		as ultima_modificacion from productos where id_producto = p_id_producto;
end //

create procedure read_productos()
begin
	select p.id_producto, p.descripcion, p.precio_unitario, date_format(max(bp.fecha_hora),
		'%Y-%m-%d %H:%i:%s') as ultima_modificacion from productos p left join bitacora_productos
        bp on p.id_producto = bp.id_producto group by p.id_producto, p.descripcion, p.precio_unitario
        order by p.descripcion;
end //

create procedure update_producto(
	in p_id_producto		int,
    in p_descripcion		varchar(100),
    in p_precio_unitario	decimal(10,2)
)
begin
	-- veridicar si el producto existe
	call producto_no_existe(p_id_producto);
    -- actualizar producto
    update productos set descripcion = p_descripcion, precio_unitario = p_precio_unitario
		where id_producto = p_id_producto;
        
	select p_id_producto as id_producto, 'Producto actualizado exitosamente' as mensaje;
end //

create procedure delete_producto(in p_id_producto int)
begin
	declare v_existe		int;
	declare v_tiene_ventas	int;
    -- verificar si el producto existe
    call producto_no_existe(p_id_producto);
    -- verificar si el producto tiene ventas asociadas 
    select count(*) into v_tiene_ventas from ventas_det where id_producto = p_id_producto;
    
    if v_tiene_ventas > 0 then
		signal sqlstate '45000' set message_text = 'No se puede eliminar: El producto tiene ventas asociadas';
	end if;
    -- eliminar producto
    delete from productos where id_producto = p_id_producto;
    
    select p_id_producto as id_producto, 'Producto eliminado exitosamente' as mensaje;
end //
delimiter ;