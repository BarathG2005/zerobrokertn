import { createClient } from '@supabase/supabase-js';

// Types Definitions
export interface Property {
  id: string;
  title: string;
  description: string;
  property_type: 'Apartment' | 'Villa' | 'House' | 'Plot' | 'Commercial';
  category: 'Residential' | 'Commercial';
  listing_type: 'Buy' | 'Sell';
  price: number;
  area: number;
  bedrooms?: number | null;
  bathrooms?: number | null;
  property_age?: number | null;
  parking?: string | null;
  facing: string;
  construction_status: 'Ready to Move' | 'Under Construction';
  is_featured: boolean;
  is_sold: boolean;
  is_hidden: boolean;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  
  // Location
  address: string;
  city: string;
  district: string;
  pincode: string;
  google_maps_url?: string | null;
  
  // Media & Docs
  images: string[];
  documents: string[];
  
  // Owner
  owner_name: string;
  owner_phone: string;
  owner_whatsapp: string;
  owner_email?: string | null;
  preferred_contact_time?: string | null;
  
  // Metrics
  views_count: number;
  created_at: string;
}

export interface Enquiry {
  id: string;
  property_id?: string | null;
  property_title?: string | null;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'Pending' | 'Replied' | 'Resolved';
  created_at: string;
}

export interface Analytics {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  pendingProperties: number;
  totalSellers: number;
  totalBuyers: number;
  totalEnquiries: number;
  recentActivity: Array<{ id: string; type: string; message: string; date: string }>;
  monthlyAnalytics: Array<{ month: string; listingCount: number; enquiriesCount: number }>;
}

// Supabase Environment Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Realistic Mock Data for Tamil Nadu Properties
const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Premium 3 BHK Luxury Apartment in OMR",
    description: "East facing, highly ventilated, 3 BHK apartment with premium amenities in OMR, Chennai. Close to IT parks, top international schools, and hospitals. Includes modular kitchen, piped gas, and double car parking.",
    property_type: "Apartment",
    category: "Residential",
    listing_type: "Sell",
    price: 8500000,
    area: 1650,
    bedrooms: 3,
    bathrooms: 3,
    property_age: 2,
    parking: "2 Cars",
    facing: "East",
    construction_status: "Ready to Move",
    is_featured: true,
    is_sold: false,
    is_hidden: false,
    status: "Approved",
    address: "Aブロック Tower 4, Prestige Cyber Towers, Karapakkam, OMR",
    city: "Chennai",
    district: "Chennai",
    pincode: "600097",
    google_maps_url: "https://maps.google.com/?q=Karapakkam+Chennai",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80"
    ],
    documents: ["https://example.com/patta.pdf", "https://example.com/blueprint.pdf"],
    owner_name: "Rajesh Kumar",
    owner_phone: "+91 98765 43210",
    owner_whatsapp: "+91 98765 43210",
    owner_email: "rajesh.k@example.com",
    preferred_contact_time: "5:00 PM - 8:00 PM",
    views_count: 1240,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "prop-2",
    title: "Elegant 4 BHK Beach Villa in ECR",
    description: "Ultra-luxury, independent beach villa on ECR, Chennai. Sea-facing balconies, private swimming pool, landscaped garden, multi-tier security, and fully air-conditioned living spaces. Ideal for high-profile individuals.",
    property_type: "Villa",
    category: "Residential",
    listing_type: "Sell",
    price: 32000000,
    area: 4200,
    bedrooms: 4,
    bathrooms: 5,
    property_age: 1,
    parking: "3 Cars",
    facing: "East",
    construction_status: "Ready to Move",
    is_featured: true,
    is_sold: false,
    is_hidden: false,
    status: "Approved",
    address: "No. 12, Ocean Crest Enclave, Akkarai, ECR",
    city: "Chennai",
    district: "Chennai",
    pincode: "600119",
    google_maps_url: "https://maps.google.com/?q=Akkarai+ECR+Chennai",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    ],
    documents: ["https://example.com/parent_deed.pdf"],
    owner_name: "Sharmila Devi",
    owner_phone: "+91 94440 12345",
    owner_whatsapp: "+91 94440 12345",
    owner_email: "sharmila.d@example.com",
    preferred_contact_time: "Morning 9:00 AM - 12:00 PM",
    views_count: 3450,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "prop-3",
    title: "2 BHK Independent House in Gandhipuram",
    description: "Centrally located independent house with individual plot in Gandhipuram, Coimbatore. Near bus terminus, shopping centers, and Gandhipuram railway station. Solid construction with scope for vertical expansion (G+2 approval).",
    property_type: "House",
    category: "Residential",
    listing_type: "Sell",
    price: 6000000,
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    property_age: 8,
    parking: "1 Car",
    facing: "North",
    construction_status: "Ready to Move",
    is_featured: false,
    is_sold: false,
    is_hidden: false,
    status: "Approved",
    address: "45, G.P. Layout, 4th Street, Gandhipuram",
    city: "Coimbatore",
    district: "Coimbatore",
    pincode: "641012",
    google_maps_url: "https://maps.google.com/?q=Gandhipuram+Coimbatore",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
    ],
    documents: [],
    owner_name: "Venkatesh Murthy",
    owner_phone: "+91 98430 55566",
    owner_whatsapp: "+91 98430 55566",
    owner_email: "venky.m@example.com",
    preferred_contact_time: "Anytime",
    views_count: 850,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "prop-4",
    title: "Prime Commercial Plot near Annanagar Ring Road",
    description: "Highly sought-after 2400 sq.ft. commercial CMDA-approved plot on Anna Nagar main connector road, Madurai. Ideal for constructing supermarkets, showrooms, offices, or clinics. Full frontage access with wider approach road.",
    property_type: "Plot",
    category: "Commercial",
    listing_type: "Sell",
    price: 4500000,
    area: 2400,
    bedrooms: null,
    bathrooms: null,
    property_age: 0,
    parking: "Yes",
    facing: "South",
    construction_status: "Ready to Move",
    is_featured: true,
    is_sold: false,
    is_hidden: false,
    status: "Approved",
    address: "Plot B-14, Annanagar Ext Road, K.Pudur",
    city: "Madurai",
    district: "Madurai",
    pincode: "625020",
    google_maps_url: "https://maps.google.com/?q=Anna+Nagar+Madurai",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    ],
    documents: ["https://example.com/DTCP_approval.pdf"],
    owner_name: "Chinna Thambi",
    owner_phone: "+91 91760 98765",
    owner_whatsapp: "+91 91760 98765",
    owner_email: "chinna.t@example.com",
    preferred_contact_time: "Weekends",
    views_count: 512,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "prop-5",
    title: "New 3 BHK Under-Construction Apartment, Trichy",
    description: "Luxury apartment building in Cantonment, Trichy. Possession by mid next year. Top notch structural specifications, 24x7 security, water treatment, backup power generators. Modern open layout design.",
    property_type: "Apartment",
    category: "Residential",
    listing_type: "Sell",
    price: 5200000,
    area: 1400,
    bedrooms: 3,
    bathrooms: 3,
    property_age: 0,
    parking: "1 Car",
    facing: "North-East",
    construction_status: "Under Construction",
    is_featured: false,
    is_sold: false,
    is_hidden: false,
    status: "Approved",
    address: "Devi Towers, West Boulevard Road, Cantonment",
    city: "Trichy",
    district: "Tiruchirappalli",
    pincode: "620001",
    google_maps_url: "https://maps.google.com/?q=Cantonment+Trichy",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    ],
    documents: [],
    owner_name: "Muthu Karuppan",
    owner_phone: "+91 98421 88899",
    owner_whatsapp: "+91 98421 88899",
    owner_email: "muthu.trichy@example.com",
    preferred_contact_time: "Anytime",
    views_count: 310,
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "prop-6",
    title: "Sleek Commercial Showroom Space in Salem City",
    description: "Fully completed commercial building showroom space for sell on 5-Roads Junction, Salem. Outstanding visual frontage, premium glass panels, spacious parking space for customers. High footfalls guaranteed daily.",
    property_type: "Commercial",
    category: "Commercial",
    listing_type: "Sell",
    price: 18000000,
    area: 3000,
    bedrooms: null,
    bathrooms: 2,
    property_age: 3,
    parking: "10 Cars",
    facing: "West",
    construction_status: "Ready to Move",
    is_featured: false,
    is_sold: true, // Marked as Solid/Sold
    is_hidden: false,
    status: "Approved",
    address: "102, Salem Heights, Five Roads Junction",
    city: "Salem",
    district: "Salem",
    pincode: "636004",
    google_maps_url: "https://maps.google.com/?q=Five+Roads+Salem",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    ],
    documents: ["https://example.com/property_permit.pdf"],
    owner_name: "Selvam Periasamy",
    owner_phone: "+91 98401 44556",
    owner_whatsapp: "+91 98401 44556",
    owner_email: "selvam.s@example.com",
    preferred_contact_time: "10 AM to 6 PM",
    views_count: 1420,
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "prop-7",
    title: "Residential Plot for Sale in Tiruppur",
    description: "Prime residential plot in Avinashi, Tiruppur. Ready for direct house construction. Gated layout, clear titles, good drinking water line, and electricity connection. Surrounded by built-up villas.",
    property_type: "Plot",
    category: "Residential",
    listing_type: "Sell",
    price: 2400000,
    area: 1800,
    bedrooms: null,
    bathrooms: null,
    property_age: 0,
    parking: "No",
    facing: "North-West",
    construction_status: "Ready to Move",
    is_featured: false,
    is_sold: false,
    is_hidden: false,
    status: "Pending Approval", // Submission pending approval
    address: "Plot 56, Green Fields enclave, Avinashi",
    city: "Tiruppur",
    district: "Tiruppur",
    pincode: "641654",
    google_maps_url: "https://maps.google.com/?q=Avinashi+Tiruppur",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    ],
    documents: [],
    owner_name: "Ganesan Swamy",
    owner_phone: "+91 97890 22334",
    owner_whatsapp: "+91 97890 22334",
    owner_email: "ganesh.t@example.com",
    preferred_contact_time: "Evening 4 PM - 7 PM",
    views_count: 67,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const MOCK_ENQUIRIES: Enquiry[] = [
  {
    id: "enq-1",
    property_id: "prop-1",
    property_title: "Premium 3 BHK Luxury Apartment in OMR",
    name: "Arun Prasath",
    email: "arun.p@example.com",
    phone: "+91 98840 98840",
    message: "Interested in visiting the flat page this Saturday. Please let me know if it is available for visitation.",
    status: "Pending",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "enq-2",
    property_id: "prop-2",
    property_title: "Elegant 4 BHK Beach Villa in ECR",
    name: "Dr. Anand Krishnan",
    email: "anand.k@example.com",
    phone: "+91 99940 99940",
    message: "Would like to discuss negotiations on payment plans and verify deeds folder documents.",
    status: "Replied",
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "enq-3",
    property_id: null,
    property_title: undefined,
    name: "Meera Nair",
    email: "meera.n@example.com",
    phone: "+91 95000 95000",
    message: "General callback request regarding looking for 2 BHK budget rent options around Erode city limits.",
    status: "Resolved",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper to initialize local storage
const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem('zb_properties')) {
    localStorage.setItem('zb_properties', JSON.stringify(MOCK_PROPERTIES));
  }
  if (!localStorage.getItem('zb_enquiries')) {
    localStorage.setItem('zb_enquiries', JSON.stringify(MOCK_ENQUIRIES));
  }
};

// Client APIs
export async function getProperties(filters?: {
  keyword?: string;
  property_type?: string;
  category?: string; // Residential / Commercial
  listing_type?: string; // Buy / Sell
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  district?: string;
  bedrooms?: number;
  bathrooms?: number;
  facing?: string;
  parking?: boolean;
  construction_status?: string;
  showAllStatus?: boolean; // admin mode
  sort?: string;
}): Promise<Property[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('properties').select('*');
      
      // Since it's a client fallback, if it fails, we fall back to localStorage
      // In a real application, we would write direct SQL query builders
      // For this robust Next.js setup, we fetch and filter to ensure 100% correct sorting & types
      const { data, error } = await query;
      if (!error && data) {
        return filterAndSortProperties(data as Property[], filters);
      }
    } catch (e) {
      console.warn("Supabase fetch failed, using local storage fallback", e);
    }
  }

  // Fallback to localStorage
  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_properties') || '[]');
    return filterAndSortProperties(list, filters);
  }
  return filterAndSortProperties(MOCK_PROPERTIES, filters);
}

function filterAndSortProperties(list: Property[], filters?: any): Property[] {
  let result = [...list];

  // Admin filter or public filter
  if (!filters?.showAllStatus) {
    // Public only sees Approved, non-hidden, non-sold (or show sold optionally)
    result = result.filter(p => p.status === 'Approved' && !p.is_hidden);
  }

  if (filters) {
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(kw) || 
             p.description.toLowerCase().includes(kw) ||
             p.city.toLowerCase().includes(kw) ||
             p.address.toLowerCase().includes(kw)
      );
    }
    if (filters.property_type && filters.property_type !== 'All') {
      result = result.filter(p => p.property_type.toLowerCase() === filters.property_type.toLowerCase());
    }
    if (filters.category && filters.category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }
    if (filters.listing_type && filters.listing_type !== 'All') {
      result = result.filter(p => p.listing_type.toLowerCase() === filters.listing_type.toLowerCase());
    }
    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.city && filters.city !== 'All') {
      result = result.filter(p => p.city.toLowerCase() === filters.city.toLowerCase());
    }
    if (filters.district && filters.district !== 'All') {
      result = result.filter(p => p.district.toLowerCase() === filters.district.toLowerCase());
    }
    if (filters.bedrooms && filters.bedrooms !== 'All') {
      result = result.filter(p => p.bedrooms === Number(filters.bedrooms));
    }
    if (filters.bathrooms && filters.bathrooms !== 'All') {
      result = result.filter(p => p.bathrooms === Number(filters.bathrooms));
    }
    if (filters.facing && filters.facing !== 'All') {
      result = result.filter(p => p.facing.toLowerCase() === filters.facing.toLowerCase());
    }
    if (filters.parking && filters.parking !== 'All') {
      const hasParking = filters.parking === 'Yes';
      result = result.filter(p => hasParking ? (p.parking && p.parking !== 'No') : (!p.parking || p.parking === 'No'));
    }
    if (filters.construction_status && filters.construction_status !== 'All') {
      result = result.filter(p => p.construction_status.toLowerCase() === filters.construction_status.toLowerCase());
    }

    // Sorting
    if (filters.sort) {
      switch (filters.sort) {
        case 'Newest':
          result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        case 'Oldest':
          result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          break;
        case 'Lowest Price':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'Highest Price':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'Featured':
          result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
          break;
        case 'Most Viewed':
          result.sort((a, b) => b.views_count - a.views_count);
          break;
        default:
          result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    } else {
      // Default: featured first, then newest
      result.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    }
  }

  return result;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
      if (!error && data) {
        // Increment views
        await supabase.from('properties').update({ views_count: (data.views_count || 0) + 1 }).eq('id', id);
        return data as Property;
      }
    } catch (e) {
      console.warn("Supabase load failed, using local storage fallback", e);
    }
  }

  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_properties') || '[]');
    const index = list.findIndex((p: Property) => p.id === id);
    if (index !== -1) {
      list[index].views_count = (list[index].views_count || 0) + 1;
      localStorage.setItem('zb_properties', JSON.stringify(list));
      return list[index];
    }
  } else {
    const found = MOCK_PROPERTIES.find(p => p.id === id);
    if (found) return found;
  }
  return null;
}

export async function submitProperty(propertyData: Omit<Property, 'id' | 'views_count' | 'created_at' | 'is_sold' | 'is_hidden' | 'status'>): Promise<Property> {
  const newProp: Property = {
    ...propertyData,
    id: `prop-${Date.now()}`,
    views_count: 0,
    is_sold: false,
    is_hidden: false,
    status: 'Pending Approval', // submission starts as pending approval
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('properties').insert([newProp]).select().single();
      if (!error && data) return data as Property;
    } catch (e) {
      console.warn("Supabase submit failed, using local storage fallback", e);
    }
  }

  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_properties') || '[]');
    list.push(newProp);
    localStorage.setItem('zb_properties', JSON.stringify(list));
    
    // Add logs
    pushActivity("submission", `New property submitted by ${newProp.owner_name} pending approval.`);
  }

  return newProp;
}

export async function updateProperty(id: string, propertyData: Partial<Property>): Promise<Property | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('properties').update(propertyData).eq('id', id).select().single();
      if (!error && data) return data as Property;
    } catch (e) {
      console.warn("Supabase update failed, using local storage fallback", e);
    }
  }

  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_properties') || '[]');
    const index = list.findIndex((p: Property) => p.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...propertyData };
      localStorage.setItem('zb_properties', JSON.stringify(list));
      pushActivity("property_edit", `Property "${list[index].title}" was updated.`);
      return list[index];
    }
  }
  return null;
}

export async function deleteProperty(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase delete failed", e);
    }
  }

  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_properties') || '[]');
    const item = list.find((p: Property) => p.id === id);
    const filtered = list.filter((p: Property) => p.id !== id);
    localStorage.setItem('zb_properties', JSON.stringify(filtered));
    if (item) {
      pushActivity("property_delete", `Deleted property: "${item.title}".`);
    }
    return true;
  }
  return false;
}

export async function submitEnquiry(enquiryData: Omit<Enquiry, 'id' | 'created_at' | 'status'>): Promise<Enquiry> {
  const newEnq: Enquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}`,
    status: 'Pending',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('enquiries').insert([newEnq]).select().single();
      if (!error && data) return data as Enquiry;
    } catch (e) {
      console.warn("Supabase enquiry failed", e);
    }
  }

  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_enquiries') || '[]');
    list.push(newEnq);
    localStorage.setItem('zb_enquiries', JSON.stringify(list));
    pushActivity("enquiry", `New inquiry submitted by ${newEnq.name} for ${newEnq.property_title || 'General'}.`);
  }

  return newEnq;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Enquiry[];
    } catch (e) {
      console.warn("Supabase fetch inquiries failed", e);
    }
  }

  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_enquiries') || '[]');
    return list.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  return MOCK_ENQUIRIES;
}

export async function updateEnquiryStatus(id: string, status: 'Pending' | 'Replied' | 'Resolved'): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('enquiries').update({ status }).eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase update enquiry status failed", e);
    }
  }

  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_enquiries') || '[]');
    const index = list.findIndex((e: Enquiry) => e.id === id);
    if (index !== -1) {
      list[index].status = status;
      localStorage.setItem('zb_enquiries', JSON.stringify(list));
      pushActivity("enquiry_update", `Inquiry from ${list[index].name} marked as ${status}.`);
      return true;
    }
  }
  return false;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('enquiries').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn("Supabase delete enquiry failed", e);
    }
  }

  initializeLocalStorage();
  if (typeof window !== 'undefined') {
    const list = JSON.parse(localStorage.getItem('zb_enquiries') || '[]');
    const filtered = list.filter((e: Enquiry) => e.id !== id);
    localStorage.setItem('zb_enquiries', JSON.stringify(filtered));
    return true;
  }
  return false;
}

// Activity Logging logic (Admin Panel Dashboard logs feed)
function pushActivity(type: string, message: string) {
  if (typeof window === 'undefined') return;
  const logs = JSON.parse(localStorage.getItem('zb_activity') || '[]');
  logs.unshift({
    id: `act-${Date.now()}`,
    type,
    message,
    date: new Date().toISOString()
  });
  // Cap at 20 logs
  localStorage.setItem('zb_activity', JSON.stringify(logs.slice(0, 20)));
}

export async function adminLogin(username: string, password: string): Promise<boolean> {
  // Simple administrative authorization credentials check
  return username === "admin" && password === "zerobrokertn";
}

export async function getAnalytics(): Promise<Analytics> {
  const props = await getProperties({ showAllStatus: true });
  const enqs = await getEnquiries();

  const totalProperties = props.length;
  // Available means Approved status, non-hidden, and not sold
  const availableProperties = props.filter(p => p.status === 'Approved' && !p.is_hidden && !p.is_sold).length;
  const soldProperties = props.filter(p => p.is_sold).length;
  const pendingProperties = props.filter(p => p.status === 'Pending Approval').length;
  
  // Total details
  const uniqueOwnerNames = Array.from(new Set(props.map(p => p.owner_name.toLowerCase())));
  const totalSellers = uniqueOwnerNames.length;
  
  // Enquiries count
  const totalEnquiries = enqs.length;
  const totalBuyers = Array.from(new Set(enqs.map(e => e.email.toLowerCase()))).length;

  // Retrieve mock activity
  let recentActivity = [];
  if (typeof window !== 'undefined') {
    recentActivity = JSON.parse(localStorage.getItem('zb_activity') || '[]');
  }
  if (recentActivity.length === 0) {
    // Seed default activities
    recentActivity = [
      { id: "act-1", type: "enquiry", message: "Enquiry submitted by Dr. Anand Krishnan (Akkarai Villa)", date: new Date(Date.now() - 3600000).toISOString() },
      { id: "act-2", type: "submission", message: "Ganesan Swamy registered Plot in Avinashi, Tiruppur", date: new Date(Date.now() - 10000000).toISOString() },
      { id: "act-3", type: "sold", message: "Sleek Showroom in Salem marked as SOLD", date: new Date(Date.now() - 86400000).toISOString() }
    ];
  }

  // Monthly breakdown
  const monthlyAnalytics = [
    { month: 'Mar', listingCount: 1, enquiriesCount: 3 },
    { month: 'Apr', listingCount: 2, enquiriesCount: 5 },
    { month: 'May', listingCount: 4, enquiriesCount: 4 },
    { month: 'Jun', listingCount: 3, enquiriesCount: 8 },
    { month: 'Jul', listingCount: props.length - 2, enquiriesCount: enqs.length + 1 },
    { month: 'Aug', listingCount: props.length, enquiriesCount: enqs.length }
  ];

  return {
    totalProperties,
    availableProperties,
    soldProperties,
    pendingProperties,
    totalSellers,
    totalBuyers,
    totalEnquiries,
    recentActivity,
    monthlyAnalytics
  };
}
