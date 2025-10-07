-- database/modulo_2/schema/01_table_creation.sql
/*
 * Script: Creción de tablas
 * Descripción:
	- Creción de las siguientes tablas:
    -- 1. compras_enc.
    -- 2. compras_det.
    -- 3. existencia.
 */
create table compras_enc(
	id_compra	int auto_increment primary key,
	fecha    	date,
	total    	decimal(10,2)
);
create table compras_det(
	id_det			int auto_increment primary key,
	id_compra_det	int,
	id_producto  	int,
	cantidad     	int,
	iva          	decimal(10,2),
	foreign key(id_compra_det) references compras_enc(id_compra),
	foreign key(id_producto) references productos(id_producto)
);
create table existencia(
	id_ext					int auto_increment primary key,
	id_producto				int,
	cantidad				int,
	estatus					enum('C', 'V'),	-- (C para ingreso, V para salida)
	id_compra_venta_enc		int, -- "Relación" entre ventas o compras
	fecha					date,
	foreign key(id_producto) references productos(id_producto)
);