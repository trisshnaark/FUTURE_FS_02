require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "YOUR_PASSWORD",
  database: process.env.MYSQL_DATABASE || "crm",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err.message);
    console.error("Trying to connect to:", {
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      database: process.env.MYSQL_DATABASE || "crm",
    });
    setTimeout(() => db.connect(), 5000);
  } else {
    console.log("✅ MySQL Connected Successfully");
    console.log("Connected to database:", process.env.MYSQL_DATABASE || "crm");
  }
});

module.exports = db;
