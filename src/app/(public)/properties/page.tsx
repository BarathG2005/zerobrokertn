"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getProperties, Property } from "@/lib/supabase";
import { MapPin, BedDouble, Bath, Square, Star, ShieldCheck, Phone, Filter, RotateCcw, SlidersHorizontal } from "lucide-react";

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-[1440px] mx-auto px-[15px] py-[40px] text-center font-semibold text-muted-text">
        Loading property search system...
      </div>
    }>
      <PropertiesListContent />
    </Suspense>
  );
}

function PropertiesListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // States for search and filter elements
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("property_type") || "All");
  const [listingType, setListingType] = useState(searchParams.get("listing_type") || "All");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [city, setCity] = useState(searchParams.get("city") || "All");
  const [district, setDistrict] = useState(searchParams.get("district") || "All");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "All");
  const [bathrooms, setBathrooms] = useState(searchParams.get("bathrooms") || "All");
  const [facing, setFacing] = useState(searchParams.get("facing") || "All");
  const [parking, setParking] = useState(searchParams.get("parking") || "All");
  const [constructionStatus, setConstructionStatus] = useState(searchParams.get("construction_status") || "All");
  const [sort, setSort] = useState(searchParams.get("sort") || "Newest");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync params to states on navigation
  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setPropertyType(searchParams.get("property_type") || "All");
    setListingType(searchParams.get("listing_type") || "All");
    setCategory(searchParams.get("category") || "All");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setCity(searchParams.get("city") || "All");
    setDistrict(searchParams.get("district") || "All");
    setBedrooms(searchParams.get("bedrooms") || "All");
    setBathrooms(searchParams.get("bathrooms") || "All");
    setFacing(searchParams.get("facing") || "All");
    setParking(searchParams.get("parking") || "All");
    setConstructionStatus(searchParams.get("construction_status") || "All");
    setSort(searchParams.get("sort") || "Newest");
  }, [searchParams]);

  // Load properties based on state settings
  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      try {
        const filters: any = {
          sort,
          showAllStatus: false // only show approved to public
        };
        if (keyword) filters.keyword = keyword;
        if (propertyType !== "All") filters.property_type = propertyType;
        if (listingType !== "All") filters.listing_type = listingType;
        if (category !== "All") filters.category = category;
        if (minPrice) filters.minPrice = Number(minPrice);
        if (maxPrice) filters.maxPrice = Number(maxPrice);
        if (city !== "All") filters.city = city;
        if (district !== "All") filters.district = district;
        if (bedrooms !== "All") filters.bedrooms = bedrooms;
        if (bathrooms !== "All") filters.bathrooms = bathrooms;
        if (facing !== "All") filters.facing = facing;
        if (parking !== "All") filters.parking = parking;
        if (constructionStatus !== "All") filters.construction_status = constructionStatus;

        const data = await getProperties(filters);
        setProperties(data);
        setCurrentPage(1); // Reset page on filter application
      } catch (err) {
        console.error("Failed to load search results:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, [
    keyword, propertyType, listingType, category, minPrice, maxPrice,
    city, district, bedrooms, bathrooms, facing, parking, constructionStatus, sort
  ]);

  // Apply inputs and sync variables to browser router search query URL parameters
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (propertyType !== "All") params.set("property_type", propertyType);
    if (listingType !== "All") params.set("listing_type", listingType);
    if (category !== "All") params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (city !== "All") params.set("city", city);
    if (district !== "All") params.set("district", district);
    if (bedrooms !== "All") params.set("bedrooms", bedrooms);
    if (bathrooms !== "All") params.set("bathrooms", bathrooms);
    if (facing !== "All") params.set("facing", facing);
    if (parking !== "All") params.set("parking", parking);
    if (constructionStatus !== "All") params.set("construction_status", constructionStatus);
    if (sort) params.set("sort", sort);

    router.push(`/properties?${params.toString()}`);
    setShowMobileFilters(false);
  };

  const handleReset = () => {
    setKeyword("");
    setPropertyType("All");
    setListingType("All");
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setCity("All");
    setDistrict("All");
    setBedrooms("All");
    setBathrooms("All");
    setFacing("All");
    setParking("All");
    setConstructionStatus("All");
    setSort("Newest");
    router.push("/properties");
    setShowMobileFilters(false);
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPropertiesList = properties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lakhs`;
    return `₹${price}`;
  };

  return (
    <div className="w-full bg-white/55 backdrop-blur-sm min-h-screen">
      {/* Search page Banner */}
      <section className="bg-[#b3c8e7]/70 border-b border-surface/50 py-[30px] md:py-[40px]">
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[15px]">
          <div className="flex flex-col gap-[3px]">
            <h1 className="text-[28px] md:text-[32px] font-[700] text-primary-text leading-tight">Explore Properties</h1>
            <p className="text-[14px] text-[#243238]/85">Find direct houses, plots, and apartments without agent commission</p>
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center justify-center gap-[5px] bg-[#243238] text-white rounded-[3px] py-[10px] px-[15px] text-[13px] font-[600]"
          >
            <Filter size={14} /> Filters
          </button>
        </div>
      </section>

      {/* Main filter & grid section */}
      <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] py-[30px] grid grid-cols-1 lg:grid-cols-4 gap-[30px]">
        
        {/* FILTERS SIDEBAR (Desktop layout) */}
        <aside className="hidden lg:flex flex-col gap-[20px] bg-[#b3c8e7]/20 border border-surface/50 p-[20px] rounded-[3px] h-fit">
          <div className="flex items-center justify-between border-b border-[#b0bec5]/45 pb-[10px]">
            <span className="font-[700] text-[15px] text-primary-text flex items-center gap-[5px]"><SlidersHorizontal size={16} /> Filters</span>
            <button onClick={handleReset} className="text-[12px] text-accent font-[600] flex items-center gap-[3px] hover:underline">
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          <div className="flex flex-col gap-[15px]">
            {/* keyword */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Keyword</label>
              <input
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* listing type */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Listing Type</label>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">All listings</option>
                <option value="Buy">For Buy</option>
                <option value="Sell">For Sell</option>
              </select>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Scope Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">All categories</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Budget price range */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Price Limit (Min - Max)</label>
              <div className="grid grid-cols-2 gap-[5px]">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                />
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                />
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">All Cities</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Madurai">Madurai</option>
                <option value="Trichy">Trichy</option>
                <option value="Salem">Salem</option>
              </select>
            </div>

            {/* District */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">All Districts</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Madurai">Madurai</option>
                <option value="Tiruchirappalli">Tiruchirappalli</option>
                <option value="Salem">Salem</option>
                <option value="Tiruppur">Tiruppur</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            {/* Facing direction */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Facing Direction</label>
              <select
                value={facing}
                onChange={(e) => setFacing(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">Any</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
            </div>

            {/* Parking space */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Parking Availability</label>
              <select
                value={parking}
                onChange={(e) => setParking(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">Any</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Construction status */}
            <div className="flex flex-col gap-[5px]">
              <label className="text-[11px] text-muted-text uppercase font-semibold">Construction Status</label>
              <select
                value={constructionStatus}
                onChange={(e) => setConstructionStatus(e.target.value)}
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
              >
                <option value="All">Any</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>

            {/* Apply Button */}
            <button
              onClick={applyFilters}
              className="w-full bg-accent text-white font-[600] text-[13px] rounded-[3px] py-[10px] btn-transition hover:bg-[#0d95e5] mt-[5px]"
            >
              Apply Filter Search
            </button>
          </div>
        </aside>

        {/* PROPERTIES DISPLAY SUB-GRID */}
        <section className="lg:col-span-3 flex flex-col gap-[20px]">
          
          {/* Sorting and Search Top row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[15px] bg-[#b3c8e7]/20 border border-surface/50 p-[15px] rounded-[3px] text-[13px]">
            <span className="text-[#243238] font-[500]">
              Showing <span className="font-[700]">{properties.length}</span> matching properties
            </span>
            <div className="flex items-center gap-[10px] justify-between sm:justify-end">
              <span className="text-muted-text uppercase font-semibold">Sort By</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white border border-[#cccccc] outline-none text-[#243238] px-[10px] py-[5px] rounded-[3px]"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Lowest Price">Lowest Price</option>
                <option value="Highest Price">Highest Price</option>
                <option value="Featured">Featured</option>
                <option value="Most Viewed">Most Viewed</option>
              </select>
            </div>
          </div>

          {/* Listings Card Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="bg-[#b3c8e7]/30 border border-surface/50 rounded-[3px] h-[360px] animate-pulse" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="border border-dashed border-[#cccccc] p-[50px] text-center rounded-[3px] flex flex-col items-center justify-center gap-[10px]">
              <span className="font-[600] text-[16px] text-primary-text">No properties found</span>
              <p className="text-[13px] text-muted-text max-w-[350px]">
                We couldn&apos;t find any properties matching those filter values. Try resetting filters or expanding keyword search.
              </p>
              <button
                onClick={handleReset}
                className="bg-accent text-white rounded-[3px] py-[8px] px-[15px] text-[12px] font-[600] mt-[5px]"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
              {currentPropertiesList.map((p, index) => (
                <PropertyCardLarge key={p.id} property={p} priority={index < 2} />
              ))}
            </div>
          )}

          {/* Simple Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-[5px] mt-[30px]">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-[15px] py-[8px] rounded-[3px] border border-[#cccccc] text-[12px] font-[600] ${
                  currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-surface/20"
                }`}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`width-[32px] height-[32px] px-[12px] py-[8px] rounded-[3px] text-[12px] font-[600] ${
                    currentPage === idx + 1
                      ? "bg-accent text-white"
                      : "bg-white border border-[#cccccc] hover:bg-surface/20 text-primary-text"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-[15px] py-[8px] rounded-[3px] border border-[#cccccc] text-[12px] font-[600] ${
                  currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-surface/20"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>

      {/* MOBILE FILTERS SIDE PANEL / DRAWER */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-[85vw] max-w-[320px] bg-white h-full overflow-y-auto p-[20px] flex flex-col gap-[20px]">
            <div className="flex items-center justify-between border-b border-[#b0bec5]/45 pb-[10px]">
              <span className="font-[700] text-[16px] text-primary-text flex items-center gap-[5px]"><Filter size={16} /> Filters</span>
              <button onClick={() => setShowMobileFilters(false)} className="text-[13px] text-muted-text font-bold">Close X</button>
            </div>

            <div className="flex flex-col gap-[15px]">
              {/* Fill all mobile forms */}
              <div className="flex flex-col gap-[5px]">
                <label className="text-[11px] text-muted-text uppercase font-semibold">Keyword</label>
                <input
                  type="text"
                  placeholder="Area, title key..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-white border border-[#cccccc] outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                />
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-[11px] text-muted-text uppercase font-semibold">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-white border border-[#cccccc] outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                >
                  <option value="All">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-[11px] text-muted-text uppercase font-semibold">Listing Type</label>
                <select
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="w-full bg-white border border-[#cccccc] outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                >
                  <option value="All">All listings</option>
                  <option value="Buy">For Buy</option>
                  <option value="Sell">For Sell</option>
                </select>
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-[11px] text-muted-text uppercase font-semibold">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-[#cccccc] outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                >
                  <option value="All">All Cities</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Trichy">Trichy</option>
                  <option value="Salem">Salem</option>
                </select>
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-[11px] text-muted-text uppercase font-semibold">Price Limit (₹)</label>
                <div className="grid grid-cols-2 gap-[5px]">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-white border border-[#cccccc] outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-white border border-[#cccccc] outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[5px]">
                <label className="text-[11px] text-muted-text uppercase font-semibold">Bedrooms</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full bg-white border border-[#cccccc] outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                >
                  <option value="All">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-[5px]">
                <label className="text-[11px] text-muted-text uppercase font-semibold">Parking Availability</label>
                <select
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  className="w-full bg-white border border-[#cccccc] outline-none text-[13px] text-primary-text rounded-[3px] py-[8px] px-[10px]"
                >
                  <option value="All">Any</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="flex flex-col gap-[10px] pt-[10px]">
                <button
                  onClick={applyFilters}
                  className="w-full bg-accent text-white font-[600] text-[13px] rounded-[3px] py-[10px]"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleReset}
                  className="w-full border border-[#cccccc] text-primary-text font-[500] text-[13px] rounded-[3px] py-[10px]"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Larger Property Card component mapping specs
function PropertyCardLarge({ property, priority = false }: { property: Property; priority?: boolean }) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lakhs`;
    return `₹${price}`;
  };

  const whatsappMessage = `Hello ZeroBroker TN,

I am interested in the following property.

Property ID: ${property.id}
Property Name: ${property.title}

Please send more details.`;

  const encodedMessage = encodeURIComponent(whatsappMessage);

  return (
    <div className="bg-[#b3c8e7]/20 border border-surface/60 rounded-[3px] overflow-hidden flex flex-col group hover:scale-[1.01] transition-all duration-150">
      {/* Media Gallery */}
      <div className="relative h-[220px] w-full bg-surface/40 overflow-hidden">
        <Image
          src={property.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-350"
        />

        {/* Featured and Sold labels */}
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
          {property.status === 'Pending Approval' && (
            <span className="bg-unknown-blue text-white font-[700] text-[10px] uppercase select-none px-[8px] py-[3px] rounded-[3px]">
              Pending Approval
            </span>
          )}
        </div>

        {/* Price tag */}
        <div className="absolute bottom-[10px] right-[10px] bg-white border border-[#243238]/30 px-[12px] py-[6px] rounded-[3px]">
          <span className="font-[700] text-[15px] text-primary-text">{formatPrice(property.price)}</span>
        </div>
      </div>

      {/* Body details */}
      <div className="p-[20px] flex-1 flex flex-col justify-between gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          {/* Headline info */}
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-accent font-[750] uppercase tracking-wider">{property.property_type}</span>
            <span className="text-[11px] text-muted-text font-[500]">ID: {property.id}</span>
          </div>

          <h3 className="font-[700] text-[18px] text-[#243238] group-hover:text-accent transition-colors duration-150 leading-snug line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center gap-[4px] text-[13px] text-muted-text">
            <MapPin size={13} className="text-muted-text" />
            <span>{property.address}, {property.city}</span>
          </div>

          <p className="text-[13px] text-[#243238]/80 leading-relaxed line-clamp-2 mt-[2px]">
            {property.description}
          </p>
        </div>

        {/* Details stats table grid */}
        <div className="grid grid-cols-4 py-[10px] border-y border-[#b0bec5]/35 text-center text-primary-text/80 text-[12px] gap-[5px]">
          <div className="flex flex-col gap-[3px] items-center border-r border-[#b0bec5]/35">
            <BedDouble size={14} className="text-muted-text" />
            <span className="font-[500]">{property.bedrooms ? `${property.bedrooms} Beds` : "N/A"}</span>
          </div>
          <div className="flex flex-col gap-[3px] items-center border-r border-[#b0bec5]/35">
            <Bath size={14} className="text-muted-text" />
            <span className="font-[500]">{property.bathrooms ? `${property.bathrooms} Baths` : "N/A"}</span>
          </div>
          <div className="flex flex-col gap-[3px] items-center border-r border-[#b0bec5]/35">
            <Square size={13} className="text-muted-text" />
            <span className="font-[500]">{property.area} Sq.Ft</span>
          </div>
          <div className="flex flex-col gap-[3px] items-center">
            <Star size={13} className="text-muted-text" />
            <span className="font-semibold text-accent capitalize">{property.facing}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-[10px]">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 bg-accent text-white font-[600] text-[13px] py-[10px] text-center rounded-[3px] hover:bg-[#0d95e5] btn-transition select-none"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/${property.owner_whatsapp.replace(/[^0-9]/g, "")}?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#cccccc] text-primary-text hover:bg-surface/30 px-[15px] py-[10px] rounded-[3px] font-[600] text-[13px] btn-transition flex items-center justify-center gap-[5px] focus:outline-none"
          >
            <Phone size={14} className="text-accent" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
