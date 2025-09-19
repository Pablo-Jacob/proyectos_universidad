# Integrated Management System (IMS)

Proyecto académico de backend con **Node.js + MySQL**, enfocado en la gestión de productos y ventas.  
Incluye procedimientos almacenados, triggers y una arquitectura modular que facilita la escalabilidad hacia más módulos.

---

## 🚀 Tecnologías
- Node.js (Express.js)
- MySQL (con procedimientos almacenados y triggers)
- Dotenv (variables de entorno)
- MySQL2 (conexión asíncrona a la base de datos)

---

## ⚙️ Instalación
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd proyecto_backend```

2. Instalalar dependencias
 ```
 npm install ```
3. Configurar variables de entorno en .env
  ```
  DB_HOST=localhost
  DB_PORT=3306
  DB_NAME=ims
  DB_USER=app_ims_user
  PORT=3000```
 
---

##▶️ Ejecutar el servidor
```
npm start```

---

##👨‍🏫 Nota académica

Este proyecto es parte de un curso universitario y refuerza:
- El uso de stored procedures y triggers en MySQL.
- La integración de Node.js con MySQL.
- La organización de proyectos backend en capas (config, models, controllers, routes).