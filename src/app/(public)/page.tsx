"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProperties, Property } from "@/lib/supabase";
import { Search, MapPin, BedDouble, Bath, Square, Star, ShieldCheck, HelpCircle, Phone, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "/pexels-tima-miroshnichenko-5813755.jpg",
    "/pexels-dibyendu-maiti-1591975618-38839721.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Search filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [city, setCity] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (e) {
        console.error("Failed to load properties for landing page:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set("keyword", searchQuery);
    if (propertyType !== "All") queryParams.set("property_type", propertyType);
    if (minBudget) queryParams.set("minPrice", minBudget);
    if (maxBudget) queryParams.set("maxPrice", maxBudget);
    if (city !== "All") queryParams.set("city", city);

    router.push(`/properties?${queryParams.toString()}`);
  };

  // Extract featured and recent
  const featuredProperties = properties.filter(p => p.is_featured).slice(0, 3);
  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  // FAQ logic
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What does 'ZeroBroker' mean?",
      a: "ZeroBroker TN is a commission-free real estate platform. We do not charge any brokerage fees or transaction commission to buyers or sellers. We act as a helpful coordinator to connect primary sellers directly with interested buyers."
    },
    {
      q: "How can I list my house/land on this platform?",
      a: "Click on the 'Submit Property' page in the top right navbar. Enter your details, location parameters, price, configuration specs, and upload documents/images. Submissions are reviewed by our administration within 24 hours to go live."
    },
    {
      q: "Are the property legal documents verified?",
      a: "Yes. Owners upload copies of land deeds (Patta/Chitta) and building blueprints. Our administration reviews basic certifications before setting the listing to 'Approved' to ensure standard authenticity."
    },
    {
      q: "How do I contact a seller directly?",
      a: "Every verified property detail page includes 'Agent details' representing the verified owner agent, as well as a direct 'WhatsApp Enquire' button. Clicking it instantly launches a WhatsApp conversation pre-filled with the title ID of the specific home listing."
    }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Large Hero Section */}
      <section className="relative bg-white/1 backdrop-blur-sm py-[100px] border-b border-[#243238]/20 overflow-hidden">

        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] relative z-10 flex flex-col gap-[35px] text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-[10px]"
          >
            <span className="text-accent uppercase tracking-wider font-[700] text-[14px]">Trusted Commission-Free Network</span>
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] font-[700] text-primary-text max-w-[800px]">
              Find Properties Across Tamil Nadu with <span className="underline decoration-accent text-[#2d394b]">Zero Brokerage</span>
            </h1>
            <p className="text-[#243238]/80 text-[16px] md:text-[18px] max-w-[650px] mt-[10px]">
              Browse verified villas, flats, commercial plots, and farm lands directly. Direct connections, verified paperwork check, and absolute transparency.
            </p>
          </motion.div>




        </div>
      </section>

      {/* 3. Featured Properties section */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white py-[70px]"
      >
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex flex-col gap-[40px]">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-[5px]">
              <span className="text-accent uppercase tracking-wider font-[700] text-[12px]">Highly Recommended</span>
              <h2 className="text-[28px] font-[700] text-primary-text">Featured Listings</h2>
            </div>
            <Link
              href="/properties?sort=Featured"
              className="text-[14px] text-accent font-[600] hover:underline flex items-center gap-[3px]"
            >
              See All Featured <ArrowUpRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-[#b3c8e7]/30 border border-surface/50 rounded-[3px] h-[350px] animate-pulse" />
              ))}
            </div>
          ) : featuredProperties.length === 0 ? (
            <p className="text-center text-muted-text text-[15px] py-[30px]">No featured properties listed currently.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
              {featuredProperties.map((p, index) => (
                <PropertyCard key={p.id} property={p} priority={index < 3} />
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* 4. Why Choose ZeroBroker TN */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#b3c8e7]/20 border-y border-surface/40 py-[70px]"
      >
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex flex-col gap-[40px]">
          <div className="text-center flex flex-col gap-[5px] max-w-[600px] mx-auto">
            <span className="text-accent uppercase tracking-wider font-[700] text-[12px]">The ZeroBroker Advantage</span>
            <h2 className="text-[28px] font-[700] text-primary-text">Why Choose ZeroBroker TN?</h2>
            <p className="text-primary-text/75 text-[15px]">We re-engineer real estate listings across Tamil Nadu by omitting high agent costs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            <div className="bg-white border border-[#243238]/10 p-[25px] rounded-[3px] flex flex-col gap-[15px]">
              <div className="w-[40px] h-[40px] bg-accent/10 text-accent flex items-center justify-center rounded-[3px]">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-[600] text-[18px] text-primary-text">₹0 Commission Brokerage</h3>
              <p className="text-[14px] leading-relaxed text-[#243238]/80">
                Forget standard 2% fees. Sellers list for free, and prospective buyers explore and negotiate directly. Pay zero broker fees.
              </p>
            </div>

            <div className="bg-white border border-[#243238]/10 p-[25px] rounded-[3px] flex flex-col gap-[15px]">
              <div className="w-[40px] h-[40px] bg-accent/10 text-accent flex items-center justify-center rounded-[3px]">
                <Search size={24} />
              </div>
              <h3 className="font-[600] text-[18px] text-primary-text">Verified Title Submissions</h3>
              <p className="text-[14px] leading-relaxed text-[#243238]/80">
                All uploaded properties require Patta/Chitta legal deeds and boundary document scans, reviewed by our team to guarantee safety.
              </p>
            </div>

            <div className="bg-white border border-[#243238]/10 p-[25px] rounded-[3px] flex flex-col gap-[15px]">
              <div className="w-[40px] h-[40px] bg-accent/10 text-accent flex items-center justify-center rounded-[3px]">
                <Star size={24} />
              </div>
              <h3 className="font-[600] text-[18px] text-primary-text">Direct Owner WhatsApp Chat</h3>
              <p className="text-[14px] leading-relaxed text-[#243238]/80">
                Enquire about your chosen location properties with a single click. Dynamic pre-filled client parameters directly load in WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. Statistics Panel */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#2d394b] text-white py-[50px] border-b border-[#000000] relative z-10"
      >
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] grid grid-cols-2 lg:grid-cols-4 gap-[30px] text-center">
          <div className="flex flex-col gap-[5px]">
            <span className="text-[#b0bec5] text-[12px] uppercase tracking-wider font-semibold">Properties Listed</span>
            <span className="text-[32px] font-[700] text-[#00a3ff]">150+</span>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-[#b0bec5] text-[12px] uppercase tracking-wider font-semibold">Total Verified Sellers</span>
            <span className="text-[32px] font-[700] text-[#00a3ff]">90+</span>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-[#b0bec5] text-[12px] uppercase tracking-wider font-semibold">Broker Fees Saved</span>
            <span className="text-[32px] font-[700] text-[#00a3ff]">₹18L+</span>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-[#b0bec5] text-[12px] uppercase tracking-wider font-semibold">Happy Home Buyers</span>
            <span className="text-[32px] font-[700] text-[#00a3ff]">98%</span>
          </div>
        </div>
      </motion.section>

      {/* Container Wrapper for Recently Added Properties and below */}
      <div className="w-full bg-white/70 backdrop-blur-sm relative z-20 overflow-hidden">
        {/* 6. Recently Added Section */}
        <motion.section
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-transparent py-[70px] border-b border-[#243238]/10"
        >
          <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex flex-col gap-[40px]">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-[5px]">
                <span className="text-accent uppercase tracking-wider font-[700] text-[12px]">Fresh From Tamil Nadu</span>
                <h2 className="text-[28px] font-[700] text-primary-text">Recently Added Properties</h2>
              </div>
              <Link
                href="/properties?sort=Newest"
                className="text-[14px] text-accent font-[600] hover:underline flex items-center gap-[3px]"
              >
                See Newest Listings <ArrowUpRight size={16} />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-[#b3c8e7]/30 border border-surface/50 rounded-[3px] h-[350px] animate-pulse" />
                ))}
              </div>
            ) : recentProperties.length === 0 ? (
              <p className="text-center text-muted-text text-[15px] py-[30px]">No properties listed currently.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
                {recentProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* 7. Reviews Section */}
        <motion.section
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-transparent py-[70px] border-b border-[#243238]/10"
        >
          <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex flex-col gap-[40px]">
            <div className="text-center flex flex-col gap-[5px] max-w-[600px] mx-auto">
              <span className="text-accent uppercase tracking-wider font-[700] text-[12px]">Sellers & Buyers Speak</span>
              <h2 className="text-[28px] font-[700] text-primary-text">Client Testimonials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
              <div className="bg-[#b3c8e7]/20 border border-surface/55 p-[25px] rounded-[3px] flex flex-col justify-between gap-[20px]">
                <p className="text-[14px] leading-relaxed text-primary-text">
                  &quot;I list my individual villa in ECR through ZeroBroker TN. Within 2 weeks, I received inquiries from verified buyers, negotiated directly, and finished the registration without paying database brokerage (saved 6 Lakhs! &quot;
                </p>
                <div className="flex flex-col">
                  <span className="font-[600] text-[14px] text-primary-text">Karthik Raja</span>
                  <span className="text-[12px] text-muted-text">Villa Seller, Chennai</span>
                </div>
              </div>

              <div className="bg-[#b3c8e7]/20 border border-surface/55 p-[25px] rounded-[3px] flex flex-col justify-between gap-[20px]">
                <p className="text-[14px] leading-relaxed text-primary-text">
                  &quot;Finding a commercial plot without broker middleman intervention was tough. I searched this website, got the owner&apos;s direct WhatsApp, verified the DTCP document check with our lawyers, and closed details in days.&quot;
                </p>
                <div className="flex flex-col">
                  <span className="font-[600] text-[14px] text-primary-text">Ramachandran M.</span>
                  <span className="text-[12px] text-muted-text">Plot Buyer, Madurai</span>
                </div>
              </div>

              <div className="bg-[#b3c8e7]/20 border border-surface/55 p-[25px] rounded-[3px] flex flex-col justify-between gap-[20px]">
                <p className="text-[14px] leading-relaxed text-primary-text">
                  &quot;Listed our apartment in Coimbatore. The submission was processed quickly, and the listing status set to verified on the spot. Great platform for individual residential owners in Tamil Nadu.&quot;
                </p>
                <div className="flex flex-col">
                  <span className="font-[600] text-[14px] text-primary-text">Vijayalakshmi</span>
                  <span className="text-[12px] text-muted-text">Flat Owner, Coimbatore</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 8. Call To Action (Submitting) */}
        <motion.section
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-accent/90 backdrop-blur-sm text-white py-[60px] border-y border-[#000000]/25"
        >
          <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex flex-col lg:flex-row justify-between items-center gap-[30px]">
            <div className="flex flex-col gap-[5px] text-center lg:text-left">
              <h2 className="text-[28px] font-[700] text-primary-text leading-tight">Ready to Sell Your Property in Tamil Nadu?</h2>
              <p className="text-white/80 text-[14px] max-w-[600px]">
                Submit your property details, upload photos, and connect with direct buyers. Zero brokerage fee, fast response, full control.
              </p>
            </div>
            <Link
              href="/submit"
              className="bg-[#243238] text-white font-[600] text-[15px] px-[30px] py-[15px] rounded-[3px] hover:bg-[#2d394b] transition-colors select-none whitespace-nowrap"
            >
              Submit Listing For Free
            </Link>
          </div>
        </motion.section>

        {/* 9. FAQ Section */}
        <motion.section
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-transparent py-[70px]"
        >
          <div className="max-w-[750px] mx-auto px-[15px] flex flex-col gap-[35px]">
            <div className="text-center flex flex-col gap-[5px]">
              <span className="text-accent uppercase tracking-wider font-[700] text-[12px]">Need Help?</span>
              <h2 className="text-[28px] font-[700] text-primary-text">Frequently Asked Questions</h2>
            </div>

            <div className="flex flex-col gap-[10px]">
              {faqs.map((faq, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#b3c8e7]/20 border border-surface/50 rounded-[3px] overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-[20px] font-[600] text-[16px] text-primary-text flex items-center justify-between focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <HelpCircle size={18} className={`text-accent transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    {isExpanded && (
                      <div className="px-[20px] pb-[20px] text-[14px] leading-relaxed text-[#243238]/85 border-t border-surface/30 pt-[15px]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

// Property Card Helper
function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  const formatPrice = (price: number) => {
    // Format price in Lakhs/Crores Lakhs/Crores
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(price / 100000).toFixed(1)} Lakhs`;
  };

  const whatsappMessage = `Hello ZeroBroker TN,

I am interested in the following property.

Property ID: ${property.id}
Property Name: ${property.title}
Price: ${formatPrice(property.price)}
Location: ${property.city}, ${property.district}

Please send more details.`;

  const encodedMessage = encodeURIComponent(whatsappMessage);

  return (
    <div className="bg-[#b3c8e7]/20 border border-surface/60 rounded-[3px] overflow-hidden flex flex-col group transition-all duration-150">
      {/* Property Image Container */}
      <div className="relative h-[200px] w-full bg-surface/50 overflow-hidden">
        <Image
          src={property.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Status badges */}
        <div className="absolute top-[10px] left-[10px] flex flex-col gap-[5px]">
          {property.is_featured && (
            <span className="bg-accent text-white font-[700] text-[10px] uppercase select-none px-[8px] py-[3px] rounded-[3px]">
              Featured
            </span>
          )}
          {property.is_sold && (
            <span className="bg-danger text-white font-[700] text-[10px] uppercase select-none px-[8px] py-[3px] rounded-[3px]">
              Sold
            </span>
          )}
        </div>

        {/* Price Tag overlay */}
        <div className="absolute bottom-[10px] right-[10px] bg-white border border-[#243238]/30 px-[10px] py-[5px] rounded-[3px]">
          <span className="font-[600] text-[14px] text-primary-text">{formatPrice(property.price)}</span>
        </div>
      </div>

      {/* Property Body */}
      <div className="p-[20px] flex-1 flex flex-col justify-between gap-[15px]">
        <div className="flex flex-col gap-[5px]">
          {/* Top Line: type & location */}
          <div className="flex items-center gap-[5px] text-[12px] text-accent font-semibold">
            <span>{property.property_type}</span>
            <span>•</span>
            <span>{property.listing_type === "Sell" ? "For Sale" : "For Lease"}</span>
          </div>

          <h3 className="font-[600] text-[16px] text-primary-text leading-tight group-hover:text-accent transition-colors line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center gap-[3px] text-[12px] text-muted-text mt-[2px]">
            <MapPin size={12} className="text-muted-text" />
            <span>{property.city}, {property.district}</span>
          </div>
        </div>

        {/* Specs Table Row */}
        <div className="grid grid-cols-3 py-[10px] border-y border-[#b0bec5]/30 text-center text-primary-text/80 text-[12px]">
          <div className="flex flex-col gap-[3px] items-center border-r border-[#b0bec5]/30">
            <BedDouble size={14} className="text-muted-text" />
            <span>{property.bedrooms ? `${property.bedrooms} Beds` : "N/A"}</span>
          </div>
          <div className="flex flex-col gap-[3px] items-center border-r border-[#b0bec5]/30">
            <Bath size={14} className="text-muted-text" />
            <span>{property.bathrooms ? `${property.bathrooms} Baths` : "N/A"}</span>
          </div>
          <div className="flex flex-col gap-[3px] items-center">
            <Square size={12} className="text-muted-text" />
            <span>{property.area} Sq.Ft</span>
          </div>
        </div>

        {/* Footer Actions Row */}
        <div className="flex items-center justify-between gap-[10px] pt-[5px]">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 text-[#243238] border border-[#cccccc] hover:bg-surface/30 font-[600] text-[12px] py-[8px] text-center rounded-[3px] btn-transition select-none"
          >
            View Details
          </Link>

          <a
            href={`https://wa.me/${property.owner_whatsapp.replace(/[^0-9]/g, "")}?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#243238] text-white hover:bg-black p-[8px] rounded-[3px] btn-transition flex items-center justify-center focus:outline-none"
            title="Chat on WhatsApp"
          >
            <Phone size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
