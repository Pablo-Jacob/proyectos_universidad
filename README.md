# Integrated Management System (IMS)

Proyecto académico de backend con **Node.js + MySQL**, enfocado en la gestión de productos, ventas y control de existencias.  
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
- **Módulo Ventas:** crear, listar y consultar ventas.
- **Módulo Productos:** agregar, actualizar y eliminar productos.
- **Módulo Existencias:** control de stock y disponibilidad.
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
```

## 🧰 Git & Convenciones
- Se utilizan Conventional Commits (feat, fix, chore) para mensajes claros.

- .gitignore configurado para proteger archivos sensibles (.env) y dependencias (node_modules).

- Flujo recomendado:

  1. Crear rama de feature: git checkout -b feature/nombre-feature

  2. Hacer commits claros: git commit -m "feat(modulo-ventas): crear venta"

  3. Hacer push y Pull Request hacia main.

## 🧪 Pruebas
- Crear ventas usando Postman: POST /api/ventas

- Consultar productos: GET /api/productos

- Recomendación: iniciar el servidor y tener la base de datos corriendo.

## 👨‍🏫 Nota académica
Este proyecto forma parte de un curso universitario y refuerza:
- El uso de procedimientos almacenados y triggers en MySQL.

- La integración de Node.js con MySQL.

- La organización de proyectos backend en capas (config, models, controllers, routes).