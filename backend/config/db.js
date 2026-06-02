require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "crm",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err.message);
    console.error("Details:", {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      error: err.message
    });
    setTimeout(() => db.connect(), 5000);
  } else {
    console.log("✅ MySQL Connected Successfully");
    console.log("Connected to database:", process.env.MYSQL_DATABASE);
  }
});

module.exports = db;
