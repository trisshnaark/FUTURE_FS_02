require('dotenv').config();
const mysql = require('mysql2');

console.log("🔍 DATABASE DIAGNOSTIC TEST\n");

console.log("Environment Variables:");
console.log("- MYSQL_HOST:", process.env.MYSQL_HOST);
console.log("- MYSQL_USER:", process.env.MYSQL_USER);
console.log("- MYSQL_DATABASE:", process.env.MYSQL_DATABASE);
console.log("- MYSQL_PASSWORD:", process.env.MYSQL_PASSWORD ? "***hidden***" : "NOT SET");

console.log("\n⏳ Attempting to connect to MySQL...\n");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || "crm",
});

db.connect((err) => {
  if (err) {
    console.error("❌ CONNECTION FAILED");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
    
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error("\n📝 Issue: MySQL server disconnected");
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error("\n📝 Issue: Too many connections to MySQL");
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error("\n📝 Issue: Wrong username/password");
      console.error("Check your .env file for correct credentials");
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error("\n📝 Issue: Database 'crm' does not exist");
      console.error("Run: mysql -u root -p");
      console.error("Then: CREATE DATABASE crm;");
    }
    process.exit(1);
  }

  console.log("✅ CONNECTED TO MYSQL!");
  console.log("Host:", process.env.MYSQL_HOST);
  console.log("Database:", process.env.MYSQL_DATABASE);

  // Check if tables exist
  db.query("SHOW TABLES;", (err, results) => {
    if (err) {
      console.error("\n❌ Error checking tables:", err.message);
      process.exit(1);
    }

    console.log("\n📋 Tables in database:");
    if (results.length === 0) {
      console.log("❌ NO TABLES FOUND!");
      console.log("\nRun this to create tables:");
      console.log("mysql -u root -p crm < backend/database.sql");
    } else {
      results.forEach(row => {
        const tableName = Object.values(row)[0];
        console.log("✅", tableName);
      });

      // Check leads table structure
      db.query("DESCRIBE leads;", (err, columns) => {
        if (err) {
          console.error("\n❌ Error describing leads table:", err.message);
          process.exit(1);
        }

        console.log("\n📝 Leads table columns:");
        columns.forEach(col => {
          console.log(`  - ${col.Field} (${col.Type})`);
        });

        console.log("\n✅ DATABASE SETUP IS CORRECT!");
        process.exit(0);
      });
    }
  });
});
