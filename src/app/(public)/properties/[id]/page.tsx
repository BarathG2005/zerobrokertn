"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPropertyById, submitEnquiry, getProperties, Property } from "@/lib/supabase";
import { MapPin, BedDouble, Bath, Square, Star, ShieldCheck, Phone, Mail, ArrowLeft, ArrowUpRight, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailsPage({ params }: PageProps) {
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const propertyId = resolvedParams.id;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [viewedImageIdx, setViewedImageIdx] = useState(0);

  // Enquiry Form states
  const [enqName, setEnqName] = useState("");
  const [enqEmail, setEnqEmail] = useState("");
  const [enqPhone, setEnqPhone] = useState("");
  const [enqMessage, setEnqMessage] = useState("");
  const [enqSubmitted, setEnqSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // Copied link indicator state
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const item = await getPropertyById(propertyId);
        if (item) {
          setProperty(item);
          // Load related properties by city / type
          const all = await getProperties({ city: item.city });
          setRelatedProperties(all.filter(p => p.id !== item.id).slice(0, 3));
        }
      } catch (e) {
        console.error("Failed to load property details:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [propertyId]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    setSending(true);
    try {
      await submitEnquiry({
        property_id: property.id,
        property_title: property.title,
        name: enqName,
        email: enqEmail,
        phone: enqPhone,
        message: enqMessage,
      });
      setEnqSubmitted(true);
      setEnqName("");
      setEnqEmail("");
      setEnqPhone("");
      setEnqMessage("");
    } catch (err) {
      console.error("Failed to submit enquiry form:", err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] py-[60px] text-center font-[600] text-muted-text animate-pulse">
        Updating and loading property specifications...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] py-[80px] text-center flex flex-col items-center justify-center gap-[15px]">
        <h1 className="text-[24px] font-[700] text-primary-text">Property Not Found</h1>
        <p className="text-[14px] text-muted-text max-w-[300px]">The property listing you are trying to view does not exist or has been removed.</p>
        <Link href="/properties" className="bg-accent text-white font-[600] text-[13px] px-[20px] py-[10px] rounded-[3px]">
          Return to directory
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lakhs`;
    return `₹${price}`;
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
    <div className="w-full bg-white/70 backdrop-blur-sm pb-[60px]">
      {/* 1. Back button & Breadcrumb bar */}
      <section className="bg-[#b3c8e7]/20 border-b border-surface/50 py-[15px]">
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex items-center justify-between">
          <Link
            href="/properties"
            className="flex items-center gap-[5px] text-[13px] text-primary-text font-[600] hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} /> Back to Directory
          </Link>
          <span className="text-[12px] text-muted-text uppercase font-semibold">ID: {property.id}</span>
        </div>
      </section>

      {/* 2. Headline Title & Header Row */}
      <section className="pt-[30px] pb-[10px]">
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex flex-col md:flex-row md:items-start md:justify-between gap-[15px]">
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center gap-[5px] text-accent text-[12px] font-bold uppercase tracking-wider">
              <span>{property.property_type}</span>
              <span>•</span>
              <span>{property.listing_type === "Sell" ? "For Sale" : "For Lease"}</span>
              <span>•</span>
              <span>{property.construction_status}</span>
            </div>
            <h1 className="text-[24px] md:text-[32px] font-[700] text-primary-text leading-tight">{property.title}</h1>
            <div className="flex items-center gap-[5px] text-[14px] text-primary-text/80">
              <MapPin size={16} className="text-accent" />
              <span>{property.address}, {property.city}, {property.district} - {property.pincode}</span>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-[8px]">
            <span className="text-[#b0bec5] text-[11px] uppercase tracking-wider font-semibold">Total Price</span>
            <span className="text-[28px] md:text-[34px] font-[750] text-[#00a3ff] leading-none">
              {formatPrice(property.price)}
            </span>
            <span className="text-[12px] text-muted-text">₹{Math.round(property.price / property.area).toLocaleString("en-IN")} / Sq.Ft</span>
          </div>
        </div>
      </section>

      {/* 3. Media Gallery Grid */}
      <section className="py-[20px]">
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] grid grid-cols-1 lg:grid-cols-3 gap-[15px]">
          
          {/* Active Big Image Container */}
          <div className="lg:col-span-2 relative h-[300px] md:h-[450px] bg-surface/30 rounded-[3px] overflow-hidden border border-surface/50">
            <Image
              src={property.images[viewedImageIdx] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
            {property.is_sold && (
              <span className="absolute top-[15px] left-[15px] bg-danger text-white font-[700] text-[11px] uppercase px-[10px] py-[4px] rounded-[3px]">
                Sold
              </span>
            )}
          </div>

          {/* Thumbnails list + sharing links */}
          <div className="flex flex-col gap-[15px]">
            <span className="text-[12px] text-muted-text uppercase font-semibold">Photos ({property.images.length})</span>
            <div className="grid grid-cols-3 gap-[10px]">
              {property.images.length === 0 ? (
                <div className="border border-dashed border-[#cccccc] flex items-center justify-center p-[20px] rounded-[3px] text-[11px] text-muted-text h-[80px] bg-gray-50">
                  No photos
                </div>
              ) : (
                property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setViewedImageIdx(i)}
                    className={`relative h-[80px] w-full rounded-[3px] overflow-hidden border ${
                      viewedImageIdx === i ? "border-[#00a3ff] ring-1 ring-accent" : "border-surface/60"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))
              )}
            </div>

            {/* Sharing link panel */}
            <div className="bg-[#b3c8e7]/20 border border-surface/50 p-[15px] rounded-[3px] mt-[10px] flex flex-col gap-[12px]">
              <span className="text-[12px] text-primary-text font-bold">Share this Listing</span>
              <div className="flex items-center gap-[10px]">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 bg-white border border-[#cccccc] text-[13px] py-[8px] px-[12px] rounded-[3px] font-[500] hover:bg-gray-50 btn-transition flex items-center justify-center gap-[5px] text-[#243238]"
                >
                  {copiedLink ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copiedLink ? "Link Copied!" : "Copy Page Link"}</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out this property on ZeroBroker TN: ${property.title} - ${formatPrice(property.price)}. ${window?.location?.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#243238] border border-[#243238] text-white hover:bg-black py-[8px] px-[15px] rounded-[3px] text-[13px] font-[500] btn-transition text-center"
                >
                  Share to WA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Details spec sheet & forms section */}
      <section className="py-[20px]">
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
          
          {/* Left Columns (Specs, Descriptions) */}
          <div className="lg:col-span-2 flex flex-col gap-[30px]">
            {/* Specs Sheet Grid */}
            <div className="bg-[#b3c8e7]/15 border border-surface/55 p-[20px] rounded-[3px]">
              <h2 className="text-[16px] font-[700] text-primary-text border-b border-[#b0bec5]/40 pb-[10px] mb-[15px]">
                Property Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-[20px] text-[14px]">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Property Type</span>
                  <span className="font-[600] text-primary-text">{property.property_type}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Area</span>
                  <span className="font-[600] text-primary-text">{property.area} Sq.Ft</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Price Config</span>
                  <span className="font-[600] text-primary-text">{formatPrice(property.price)}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Bedrooms</span>
                  <span className="font-[600] text-primary-text">{property.bedrooms ? `${property.bedrooms} BHK` : "N/A"}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Bathrooms</span>
                  <span className="font-[600] text-primary-text">{property.bathrooms ? `${property.bathrooms} Bath` : "N/A"}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Property Age</span>
                  <span className="font-[600] text-primary-text">{property.property_age ? `${property.property_age} Years` : "Brand New"}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Facing</span>
                  <span className="font-[600] text-accent font-semibold capitalize">{property.facing}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Parking</span>
                  <span className="font-[600] text-primary-text">{property.parking || "No"}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-muted-text text-[11px] uppercase font-semibold">Status</span>
                  <span className="font-[600] text-primary-text">{property.construction_status}</span>
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-[18px] font-[700] text-primary-text border-b border-surface/50 pb-[8px]">
                Description
              </h2>
              <p className="text-[14px] leading-relaxed text-[#243238]/90 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Neighborhood amenities / Facilities */}
            <div className="flex flex-col gap-[15px]">
              <h2 className="text-[18px] font-[700] text-primary-text border-b border-surface/50 pb-[8px]">
                Neighborhood Key Locations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] text-[13px] text-primary-text/80">
                <div className="border border-surface/50 p-[12px] rounded-[3px] bg-slate-50 flex items-center justify-between">
                  <span className="font-[600]">Hospitals</span>
                  <span className="text-accent underline font-[500]">Within 2 KM</span>
                </div>
                <div className="border border-surface/50 p-[12px] rounded-[3px] bg-slate-50 flex items-center justify-between">
                  <span className="font-[600]">Schools</span>
                  <span className="text-accent underline font-[500]">Within 1.5 KM</span>
                </div>
                <div className="border border-surface/50 p-[12px] rounded-[3px] bg-slate-50 flex items-center justify-between">
                  <span className="font-[600]">Bus Stand</span>
                  <span className="text-accent underline font-[500]">Within 500 Meters</span>
                </div>
                <div className="border border-surface/50 p-[12px] rounded-[3px] bg-slate-50 flex items-center justify-between">
                  <span className="font-[600]">Railway Station</span>
                  <span className="text-accent underline font-[500]">Within 4.5 KM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form & Owner Contact */}
          <div className="flex flex-col gap-[20px]">
            {/* Agent / Owner Contact Card */}
            <div className="bg-[#2d394b] text-white p-[20px] rounded-[3px] border border-[#000000] flex flex-col gap-[15px]">
              <div className="flex items-center gap-[10px]">
                <div className="w-[45px] h-[45px] bg-[#00a3ff] flex items-center justify-center rounded-[3px] text-white font-[700] text-[18px]">
                  {property.owner_name[0]}
                </div>
                <div className="flex flex-col">
                  <span className="font-[700] text-[15px]">{property.owner_name}</span>
                  <span className="text-[12px] text-[#b0bec5]">Verified Landlord Partner</span>
                </div>
              </div>

              <div className="flex flex-col gap-[10px] pt-[10px] border-t border-[#b0bec5]/20 text-[13px] text-[#b0bec5]">
                <div className="flex items-center gap-[8px]">
                  <Phone size={14} className="text-accent" />
                  <span>{property.owner_phone}</span>
                </div>
                {property.owner_email && (
                  <div className="flex items-center gap-[8px]">
                    <Mail size={14} className="text-accent" />
                    <span>{property.owner_email}</span>
                  </div>
                )}
                <div className="text-[11px] italic mt-[5px]">
                  Preferred Time: {property.preferred_contact_time || "Anytime"}
                </div>
              </div>

              <div className="flex flex-col gap-[10px] mt-[5px]">
                <a
                  href={`https://wa.me/${property.owner_whatsapp.replace(/[^0-9]/g, "")}?text=${encodedMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-white font-[600] text-[13px] py-[12px] text-center rounded-[3px] hover:bg-[#0d95e5] btn-transition select-none flex items-center justify-center gap-[5px]"
                >
                  <Phone size={14} /> WhatsApp Direct Chat
                </a>
              </div>
            </div>

            {/* Quick Enquiry Message Form */}
            <div className="border border-surface/60 p-[20px] rounded-[3px]">
              <h3 className="font-[700] text-[14px] text-primary-text uppercase tracking-wider mb-[15px] border-b border-surface/40 pb-[5px]">
                Enquire About this Listing
              </h3>

              {enqSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-[15px] text-center rounded-[3px] text-[13px]">
                  <span className="font-[650] block mb-[5px]">Submit Successful!</span>
                  Your callback query has been registered. The owner will reach out shortly.
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-[12px] text-[13px]">
                  {/* Name field */}
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[11px] text-muted-text font-[500] uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={enqName}
                      onChange={(e) => setEnqName(e.target.value)}
                      placeholder="e.g. Anand Kumar"
                      className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[8px] px-[10px] rounded-[3px] text-primary-text"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[11px] text-muted-text font-[500] uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={enqPhone}
                      onChange={(e) => setEnqPhone(e.target.value)}
                      placeholder="e.g. +91 94440 XXXXX"
                      className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[8px] px-[10px] rounded-[3px] text-primary-text"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[11px] text-muted-text font-[500] uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={enqEmail}
                      onChange={(e) => setEnqEmail(e.target.value)}
                      placeholder="e.g. client@example.com"
                      className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[8px] px-[10px] rounded-[3px] text-primary-text"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[11px] text-muted-text font-[500] uppercase">Message Details</label>
                    <textarea
                      rows={3}
                      required
                      value={enqMessage}
                      onChange={(e) => setEnqMessage(e.target.value)}
                      placeholder="I am interested in this billing property. Please share title deeds verification..."
                      className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[8px] px-[10px] rounded-[3px] text-primary-text resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-accent text-white font-[600] text-[13px] py-[10px] text-center rounded-[3px] hover:bg-[#0d95e5] btn-transition select-none mt-[5px]"
                  >
                    {sending ? "Registering Callback..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Related properties grid */}
      {relatedProperties.length > 0 && (
        <section className="pt-[50px] border-t border-[#e2e8f0] mt-[40px]">
          <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex flex-col gap-[30px]">
            <h2 className="text-[22px] font-[750] text-[#243238]">Nearby Related Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px]">
              {relatedProperties.map((p) => {
                const innerWhatsapp = `Hello ZeroBroker TN,

I am interested in the following property.

Property ID: ${p.id}
Property Name: ${p.title}

Please send more details.`;

                return (
                  <div key={p.id} className="bg-[#b3c8e7]/15 border border-surface/50 rounded-[3px] overflow-hidden flex flex-col justify-between">
                    <div className="relative h-[160px] bg-slate-100">
                      <Image
                        src={p.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-[15px] flex flex-col gap-[10px] flex-1 justify-between">
                      <div className="flex flex-col gap-[4px]">
                        <span className="text-[10px] text-accent font-[700] uppercase tracking-wider">{p.property_type}</span>
                        <h4 className="font-semibold text-[14px] text-primary-text leading-snug line-clamp-1">{p.title}</h4>
                        <span className="text-[13px] font-bold text-accent">{formatPrice(p.price)}</span>
                      </div>
                      <div className="flex items-center gap-[5px] pt-[5px]">
                        <Link
                          href={`/properties/${p.id}`}
                          className="flex-1 bg-white border border-[#cccccc] text-center text-primary-text text-[11px] py-[6px] font-[600] hover:bg-surface/20 rounded-[3px]"
                        >
                          View Detail
                        </Link>
                        <a
                          href={`https://wa.me/${p.owner_whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(innerWhatsapp)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#243238] hover:bg-black text-white p-[6px] rounded-[3px] flex items-center justify-center"
                        >
                          <Phone size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
