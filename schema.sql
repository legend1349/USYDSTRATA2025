-- Create tables for strata management system

-- Owners table to store strata roll information
CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    unit VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    entitlement DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Maintenance requests table
CREATE TABLE maintenance_requests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    submitted_by VARCHAR(100) NOT NULL,
    unit VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'in-progress', 'scheduled', 'completed')),
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_by VARCHAR(100) NOT NULL,
    upload_date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Levies table
CREATE TABLE levies (
    id SERIAL PRIMARY KEY,
    unit VARCHAR(10) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')),
    period VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'committee', 'admin')),
    unit VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Committee members table
CREATE TABLE committee_members (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    position VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Meetings table
CREATE TABLE meetings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT,
    meeting_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Meeting minutes table
CREATE TABLE meeting_minutes (
    id SERIAL PRIMARY KEY,
    meeting_id INTEGER NOT NULL REFERENCES meetings(id),
    content TEXT NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for owners
INSERT INTO owners (unit, name, email, phone, entitlement) VALUES
('101', 'John Smith', 'john.smith@example.com', '+61 2 9876 5432', 12.5),
('102', 'Sarah Johnson', 'sarah.johnson@example.com', '+61 2 9876 1234', 10.2),
('103', 'Michael Wong', 'michael.wong@example.com', '+61 2 9876 4321', 11.8),
('104', 'Emma Taylor', 'emma.taylor@example.com', '+61 2 9876 2345', 9.5),
('105', 'David Chen', 'david.chen@example.com', '+61 2 9876 3456', 10.8),
('201', 'Jessica Brown', 'jessica.brown@example.com', '+61 2 9876 6543', 12.5),
('202', 'Robert Wilson', 'robert.wilson@example.com', '+61 2 9876 7654', 10.2),
('203', 'Lisa Martin', 'lisa.martin@example.com', '+61 2 9876 8765', 11.8);

-- Sample data for maintenance requests
INSERT INTO maintenance_requests (title, description, submitted_by, unit, date, status, priority) VALUES
('Leaking Tap in Common Area', 'The tap in the common area bathroom is leaking and needs repair.', 'John Smith', '101', '2023-04-15', 'in-progress', 'medium'),
('Broken Light in Stairwell', 'The light in the stairwell between floors 2 and 3 is not working.', 'Sarah Johnson', '102', '2023-04-10', 'scheduled', 'low'),
('Intercom System Issues', 'The intercom system is not working properly for units 101-105.', 'Michael Wong', '103', '2023-04-05', 'pending', 'high'),
('Garage Door Malfunction', 'The garage door is not opening properly and makes a loud noise.', 'Emma Taylor', '104', '2023-04-02', 'completed', 'high'),
('Water Damage on Ceiling', 'There appears to be water damage on the ceiling of the hallway near unit 201.', 'David Chen', '105', '2023-03-28', 'in-progress', 'high');

-- Sample data for documents
INSERT INTO documents (title, file_name, file_url, uploaded_by, upload_date, category) VALUES
('Insurance Certificate', 'insurance_2023.pdf', 'https://example.com/documents/insurance_2023.pdf', 'Admin', '2023-03-10', 'Insurance'),
('AGM Minutes', 'agm_minutes_2023.pdf', 'https://example.com/documents/agm_minutes_2023.pdf', 'Admin', '2023-02-25', 'Minutes'),
('Financial Report 2022', 'financial_report_2022.pdf', 'https://example.com/documents/financial_report_2022.pdf', 'Admin', '2023-01-15', 'Financial'),
('By-Laws', 'by_laws.pdf', 'https://example.com/documents/by_laws.pdf', 'Admin', '2022-12-05', 'Legal');

-- Sample data for levies
INSERT INTO levies (unit, amount, due_date, status, period) VALUES
('101', 1250.00, '2023-05-15', 'pending', 'Quarter 2, 2023'),
('102', 1020.00, '2023-05-15', 'pending', 'Quarter 2, 2023'),
('103', 1180.00, '2023-05-15', 'pending', 'Quarter 2, 2023'),
('104', 950.00, '2023-05-15', 'pending', 'Quarter 2, 2023'),
('105', 1080.00, '2023-05-15', 'pending', 'Quarter 2, 2023'),
('201', 1250.00, '2023-05-15', 'pending', 'Quarter 2, 2023'),
('202', 1020.00, '2023-05-15', 'pending', 'Quarter 2, 2023'),
('203', 1180.00, '2023-05-15', 'pending', 'Quarter 2, 2023');

