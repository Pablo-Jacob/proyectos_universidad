-- database/modulo_3/schema/01_table_creation.sql
/*
 * Script: Creción de tablas
 * Descripción:
	- Creción de las siguientes tablas:
    -- 1. proveedor.
    -- 2. usuario.
    -- 3. rol.
    -- 4. asigna_rol.
    - Modificación de la siguiente tabla:
    -- compras_enc, se añade 'id_proveedor', para hacer una relación con esta tabla
 */
create table proveedor(
    id_pvr		int auto_increment primary key,
    nit			varchar(20) unique,
    nombre		varchar(100),
    direccion	text,
    telefono	varchar(20)
);
-- modificar compras_enc solo si no existe la columna
alter table compras_enc add column id_pvr int,
	add constraint fk_id_pvr foreign key(id_pvr) references proveedor(id_pvr);

create table usuario(
	id_usr			int auto_increment primary key,
	nombre_usuario	varchar(100) unique,
    pass_word		varbinary(64),
	email			varchar(150) unique,
	token			varchar(255) null
);
create table rol(
	id_rol		int auto_increment primary key,
	nombre		varchar(100)
);
create table asigna_rol(
	id_asigna_rol	int auto_increment primary key,
	id_rol			int,
	id_usuario		int,
	foreign key(id_rol) references rol(id_rol),
	foreign key(id_usuario) references usuario(id_usr),
	unique key(id_rol, id_usuario)
);