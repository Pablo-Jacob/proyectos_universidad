-- database/modulo_2/procedures/02_auxiliares.sql
/*
 * Script: Creación de procedimientos almacenados.
 * Descripción:
 - Creación de los siguientes procedimientos auxiliares:
 -- 1. Cuando una compra no existe.
 -- 2. Para calculo del IVA.
 -- 3. Para calcular el total de compra.
 -- 4. Cuando un registro de existencia no exite.
 */
drop procedure if exists compra_no_existe;
drop procedure if exists calcular_iva;
drop procedure if exists calcular_total_compra;
drop procedure if exists inicializar_existencia;
drop procedure if exists existencia_no_existe;

delimiter //
create procedure compra_no_existe(in p_id_compra int)
begin
	declare v_existe int;
    
    select count(*) into v_existe from compras_enc where id_compra = p_id_compra;
    
    if v_existe = 0 then
		signal sqlstate '45000' set message_text = 'Compra no existe';
	end if;
end //

create procedure calcular_iva(in p_id_producto int, in p_id_det int)
begin
	declare v_iva		decimal(10,2);
    declare v_precio_u	decimal(10,2);
    declare v_cant		int;
    -- capturamos el precio unitario
    select precio_unitario into v_precio_u from productos where id_producto = p_id_producto;
    -- capturamos la cantidad
    select cantidad into v_cant from compras_det where id_det = p_id_det;
    -- calculamos el iva
    set v_iva = (v_precio_u * v_cant) * 0.12;
    -- actualizamos el iva en el detalle de compra
    update compras_det set iva = v_iva where id_det = p_id_det;
end //

create procedure calcular_total_compra(in p_id_compra int)
begin
	declare v_total decimal(10,2);
    -- suma de (precio_unitario * cantidad) + iva para todos los items de la compra
    select sum((p.precio_unitario * cd.cantidad) + cd.iva) into v_total from compras_det cd
		join productos p on cd.id_producto = p.id_producto where cd.id_compra_det = p_id_compra;
        
    update compras_enc set total = v_total where id_compra = p_id_compra;
end //
create procedure inicializar_existencia(in p_id_producto int)
begin
    declare v_existe int;
    -- verificar si ya existe
    select count(*) into v_existe from existencia where id_producto = p_id_producto;
    -- solo insertar si no existe
    if v_existe = 0 then
		insert into existencia(id_producto, cantidad, estatus, id_compra_venta_enc, fecha)
			values(p_id_producto, 0, 'C', 0, curdate());
    end if;
end //

create procedure existencia_no_existe(in p_id_producto int)
begin
	declare v_existe int;
	-- verificar si existe registro de existencia
    select count(*) into v_existe from existencia where id_producto = p_id_producto;
    
    if v_existe = 0 then
		signal sqlstate '45000' set message_text = 'No encontro registro en existencia';
	end if;
end //
delimiter ;