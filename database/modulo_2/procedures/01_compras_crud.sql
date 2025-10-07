-- database/modulo_2/procedures/01_compras_crud.sql
/*
 * Script: Creación de procedimientos almacenados.
 * Descripción: CRUD (Create, Read, Update, Delete) de compras.
 */
drop procedure if exists create_compra;
drop procedure if exists read_compra;
drop procedure if exists read_compras;

delimiter //
create procedure create_compra(
	in p_productos json, -- [{"id":1, "cantidad":2}, {"id":2, "cantidad":1}]
    in p_id_proveedor int
)
begin
    declare v_id_compra		int;
    declare i				int default 0;
    declare product_count	int;
    declare v_id_producto	int;
    declare v_cantidad		int;
    declare v_id_detalle	int;
    declare v_total_final	decimal(10,2);
    declare v_total			decimal(10,2);
    -- validar que el proveedor existe
    if p_id_proveedor is not null then
        call proveedor_no_existe(p_id_proveedor);
    end if;
    -- 1. crear encabezado de compra con proveedor
    insert into compras_enc(fecha, total, id_pvr) values(curdate(), 0, p_id_proveedor);
    set v_id_compra = last_insert_id();
    -- 2. obtener número de productos
    set product_count = json_length(p_productos);
    -- 3. procesar cada producto
    while i < product_count do
        set v_id_producto = json_unquote(json_extract(p_productos, concat('$[', i, '].id')));
        set v_cantidad = json_unquote(json_extract(p_productos, concat('$[', i, '].cantidad')));
        -- insertar detalle
        insert into compras_det(id_compra_det, id_producto, cantidad)
            values(v_id_compra, v_id_producto, v_cantidad);
        set v_id_detalle = last_insert_id();
        -- calcular iva
        call calcular_iva(v_id_producto, v_id_detalle);
        -- actualizar existencia
        call insert_entrada(v_id_compra, v_id_producto);
        
        set i = i + 1;
    end while;
    -- 4. calcular total final
    call calcular_total_compra(v_id_compra);
    -- 5. obtener el total calculado
    select total into v_total_final from compras_enc where id_compra = v_id_compra;
    
    select v_id_compra as id_compra_generada, v_total_final as total_compra,
        p_id_proveedor as id_proveedor, 'Compra registrada exitosamente' as mensaje;
end //

create procedure read_compra(in p_id_compra int)
begin
    declare v_id_proveedor int;
    -- verificar si la compra existe
    call compra_no_existe(p_id_compra);
    -- obtener id del proveedor
    select id_pvr into v_id_proveedor from compras_enc where id_compra = p_id_compra;
    -- encabezado de la compra con información del proveedor
    select ce.id_compra, date_format(ce.fecha, '%y-%m-%d') as fecha, 
        ce.total, ce.id_pvr as id_proveedor,
        ifnull(pv.nombre, 'sin proveedor') as proveedor_nombre,
        ifnull(pv.nit, '') as proveedor_nit from compras_enc ce
        left join proveedor pv on ce.id_pvr = pv.id_pvr where ce.id_compra = p_id_compra;
    -- detalles de la compra
    select cd.id_det, cd.id_producto, p.descripcion as producto_descripcion, 
        cd.cantidad, cd.iva, p.precio_unitario, (cd.cantidad * p.precio_unitario)
        as subtotal, cd.iva as iva_total, (cd.cantidad * p.precio_unitario + cd.iva)
        as total_item from compras_det cd join productos p on cd.id_producto
        = p.id_producto where cd.id_compra_det = p_id_compra order by cd.id_det;
end //

create procedure read_compras(in p_fecha_inicio date, in p_fecha_fin date)
begin
    select 
        ce.id_compra, date_format(ce.fecha, '%y-%m-%d') as fecha, ce.total,
        ce.id_pvr as id_proveedor, ifnull(pv.nombre, 'sin proveedor') as proveedor_nombre,
        ifnull(pv.nit, '') as proveedor_nit from compras_enc ce
		left join proveedor pv on ce.id_pvr = pv.id_pvr
        where (p_fecha_inicio is null or ce.fecha >= p_fecha_inicio) 
        and (p_fecha_fin is null or ce.fecha <= p_fecha_fin)
		group by ce.id_compra, ce.fecha, ce.total, ce.id_pvr
		order by ce.fecha desc, ce.id_compra desc;
end //
delimiter ;