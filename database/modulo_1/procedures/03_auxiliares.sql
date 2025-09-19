-- database/modulo_1/procedures/03_auxiliares.sql
/*
 * Script: Creación de procedimientos almacenados.
 * Descripción:
 - Creación de los siguientes procedimientos auxiliares:
 -- 1. Cuando un producto no existe.
 -- 2. Cuando una venta no existe.
 -- 3. Para calculo del IVA y precio de venta.
 -- 4. Para calcular el total de venta.
 */
drop procedure if exists producto_no_existe;
drop procedure if exists venta_no_existe;
drop procedure if exists calculo_iva_precio_venta;
drop procedure if exists calcular_total_venta;

delimiter //
create procedure producto_no_existe(in p_id_producto int)
begin
	declare v_existe int;
    
    select count(*) into v_existe from productos where id_producto = p_id_producto;
    
    if v_existe = 0 then
		signal sqlstate '45000' set message_text = 'Producto no existe';
    end if;
end //

create procedure venta_no_existe(in p_id_venta int)
begin
	declare v_existe int;
    
    select count(*) into v_existe from ventas_enc where id_venta = p_id_venta;
    
    if v_existe = 0 then
		signal sqlstate '45000' set message_text = 'Venta no existe';
	end if;
end //

create procedure calculo_iva_precio_venta(in p_id_producto int, in p_id_det int)
begin
	declare v_iva			decimal(10,2);
    declare v_precio_venta	decimal(10,2);
    declare v_precio_u		decimal(10,2);
    declare v_cant			int;
    -- capturamos el precio unitario
    select precio_unitario into v_precio_u from productos where id_producto = p_id_producto;
    -- capturamos la cantidad
    select cantidad into v_cant from ventas_det where id_det = p_id_det;
    -- calculamos el iva
    set v_iva = (v_precio_u * v_cant) * 0.12;
    update ventas_det set iva = v_iva where id_det = p_id_det;
    -- calculamos el precio de venta (20% utilidad)
    set v_precio_venta = v_precio_u + (v_precio_u * 0.2);
    update ventas_det set precio_venta = v_precio_venta where id_det = p_id_det;
end //

create procedure calcular_total_venta(in p_id_venta int)
begin
	declare v_total decimal(10,2);
    -- Suma directa de todos los items de la venta
    select sum(precio_venta * cantidad) into v_total from ventas_det
		where id_venta_det = p_id_venta;
        
	update ventas_enc set total = v_total where id_venta = p_id_venta;
end //
delimiter ;