const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});
connection.connect((err) => {
    if(err) {
        console.log('Error conectando a la DB: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});