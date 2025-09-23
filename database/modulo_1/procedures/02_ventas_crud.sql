-- database/modulo_1/procedures/02_ventas_crud.sql
/*
 * Script: Creación de procedimiento almacenado.
 * Descripción: CRUD (Create, Read, Update, Delete) de ventas.
 */
drop procedure if exists create_venta;
drop procedure if exists read_venta;
drop procedure if exists read_ventas;
drop procedure if exists update_venta;
drop procedure if exists delete_venta;

delimiter //
create procedure create_venta(
    in p_productos json  -- [{"id":1, "cantidad":2}, {"id":2, "cantidad":1}]
)
begin
    declare v_id_venta		int;
    declare i				int default 0;
    declare product_count	int;
    declare v_id_producto	int;
    declare v_cantidad		int;
    declare v_id_detalle	int;
    declare v_total_final	decimal(10,2);
    declare v_total			decimal(10,2);
    -- 1. Crear encabezado de venta
    insert into ventas_enc(fecha, total) values(curdate(), 0);
    set v_id_venta = last_insert_id();
    -- 2. Obtener número de productos
    set product_count = json_length(p_productos);
    -- 3. Procesar cada producto
    while i < product_count do
        set v_id_producto = json_unquote(json_extract(p_productos, concat('$[', i, '].id')));
        set v_cantidad = json_unquote(json_extract(p_productos, concat('$[', i, '].cantidad')));
        -- Insertar detalle
        insert into ventas_det(id_venta_det, id_producto, cantidad)
			values(v_id_venta, v_id_producto, v_cantidad);
        set v_id_detalle = last_insert_id();
        -- Calcular IVA y precio de venta
        call calculo_iva_precio_venta(v_id_producto, v_id_detalle);
        
        set i = i + 1;
    end while;
    -- 4. Calcular total final
    call calcular_total_venta(v_id_venta);
    -- 5. Obtener el total calculado
    select total into v_total_final from ventas_enc where id_venta = v_id_venta;
    
    select v_id_venta as id_venta_generada, v_total_final as total_venta, 'Venta registrada exitosamente' as mensaje;
end //

create procedure read_venta(in p_id_venta int)
begin
    -- verificar si la venta existe
    call venta_no_existe(p_id_venta);
    -- encabezado de la venta
    select ve.id_venta, ve.fecha, ve.total, date_format((select max(fecha_hora) from bitacora_ventas_enc
		where id_venta = p_id_venta), '%Y-%m-%d %H:%i:%s') as ultima_modificacion from ventas_enc ve
        where ve.id_venta = p_id_venta;
	-- detalles de la venta
    select vd.id_det, vd.id_producto, p.descripcion as producto_descripcion, vd.cantidad, vd.iva,
		vd.precio_venta, (vd.precio_venta * vd.cantidad) as subtotal, (vd.iva * vd.cantidad) as iva_total,
        ((vd.precio_venta * vd_cantidad) + (vd.iva * vd_cantidad)) as total_item from ventas_det vd
        join productos p on vd.id_producto = p.id_producto where vd.id_venta_det = p_id_venta
        order by vd.id_venta_det;
end //

create procedure read_ventas(in p_fecha_inicio date, in p_fecha_fin date)
begin
	select vd.id_venta_det, ve.fecha, ve.total, count(vd.id_det) as items, date_format(max(bv.fecha_hora),
		'%Y-%m-%d %H:%i:%s') as ultima_modificacion from ventas_enc ve left join ventas_det vd on ve.id_venta
        = vd.id_venta_det left join bitacora_ventas_enc bv on ve.id_venta = bv.id_venta
        where (p_fecha_inicio is null or ve.fecha >= p_fecha_inicio) and (p_fecha_fin is null or ve.fecha
        <= p_fecha_fin) group by ve.id_venta, ve.fecha, ve.total order by ve.fecha desc, ve.id_venta desc;
end//

create procedure update_venta(in p_id_venta int, in p_fecha date)
begin
    -- verificar si la venta existe
    call venta_no_existe(p_id_venta);
    -- actualizar fecha de venta
    update ventas_enc set fecha = p_fecha where id_venta = p_id_venta;
    
    select p_id_venta as id_venta, 'Fecha de venta actualizada exitosamente' as mensaje;
end //

create procedure delete_venta(in p_id_venta int)
begin
    -- verificar si la venta existe
    call venta_no_existe(p_id_venta);
    -- iniciar transacción para eliminar detalles primero
    start transaction;
    -- eliminar detalles de la venta
    delete from ventas_det where id_venta_det = p_id_venta;
    -- eliminar encabezado de la venta
    delete from ventas_enc where id_venta = p_id_venta;
    
    commit;
    
    select p_id_venta as id_venta, 'Venta eliminada correctamente' as mensaje;
end //
delimiter ;