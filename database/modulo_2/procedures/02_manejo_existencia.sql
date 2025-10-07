-- database/modulo_2/procedures/02_manejo_existencia.sql
/*
 * Script: Creación de procedimientos almacenados.
 * Descripción:
 - Creación de los siguientes procedimientos auxiliares:
	-- 1. Para inicializar una existencia.
	-- 2. Para insertar una entrada de producto (compra).
    -- 3. Para insertar una salida de producto (venta).
    -- 4. Para mostrar el registro de existencia de producto.
    -- 5. Para mostrar los movimientos de producto (cuando hubo compra o venta).
 */
drop procedure if exists insert_entrada;
drop procedure if exists insert_salida;
drop procedure if exists read_existencias;
drop procedure if exists read_movimientos;

delimiter //
create procedure insert_entrada(in p_id_compra int, in p_id_producto int)
begin
	declare v_cantidad_compra int;
    declare v_cantidad_actual int;
    -- 1. verificar que producto existe
    call producto_no_existe(p_id_producto);
    -- 2. Inicializar existencia
    call inicializar_existencia(p_id_producto);
    -- 3. obtener cantidad de la compra
    select cantidad into v_cantidad_compra from compras_det where id_compra_det = p_id_compra and id_producto
		= p_id_producto limit 1;
    -- 4. obtner cantidad acutal de existencia
    select cantidad into v_cantidad_actual from existencia where id_producto = p_id_producto limit 1;
    -- 5. actualizar existencia
    update existencia set cantidad = cantidad + v_cantidad_compra, id_compra_venta_enc = p_id_compra, fecha = curdate()
		where id_producto = p_id_producto;
end //

create procedure insert_salida(in p_id_venta int, in p_id_producto int)
begin
	declare v_cantidad_venta	int;
    declare v_cantidad_actual	int;
    -- 1. verificar que producto existe
    call producto_no_existe(p_id_producto);
    -- 2. inicializar existencia
    call inicializar_existencia(p_id_producto);
    -- 3. obtener cantidad de la venta
    select cantidad into v_cantidad_venta from ventas_det where id_venta_det = p_id_venta and id_producto
		= p_id_producto limit 1;
    -- 4. obtener cantidad actual de existencia
    select cantidad into v_cantidad_actual from existencia where id_producto = p_id_producto limit 1;
	-- validar cantidad
    if v_cantidad_actual < v_cantidad_venta then
		signal sqlstate '45000' set message_text = 'Existencia insuficiente';
	end if;
    -- 5. actualizar existencia
    update existencia set cantidad = cantidad - v_cantidad_venta, id_compra_venta_enc = p_id_venta, fecha = curdate()
		where id_producto = p_id_producto;
end //

create procedure read_existencias(in p_id_producto int)
begin
	-- verificar que existe registro en existencia
    call existencia_no_existe(p_id_producto);
    -- mostrar el registro
    select id_ext, id_producto, cantidad, estatus, id_compra_venta_enc, date_format(fecha, '%Y-%m-%d') as fecha
		from existencia where id_producto = p_id_producto;
end //

create procedure read_movimientos(in p_fecha_inicio date, in p_fecha_fin date)
begin
	select e.id_ext, e.id_producto, p.descripcion as producto_descripcion, e.cantidad, e.estatus,
		e.id_compra_venta_enc, date_format(e.fecha, '%Y-%m-%d') as fecha from existencia e join productos p on e.id_producto =
		p.id_producto where (p_fecha_inicio is null or e.fecha >= p_fecha_inicio) and
        (p_fecha_fin is null or e.fecha <= p_fecha_fin) order by e.fecha desc;
end //
delimiter ;