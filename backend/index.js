require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD,
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
  } else {
    console.log("✅ MySQL Connected Successfully");
    console.log("Connected to database:", process.env.MYSQL_DATABASE);
  }
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_change_this";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ======================
// ADMIN ROUTES
// ======================

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  // Demo credentials (replace with database lookup in production)
  if (email === "admin@leadflow.com" && password === "admin123") {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ======================
// LEAD ROUTES
// ======================

// Create Lead (Public)
app.post("/api/leads", (req, res) => {
  const { name, email, source } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ 
      message: "Name and email are required",
      error: "MISSING_FIELDS" 
    });
  }

  const defaultSource = source || "Website";

  db.query(
    "INSERT INTO leads(name, email, source, status) VALUES(?, ?, ?, 'new')",
    [name, email, defaultSource],
    (err, result) => {
      if (err) {
        console.error("❌ Database Insert Error:", err.message);
        return res.status(500).json({ 
          message: "Database error: " + err.message,
          error: err.code,
          sqlMessage: err.sqlMessage
        });
      }
      res.status(201).json({ 
        id: result.insertId, 
        message: "Lead created successfully",
        data: { id: result.insertId, name, email, source: defaultSource, status: 'new' }
      });
    }
  );
});

// Get All Leads (Protected - Admin only)
app.get("/api/leads", verifyToken, (req, res) => {
  db.query("SELECT * FROM leads ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log("Select Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Get Lead by ID (Protected - Admin only)
app.get("/api/leads/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM leads WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Select Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(result[0]);
  });
});

// Update Lead Status (Protected - Admin only)
app.put("/api/leads/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["new", "converted"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  db.query("UPDATE leads SET status = ? WHERE id = ?", [status, id], (err, result) => {
    if (err) {
      console.log("Update Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead updated successfully" });
  });
});

// Delete Lead (Protected - Admin only)
app.delete("/api/leads/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM leads WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Delete Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  });
});

// Get Lead Statistics (Protected - Admin only)
app.get("/api/stats", verifyToken, (req, res) => {
  db.query(
    "SELECT COUNT(*) as total, SUM(status='converted') as converted, SUM(status='new') as pending FROM leads",
    (err, result) => {
      if (err) {
        console.log("Stats Error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(result[0]);
    }
  );
});

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "LeadFlow CRM API running successfully" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   POST   /api/leads - Create lead (public)`);
  console.log(`   GET    /api/leads - Get all leads (admin)`);
  console.log(`   GET    /api/leads/:id - Get lead by ID (admin)`);
  console.log(`   PUT    /api/leads/:id - Update lead (admin)`);
  console.log(`   DELETE /api/leads/:id - Delete lead (admin)`);
  console.log(`   POST   /api/admin/login - Admin login`);
});
