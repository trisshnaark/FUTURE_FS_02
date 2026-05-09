require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || "crm",
});

db.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
  db.query("DESCRIBE leads", (err, results) => {
    if (err) console.error(err);
    else console.table(results);
    db.end();
    process.exit(0);
  });
});
