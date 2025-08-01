const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const connection = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.MYSQL2_HOST,
      user: process.env.MYSQL2_USER,
      password: process.env.MYSQL2_PASSWORD,
      //   database: process.env.DATABASE_NAME,
      port: process.env.MYSQL2_PORT,
    });
    console.log("Connected to MySQL2");
    // await db.query("CREATE DATABASE IF NOT EXISTS user_management");
    await db.changeUser({ database: "user_management" });
  } catch (error) {
    console.error("Error connecting to MySQL2 database:", error);
  }
};

module.exports = connection;
