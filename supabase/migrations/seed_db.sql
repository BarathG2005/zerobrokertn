-- ZeroBroker TN Database Schema Seed Script

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Properties Table
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    property_type VARCHAR(50) NOT NULL, -- Apartment, Villa, House, Plot, Commercial
    category VARCHAR(50) NOT NULL DEFAULT 'Residential', -- Residential / Commercial
    listing_type VARCHAR(50) NOT NULL DEFAULT 'Sell', -- Buy / Sell / Rent
    price NUMERIC NOT NULL,
    area NUMERIC NOT NULL, -- in sqft
    bedrooms INT,
    bathrooms INT,
    property_age INT,
    parking VARCHAR(50) DEFAULT 'No', -- Yes / No / 1 Car, etc.
    facing VARCHAR(50) NOT NULL, -- North, South, East, West, North-East, etc.
    construction_status VARCHAR(50) NOT NULL DEFAULT 'Ready to Move', -- Ready to Move / Under Construction
    is_featured BOOLEAN DEFAULT FALSE,
    is_sold BOOLEAN DEFAULT FALSE,
    is_hidden BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending Approval', -- Pending Approval, Approved, Rejected
    
    -- Location
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL, -- Chennai, Coimbatore, Madurai, etc.
    district VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    google_maps_url TEXT,
    
    -- Images & Documents (URLs)
    images TEXT[] DEFAULT '{}',
    documents TEXT[] DEFAULT '{}',
    
    -- Owner/Seller Details
    owner_name VARCHAR(150) NOT NULL,
    owner_phone VARCHAR(50) NOT NULL,
    owner_whatsapp VARCHAR(50) NOT NULL,
    owner_email VARCHAR(150),
    preferred_contact_time VARCHAR(100) DEFAULT 'Anytime',
    
    -- Metrics
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, Replied, Resolved
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Indexes for Common Queries
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
