-- database/modulo_1/schema/01_create_tables.sql
/*
 * Script: Creción de tablas
 * Descripción:
	- Creción de las siguientes tablas:
    -- 1. productos.
    -- 2. ventas_enc.
    -- 3. ventas_det.
    -- 4. bitacora_productos.
    -- 5. bitacora_ventas_enc.
 */
create table productos(
	id_producto		int auto_increment primary key,
	descripcion		varchar(100),
    precio_unitario	decimal(10,2)
);
create table ventas_enc(
	id_venta	int auto_increment primary key,
    fecha		date,
	total		decimal(10,2)
);
create table ventas_det(
	id_det			int auto_increment primary key,
    id_venta_det	int,
    id_producto		int,
    cantidad		int,
	iva				decimal(10,2),
    precio_venta	decimal(10,2),
    foreign key(id_venta_det) references ventas_enc(id_venta),
    foreign key(id_producto) references productos(id_producto)
);
create table bitacora_productos(
	id_bitacora		int auto_increment primary key,
    id_producto 	int,
    descripcion 	varchar(100),
    precio_unitario decimal(10,2),
    fecha_hora		timestamp default current_timestamp,
    usuario		    varchar(100),
    operacion		enum('INSERT', 'UPDATE', 'DELETE')
);
create table bitacora_ventas_enc(
	id_bitacora	int auto_increment primary key,
    id_venta	int,
    total		decimal(10,2),
    fecha_hora	timestamp default current_timestamp,
    usuario	    varchar(100),
    operacion	enum('INSERT', 'UPDATE', 'DELETE')
);