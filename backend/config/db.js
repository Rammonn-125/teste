const mysql = require('mysql2');
const dotenv = require('dotenv');

// loading environment variables
dotenv.config();

// database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database error connection:', err);
        return;
    }
    console.log('Connectiong do MySQL database...');
});

module.exports = db;