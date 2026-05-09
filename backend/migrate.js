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
    console.error("❌ MySQL Connection Error:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL Connected Successfully");
  runMigration();
});

function runMigration() {
  console.log("\n📋 Starting Database Migration...\n");

  // Check if phone column exists
  const checkPhoneQuery = `
    SELECT COLUMN_NAME 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'leads' 
    AND COLUMN_NAME = 'phone' 
    AND TABLE_SCHEMA = ?
  `;

  db.query(checkPhoneQuery, [process.env.MYSQL_DATABASE || "crm"], (err, results) => {
    if (err) {
      console.error("❌ Error checking phone column:", err.message);
      db.end();
      process.exit(1);
    }

    if (results.length === 0) {
      console.log("➕ Adding 'phone' column to leads table...");
      const addPhoneQuery = `
        ALTER TABLE leads 
        ADD COLUMN phone VARCHAR(20) AFTER email
      `;
      
      db.query(addPhoneQuery, (err) => {
        if (err) {
          console.error("❌ Error adding phone column:", err.message);
          db.end();
          process.exit(1);
        }
        console.log("✅ 'phone' column added successfully");
        checkNotesColumn();
      });
    } else {
      console.log("✓ 'phone' column already exists");
      checkNotesColumn();
    }
  });

  function checkNotesColumn() {
    const checkNotesQuery = `
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'leads' 
      AND COLUMN_NAME = 'notes' 
      AND TABLE_SCHEMA = ?
    `;

    db.query(checkNotesQuery, [process.env.MYSQL_DATABASE || "crm"], (err, results) => {
      if (err) {
        console.error("❌ Error checking notes column:", err.message);
        db.end();
        process.exit(1);
      }

      if (results.length === 0) {
        console.log("➕ Adding 'notes' column to leads table...");
        const addNotesQuery = `
          ALTER TABLE leads 
          ADD COLUMN notes TEXT AFTER source
        `;
        
        db.query(addNotesQuery, (err) => {
          if (err) {
            console.error("❌ Error adding notes column:", err.message);
            db.end();
            process.exit(1);
          }
          console.log("✅ 'notes' column added successfully");
          completeMigration();
        });
      } else {
        console.log("✓ 'notes' column already exists");
        completeMigration();
      }
    });
  }

  function completeMigration() {
    console.log("\n✅ Migration completed successfully!\n");
    
    // Show table structure
    const describeQuery = "DESCRIBE leads";
    db.query(describeQuery, (err, results) => {
      if (err) {
        console.error("Error describing table:", err.message);
        db.end();
        process.exit(0);
      }
      
      console.log("📊 Current 'leads' table structure:");
      console.table(results);
      
      db.end();
      process.exit(0);
    });
  }
}
