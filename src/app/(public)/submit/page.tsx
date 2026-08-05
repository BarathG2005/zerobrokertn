"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { submitProperty } from "@/lib/supabase";
import { ShieldCheck, ArrowRight, ArrowLeft, Upload, CheckCircle, HelpCircle, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubmitPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Step 1: Seller/Owner Info
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerWhatsapp, setOwnerWhatsapp] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [preferredContactTime, setPreferredContactTime] = useState("Anytime");
  const [isDirectOwner, setIsDirectOwner] = useState(false);

  // Step 2: Property Info & Parameters
  const [title, setTitle] = useState("");
  const [listingType, setListingType] = useState("Sell");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [category, setCategory] = useState("Residential");
  const [constructionStatus, setConstructionStatus] = useState("Ready to Move");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [facing, setFacing] = useState("East");
  const [parking, setParking] = useState("Yes");
  const [propertyAge, setPropertyAge] = useState("");
  const [description, setDescription] = useState("");

  // Step 3: Location Details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Chennai");
  const [district, setDistrict] = useState("Chennai");
  const [pincode, setPincode] = useState("");

  // Step 4: Media Uploads (holds base64 or Mock urls)
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadedDocPlaceholder, setUploadedDocPlaceholder] = useState<string>("");

  const handleNextStep = () => {
    // Basic validations
    if (step === 1) {
      if (!ownerName || !ownerPhone || !ownerWhatsapp) {
        setErrorMsg("Please fill in landlord contact details.");
        return;
      }
      if (!isDirectOwner) {
        setErrorMsg("You must confirm you are the property owner or direct rep (Zero Brokers rule).");
        return;
      }
    } else if (step === 2) {
      if (!title || !price || !area) {
        setErrorMsg("Title, Price, and Area are mandatory parameters.");
        return;
      }
      if (propertyType !== "Plot" && propertyType !== "Commercial" && (!bedrooms || !bathrooms)) {
        setErrorMsg("Bedrooms and bathrooms selections are needed for residential units.");
        return;
      }
    } else if (step === 3) {
      if (!address || !city || !district || !pincode) {
        setErrorMsg("Please fill complete address details.");
        return;
      }
    }
    setErrorMsg("");
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    setStep(prev => prev - 1);
  };

  // Process selected files and convert to base64 mock URLs
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...filesArr]);
      
      filesArr.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === "string") {
            setImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Default placeholder image if none uploaded
      const finalImages = images.length > 0 
        ? images 
        : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"];

      const payload = {
        title,
        description,
        property_type: propertyType as "Apartment" | "Plot" | "Commercial" | "Villa" | "House",
        listing_type: listingType as "Buy" | "Sell",
        category: category as "Residential" | "Commercial",
        price: Number(price),
        area: Number(area),
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
        facing,
        parking,
        construction_status: constructionStatus as "Ready to Move" | "Under Construction",
        property_age: propertyAge ? Number(propertyAge) : undefined,
        address,
        city,
        district,
        pincode,
        images: finalImages,
        owner_name: ownerName,
        owner_phone: ownerPhone,
        owner_whatsapp: ownerWhatsapp,
        owner_email: ownerEmail,
        preferred_contact_time: preferredContactTime,
        is_featured: false,
        documents: [],
      };

      await submitProperty(payload);
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit property listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white/55 backdrop-blur-sm min-h-screen py-[50px]">
      <div className="max-w-[750px] mx-auto px-[15px]">
        
        {/* Title Header */}
        <div className="flex flex-col gap-[8px] text-center mb-[40px]">
          <span className="text-accent uppercase tracking-wider font-[700] text-[12px]">Direct Listing Portal</span>
          <h1 className="text-[28px] md:text-[34px] font-[700] text-primary-text leading-tight">Submit Your Property</h1>
          <p className="text-[14px] text-muted-text max-w-[500px] mx-auto">
            Zero brokerage, zero agent commission. Complete the form to list your flat, villa, commercial space, or plot.
          </p>
        </div>

        {/* Form Container Wrapper */}
        <div className="bg-white/60 border border-[#243238]/20 rounded-[3px] backdrop-blur-sm">
          
          {/* Progress Indicators Bar */}
          {!isSuccess && (
            <div className="grid grid-cols-4 border-b border-surface/50 text-[12px] font-[600] text-center">
              {[1, 2, 3, 4].map(num => (
                <div
                  key={num}
                  className={`py-[12px] transition-colors ${
                    step === num
                      ? "bg-accent text-white"
                      : step > num
                      ? "bg-[#b3c8e7]/30 text-primary-text"
                      : "bg-white text-muted-text"
                  } ${num < 4 ? "border-r border-surface/50" : ""}`}
                >
                  Step {num}
                </div>
              ))}
            </div>
          )}

          {/* Form Body */}
          <div className="p-[25px] md:p-[35px]">
            
            {errorMsg && (
              <div className="bg-danger/10 border border-danger/30 text-danger text-[13px] p-[12px] rounded-[3px] mb-[20px] font-[500]">
                {errorMsg}
              </div>
            )}

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-[20px] gap-[20px]"
              >
                <div className="w-[60px] h-[60px] bg-green-150 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle size={54} />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <h2 className="text-[22px] font-[700] text-primary-text">Submission Successful!</h2>
                  <p className="text-[14px] text-muted-text max-w-[400px] mx-auto mt-[5px]">
                    Your property listing has been queued for verification. Our admin team will review it within 24 hours.
                  </p>
                </div>
                <div className="flex items-center gap-[10px] mt-[10px]">
                  <button
                    onClick={() => router.push("/properties")}
                    className="bg-accent text-white font-[600] text-[13px] px-[20px] py-[10px] rounded-[3px] hover:bg-[#0d95e5]"
                  >
                    Browse Directory
                  </button>
                  <button
                    onClick={() => {
                      // Reset page state
                      setStep(1);
                      setIsSuccess(false);
                      setImages([]);
                      setImageFiles([]);
                      setTitle("");
                      setPrice("");
                      setArea("");
                      setDescription("");
                    }}
                    className="border border-[#cccccc] text-primary-text font-[500] text-[13px] px-[20px] py-[10px] rounded-[3px]"
                  >
                    Submit Another
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {/* STEP 1: OWNER details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-[20px]"
                  >
                    <h3 className="font-[700] text-[15px] border-b border-surface/50 pb-[8px] text-primary-text flex items-center gap-[5px]">
                      <Landmark size={18} className="text-accent" /> Owner & Brokerage Verification
                    </h3>

                    <div className="flex flex-col gap-[12px] text-[13px]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Landlord Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Kumar"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                          />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Contact Email</label>
                          <input
                            type="email"
                            placeholder="e.g. ramesh@example.com"
                            value={ownerEmail}
                            onChange={(e) => setOwnerEmail(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 98450 12345"
                            value={ownerPhone}
                            onChange={(e) => setOwnerPhone(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                          />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">WhatsApp Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="For direct client enquiries"
                            value={ownerWhatsapp}
                            onChange={(e) => setOwnerWhatsapp(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[11px] text-muted-text uppercase font-semibold">Preferred Callback Hours</label>
                        <select
                          value={preferredContactTime}
                          onChange={(e) => setPreferredContactTime(e.target.value)}
                          className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                        >
                          <option value="Anytime">Anytime (9 AM - 9 PM)</option>
                          <option value="Morning">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
                          <option value="Evening">Evening (4 PM - 8 PM)</option>
                        </select>
                      </div>

                      <div className="bg-[#b3c8e7]/20 border border-surface/50 p-[15px] rounded-[3px] mt-[10px] flex items-start gap-[10px]">
                        <input
                          type="checkbox"
                          id="owner-chk"
                          checked={isDirectOwner}
                          onChange={(e) => setIsDirectOwner(e.target.checked)}
                          className="mt-[4px] cursor-pointer"
                        />
                        <label htmlFor="owner-chk" className="text-[13px] text-[#243238] font-[550] cursor-pointer select-none leading-relaxed">
                          I declare that I am the direct owner, family member, or authorized executor representing this property. No real estate broker commissions will be paid or demanded.
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end pt-[10px]">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-accent text-white font-[600] text-[13px] py-[10px] px-[20px] rounded-[3px] hover:bg-[#0d95e5] btn-transition flex items-center gap-[5px]"
                      >
                        Next: Property Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Basic property details Form */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-[20px]"
                  >
                    <h3 className="font-[700] text-[15px] border-b border-surface/50 pb-[8px] text-primary-text">
                      Property Information
                    </h3>

                    <div className="flex flex-col gap-[15px] text-[13px]">
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[11px] text-muted-text uppercase font-semibold">Listing Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Modern 3 BHK Flat near OMR, Chennai"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[15px]">
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Listing Type</label>
                          <select
                            value={listingType}
                            onChange={(e) => setListingType(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                          >
                            <option value="Sell">For Sell</option>
                            <option value="Buy">For Rent/Lease</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Scope Category</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                          >
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Property Type</label>
                          <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                          >
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="House">House</option>
                            <option value="Plot">Plot (Land)</option>
                            <option value="Commercial">Commercial Shop</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Construction Status</label>
                          <select
                            value={constructionStatus}
                            onChange={(e) => setConstructionStatus(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                          >
                            <option value="Ready to Move">Ready to Move</option>
                            <option value="Under Construction">Under Construction</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[15px]">
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Pricing (₹ in absolute INR) *</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 7500000"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                          />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Carpet Area (Sq.Ft) *</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 1450"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                          />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Property Age (Years)</label>
                          <input
                            type="number"
                            placeholder="e.g. 3"
                            value={propertyAge}
                            onChange={(e) => setPropertyAge(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                          />
                        </div>
                      </div>

                      {/* BHK details row - hide for plots and commercial */}
                      {propertyType !== "Plot" && propertyType !== "Commercial" && (
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-[15px]">
                          <div className="flex flex-col gap-[4px]">
                            <label className="text-[11px] text-muted-text uppercase font-semibold">Bedrooms (BHK) *</label>
                            <select
                              value={bedrooms}
                              onChange={(e) => setBedrooms(e.target.value)}
                              className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                            >
                              <option value="">Select BHK</option>
                              <option value="1">1 BHK</option>
                              <option value="2">2 BHK</option>
                              <option value="3">3 BHK</option>
                              <option value="4">4+ BHK</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-[4px]">
                            <label className="text-[11px] text-muted-text uppercase font-semibold">Bathrooms *</label>
                            <select
                              value={bathrooms}
                              onChange={(e) => setBathrooms(e.target.value)}
                              className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                            >
                              <option value="">Select Bath</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4+</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-[4px]">
                            <label className="text-[11px] text-muted-text uppercase font-semibold">Facing Direction</label>
                            <select
                              value={facing}
                              onChange={(e) => setFacing(e.target.value)}
                              className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                            >
                              <option value="East">East</option>
                              <option value="West">West</option>
                              <option value="North">North</option>
                              <option value="South">South</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-[4px]">
                            <label className="text-[11px] text-muted-text uppercase font-semibold">Parking Included?</label>
                            <select
                              value={parking}
                              onChange={(e) => setParking(e.target.value)}
                              className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[11px] text-muted-text uppercase font-semibold">Full Description *</label>
                        <textarea
                          rows={4}
                          placeholder="Provide details such as nearby milestones, special facilities, interior details, etc..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238] resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-[10px]">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="border border-[#cccccc] text-primary-text font-[500] text-[13px] py-[10px] px-[20px] rounded-[3px] flex items-center gap-[5px]"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-accent text-white font-[600] text-[13px] py-[10px] px-[20px] rounded-[3px] hover:bg-[#0d95e5] btn-transition flex items-center gap-[5px]"
                      >
                        Next: Location Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Location Details */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-[20px]"
                  >
                    <h3 className="font-[700] text-[15px] border-b border-surface/50 pb-[8px] text-primary-text">
                      Location Parameters
                    </h3>

                    <div className="flex flex-col gap-[15px] text-[13px]">
                      <div className="flex flex-col gap-[4px]">
                        <label className="text-[11px] text-muted-text uppercase font-semibold">Street Address / Local Area *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 5th Main Road, Sholinganallur"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[15px]">
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">City *</label>
                          <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                          >
                            <option value="Chennai">Chennai</option>
                            <option value="Coimbatore">Coimbatore</option>
                            <option value="Madurai">Madurai</option>
                            <option value="Trichy">Trichy</option>
                            <option value="Salem">Salem</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">District *</label>
                          <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px]"
                          >
                            <option value="Chennai">Chennai</option>
                            <option value="Coimbatore">Coimbatore</option>
                            <option value="Madurai">Madurai</option>
                            <option value="Tiruchirappalli">Tiruchirappalli</option>
                            <option value="Salem">Salem</option>
                            <option value="Tiruppur">Tiruppur</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <label className="text-[11px] text-muted-text uppercase font-semibold">Pincode *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 600119"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-[10px]">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="border border-[#cccccc] text-primary-text font-[500] text-[13px] py-[10px] px-[20px] rounded-[3px] flex items-center gap-[5px]"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-accent text-white font-[600] text-[13px] py-[10px] px-[20px] rounded-[3px] hover:bg-[#0d95e5] btn-transition flex items-center gap-[5px]"
                      >
                        Next: Photos & Documents <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Photos & Documents Review */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-[20px]"
                  >
                    <h3 className="font-[700] text-[15px] border-b border-surface/50 pb-[8px] text-primary-text">
                      Photos & Legal Document verification
                    </h3>

                    <div className="flex flex-col gap-[20px] text-[13px]">
                      {/* Image Upload Input */}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[11px] text-muted-text uppercase font-semibold">Upload Property Photos</label>
                        <div className="border-2 border-dashed border-[#cccccc] hover:border-[#00a3ff] py-[30px] px-[15px] text-center rounded-[3px] flex flex-col items-center gap-[10px] relative transition-colors cursor-pointer bg-slate-50">
                          <Upload size={32} className="text-[#b0bec5]" />
                          <div className="flex flex-col">
                            <span className="font-[650] text-[#243238]">Click to upload photos</span>
                            <span className="text-[11px] text-muted-text mt-[2px]">JPEG or PNG format up to 5MB</span>
                          </div>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Display Uploaded Image Previews */}
                      {images.length > 0 && (
                        <div className="flex flex-col gap-[8px]">
                          <span className="text-[11px] text-muted-text uppercase font-semibold">Uploaded Images ({images.length})</span>
                          <div className="grid grid-cols-4 gap-[10px]">
                            {images.map((img, i) => (
                              <div key={i} className="relative h-[80px] rounded-[3px] overflow-hidden border border-surface/60 group">
                                <Image src={img} alt="" fill className="object-cover" />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(i)}
                                  className="absolute top-[3px] right-[3px] bg-red-600 text-white rounded-full w-[18px] h-[18px] flex items-center justify-center font-[700] text-[10px] hover:bg-red-800"
                                >
                                  X
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Document Verification Placeholder */}
                      <div className="flex flex-col gap-[5px]">
                        <label className="text-[11px] text-muted-text uppercase font-semibold">Verification Document (Patta/Chitta/Blueprint)</label>
                        <div className="border border-surface/50 p-[15px] rounded-[3px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[10px] bg-[#b3c8e7]/15">
                          <span className="text-[12px] text-[#243238]/85 leading-relaxed max-w-[420px]">
                            Upload a copy of Land registration deed / building certificate. This document is kept confidential and only readable by support administration to authorize your listing.
                          </span>
                          <div className="relative">
                            <button
                              type="button"
                              className="bg-[#243238] text-white font-[600] text-[12px] px-[15px] py-[8px] rounded-[3px] whitespace-nowrap"
                            >
                              {uploadedDocPlaceholder ? "File Attached ✓" : "Attach Document"}
                            </button>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.png"
                              onChange={(e) => setUploadedDocPlaceholder(e.target.files?.[0]?.name || "Deed.pdf")}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>
                        {uploadedDocPlaceholder && (
                          <span className="text-[11px] text-green-700 font-semibold mt-[2px]">
                            Attached: {uploadedDocPlaceholder} (Securely encrypted)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-[10px]">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="border border-[#cccccc] text-primary-text font-[500] text-[13px] py-[10px] px-[20px] rounded-[3px] flex items-center gap-[5px]"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#00a3ff] text-white font-[700] text-[13px] py-[10px] px-[25px] rounded-[3px] hover:bg-[#0d95e5] btn-transition flex items-center gap-[5px] disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Uploading Listing..." : "Submit Listing"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
