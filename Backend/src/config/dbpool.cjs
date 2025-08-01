const mysql = require("mysql2/promise");

const dbpool = mysql.createPool({
  host: process.env.MYSQL2_HOST,
  user: process.env.MYSQL2_USER,
  password: process.env.MYSQL2_PASSWORD,
  port: process.env.MYSQL2_PORT,
  database: "user_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

dbpool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        profileUrl VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

module.exports = dbpool;
