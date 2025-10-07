# Integrated Management System (IMS)

Proyecto académico de backend con **Node.js + MySQL**, enfocado en la gestión de productos, ventas, compras, control de existencias y autenticación de usuarios.  
Incluye procedimientos almacenados, triggers y una arquitectura modular que facilita la escalabilidad hacia más módulos.

---

## 🚀 Tecnologías
- Node.js (Express.js)

- MySQL (con procedimientos almacenados y triggers)

- Dotenv (variables de entorno)

- MySQL2 (conexión asíncrona a la base de datos)

---

## 📌 Descripción del proyecto
Este proyecto permite gestionar productos y ventas de manera modular, con:
- **Módulo Productos:** Agregar, actualizar y eliminar productos.

- **Módulo Ventas:** Crear, listar y consultar ventas.

- **Módulo Compras:** Registrar compras y actualizar existencias autómaticamente.

- **Módulo Existencias:** Control de stock y disponibilidad.

- **Módulo Usuario:** Registro, autenticación y asignación de roles.

- Base de datos optimizada con procedimientos almacenados y triggers para mantener integridad de datos.

---

## ⚙️ Instalación
1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd proyecto_backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno en .env:
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ims
DB_USER=app_ims_user
PORT=3000
```

4. Inicializar la base de datos ejecutando los scripts correspondientes (procedimientos y triggers).

---

## ▶️ Ejecutar el servidor
```bash
npm start
node src/server.js
```

## 🧰 Git & Convenciones
- Se utilizan Conventional Commits (feat, fix, chore) para mensajes claros.

- .gitignore configurado para proteger archivos sensibles (.env) y dependencias (node_modules).

## 🧪 Pruebas
Puedes probar los endpoints principales usando **Postman**:

- **Productos:**
  - `GET /api/productos` -> Listar Productos.

- **Ventas:**
  - `POST /api/ventas` -> Registrar una Venta.
- **Compras:**
  - `POST /api/compras` -> Registrar una Compra.

- **Existencias:**
  - `POST /api/existencias` -> Consultar disponibilidad de Producto.

- **Usuarios:**
  - `POST /api/usuarios` -> Registrar Usuario.
  - `GET /api/usuarios` -> Listar Usuarios.

- **Recomendación:** inicia el servidor (`npm start o node src/server.js`) y asgúrate de que la base de datos esté en ejecución.

## 👨‍🏫 Nota académica
Este proyecto forma parte de un curso universitario y refuerza:
- El uso de procedimientos almacenados y triggers en MySQL.

- La integración de Node.js con MySQL.

- La organización de proyectos backend en capas (config, models, controllers, routes).

- Pruebas de endpoints con Postman.