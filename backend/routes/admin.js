const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM admins WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const admin = results[0];

    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  });
});

// Get Admin Profile (Protected)
router.get("/profile", authMiddleware, (req, res) => {
  const query = "SELECT id, email, name, created_at FROM admins WHERE id = ?";
  db.query(query, [req.user.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ admin: results[0] });
  });
});

module.exports = router;
