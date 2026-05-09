-- Create the database
CREATE DATABASE IF NOT EXISTS crm;

-- Use the database
USE crm;

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  source VARCHAR(255),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);

-- Create admin table (optional - for storing admin credentials)
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert demo admin (password: admin123 - hashed in production)
INSERT INTO admins (email, password, name) VALUES 
('admin@leadflow.com', 'admin123', 'Admin User');

-- Sample leads for testing
INSERT INTO leads (name, email, source, status) VALUES
('Rahul Sharma', 'rahul@gmail.com', 'Website', 'new'),
('Priya Patel', 'priya@gmail.com', 'Referral', 'converted'),
('Arun Kumar', 'arun@gmail.com', 'Google Ads', 'new'),
('Neha Singh', 'neha@gmail.com', 'LinkedIn', 'converted'),
('Vikram Desai', 'vikram@gmail.com', 'Facebook', 'new');
