const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// DEBUG: Get All Leads (No Auth - for testing only)
router.get("/debug/all", (req, res) => {
  const query = "SELECT * FROM leads";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Database Select Error:", err.message);
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    console.log(`📊 DEBUG: Fetched ${results.length} leads (no auth)`);
    res.json({ 
      debug: true,
      total: results.length, 
      leads: results 
    });
  });
});

// Get All Leads (Protected)
router.get("/", authMiddleware, (req, res) => {
  const query = "SELECT * FROM leads ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Database Select Error:", err.message);
      return res.status(500).json({ message: "Database error", error: err });
    }
    console.log(`📊 Fetched ${results.length} leads`);
    res.json(results);
  });
});

// Get Lead by ID (Protected)
router.get("/:id", authMiddleware, (req, res) => {
  const query = "SELECT * FROM leads WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(results[0]);
  });
});

// Create New Lead
router.post("/", (req, res) => {
  const { name, email, phone, source, notes } = req.body;

  console.log("📝 Lead submission received:", { name, email, phone, source, notes });

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const query =
    "INSERT INTO leads (name, email, phone, source, notes, status) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, email, phone || null, source || "Website", notes || "", "new"],
    (err, result) => {
      if (err) {
        console.error("❌ Database Insert Error:", err.message);
        console.error("Error Code:", err.code);
        return res.status(500).json({ message: "Database error", error: err.message });
      }
      console.log("✅ Lead inserted successfully with ID:", result.insertId);
      res.status(201).json({
        message: "Lead created successfully",
        lead: {
          id: result.insertId,
          name,
          email,
          phone,
          source,
          notes,
          status: "new",
        },
      });
    }
  );
});

// Update Lead (Protected)
router.put("/:id", authMiddleware, (req, res) => {
  const { name, email, phone, source, status, notes } = req.body;
  const { id } = req.params;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const query =
    "UPDATE leads SET name = ?, email = ?, phone = ?, source = ?, status = ?, notes = ?, updated_at = NOW() WHERE id = ?";
  db.query(
    query,
    [name, email, phone || null, source, status, notes || "", id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json({
        message: "Lead updated successfully",
        lead: { id, name, email, phone, source, status, notes },
      });
    }
  );
});

// Delete Lead (Protected)
router.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM leads WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json({ message: "Lead deleted successfully" });
  });
});

// Get Stats (Protected)
router.get("/stats/overview", authMiddleware, (req, res) => {
  const query = `
    SELECT 
      COUNT(*) as total_leads,
      SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) as new_leads,
      SUM(CASE WHEN status = 'Contacted' THEN 1 ELSE 0 END) as contacted_leads,
      SUM(CASE WHEN status = 'Converted' THEN 1 ELSE 0 END) as converted_leads
    FROM leads
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.json({ stats: results[0] });
  });
});

module.exports = router;
