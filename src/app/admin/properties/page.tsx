"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProperties, updateProperty, deleteProperty, Property } from "@/lib/supabase";
import { Check, X, Star, Trash2, Eye, ShieldCheck, Filter, Landmark } from "lucide-react";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getProperties({ showAllStatus: true });
      setProperties(data);
    } catch (e) {
      console.error("Failed to load admin properties:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleApprove = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Approved" ? "Pending Approval" : "Approved";
    try {
      await updateProperty(id, { status: nextStatus as any });
      // Update local state list
      setProperties(prev =>
        prev.map(p => (p.id === id ? { ...p, status: nextStatus as any } : p))
      );
    } catch (err) {
      console.error("Failed to toggle verification state:", err);
    }
  };

  const handleToggleFeatured = async (id: string, currentIsFeatured: boolean) => {
    try {
      await updateProperty(id, { is_featured: !currentIsFeatured });
      setProperties(prev =>
        prev.map(p => (p.id === id ? { ...p, is_featured: !currentIsFeatured } : p))
      );
    } catch (err) {
      console.error("Failed to toggle featured status:", err);
    }
  };

  const handleToggleSold = async (id: string, currentIsSold: boolean) => {
    try {
      await updateProperty(id, { is_sold: !currentIsSold });
      setProperties(prev =>
        prev.map(p => (p.id === id ? { ...p, is_sold: !currentIsSold } : p))
      );
    } catch (err) {
      console.error("Failed to toggle sold status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property listing permanently?")) return;
    try {
      await deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Delete operation failed:", err);
    }
  };

  // Filter listings based on inputs
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Approved" && p.status === "Approved") ||
      (statusFilter === "Pending" && p.status === "Pending Approval") ||
      (statusFilter === "Featured" && p.is_featured) ||
      (statusFilter === "Sold" && p.is_sold);

    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return `₹${price}`;
  };

  return (
    <div className="flex flex-col gap-[20px] p-[5px]">
      
      {/* Header bar row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[15px] bg-[#b3c8e7]/20 border border-surface/50 p-[20px] rounded-[3px]">
        <div className="flex flex-col gap-[3px]">
          <h1 className="text-[22px] font-[750] text-primary-text">Property Moderation Listings</h1>
          <p className="text-[13px] text-muted-text">Approve direct owner submissions and toggle featured placement statuses.</p>
        </div>
        <button
          onClick={loadData}
          className="bg-accent text-white font-[600] text-[12px] py-[8px] px-[15px] rounded-[3px] select-none shrink-0"
        >
          Reload Dataset
        </button>
      </div>

      {/* Searching filters widget row */}
      <div className="bg-white border border-surface/60 p-[15px] rounded-[3px] flex flex-col sm:flex-row gap-[12px] text-[13px]">
        {/* search field */}
        <input
          type="text"
          placeholder="Filter by title, city, or owner..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-white border border-[#cccccc] focus:border-accent outline-none py-[8px] px-[12px] rounded-[3px]"
        />

        {/* status drop */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-[#cccccc] outline-none py-[8px] px-[12px] rounded-[3px] text-[#243238] sm:w-[180px]"
        >
          <option value="All">All Items ({properties.length})</option>
          <option value="Pending">Pending Approval ({properties.filter(p => p.status === "Pending Approval").length})</option>
          <option value="Approved">Active Listings ({properties.filter(p => p.status === "Approved").length})</option>
          <option value="Featured">Featured Placement ({properties.filter(p => p.is_featured).length})</option>
          <option value="Sold">Sold Units ({properties.filter(p => p.is_sold).length})</option>
        </select>
      </div>

      {/* Main listings moderation table */}
      <div className="bg-white border border-surface/60 rounded-[3px] overflow-hidden">
        {loading ? (
          <div className="text-center text-muted-text font-semibold py-[40px] animate-pulse">
            Loading moderation files...
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center text-muted-text py-[40px]">
            No property listings match the search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-[#cccccc] text-[11px] uppercase font-bold text-muted-text">
                  <th className="p-[12px] w-[80px]">Image</th>
                  <th className="p-[12px]">Title & Location</th>
                  <th className="p-[12px]">Owner / Whatsapp</th>
                  <th className="p-[12px] w-[110px]">Price (INR)</th>
                  <th className="p-[12px] w-[90px]">Status</th>
                  <th className="p-[12px] w-[200px] text-right">Moderator Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {filteredProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-[12px]">
                      <div className="relative w-[60px] h-[45px] bg-slate-100 rounded-[3px] overflow-hidden border border-surface/50">
                        <Image
                          src={p.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80"}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-[12px]">
                      <div className="flex flex-col min-w-0 pr-[10px]">
                        <span className="font-semibold text-primary-text truncate" title={p.title}>
                          {p.title}
                        </span>
                        <span className="text-muted-text text-[11px]">
                          {p.property_type} • {p.city}, {p.district}
                        </span>
                      </div>
                    </td>
                    <td className="p-[12px]">
                      <div className="flex flex-col">
                        <span className="font-[520]">{p.owner_name}</span>
                        <span className="text-[11px] text-[#243238]/70">{p.owner_whatsapp}</span>
                      </div>
                    </td>
                    <td className="p-[12px]">
                      <span className="font-bold text-[#00a3ff]">{formatPrice(p.price)}</span>
                    </td>
                    <td className="p-[12px]">
                      <span
                        className={`text-[10px] font-bold px-[6px] py-[2px] rounded-[3px] uppercase select-none ${
                          p.status === "Approved"
                            ? "bg-green-100 text-green-700 font-semibold"
                            : "bg-orange-100 text-orange-700 font-semibold"
                        }`}
                      >
                        {p.status === "Approved" ? "Active" : "Pending"}
                      </span>
                    </td>
                    <td className="p-[12px] text-right">
                      <div className="flex items-center justify-end gap-[5px]">
                        {/* 1. View Detail link */}
                        <Link
                          href={`/properties/${p.id}`}
                          target="_blank"
                          className="border border-[#cccccc] hover:bg-slate-100 p-[6px] rounded-[3px] text-[#243238] transition-colors"
                          title="View Live details"
                        >
                          <Eye size={14} />
                        </Link>

                        {/* 2. Approve/Moderation check */}
                        <button
                          onClick={() => handleApprove(p.id, p.status)}
                          className={`p-[6px] rounded-[3px] border transition-colors ${
                            p.status === "Approved"
                              ? "bg-green-600 border-green-600 text-white hover:bg-green-800"
                              : "border-[#cccccc] hover:bg-slate-100 text-primary-text"
                          }`}
                          title={p.status === "Approved" ? "Revoke Approval Status" : "Authorize Approval Status"}
                        >
                          <Check size={14} />
                        </button>

                        {/* 3. Featured placement toggle */}
                        <button
                          onClick={() => handleToggleFeatured(p.id, p.is_featured)}
                          className={`p-[6px] rounded-[3px] border transition-colors ${
                            p.is_featured
                              ? "bg-[#00a3ff] border-[#00a3ff] text-white hover:opacity-90"
                              : "border-[#cccccc] hover:bg-slate-100 text-primary-text"
                          }`}
                          title={p.is_featured ? "Remove from Hero Placement" : "Set Featured Hero display"}
                        >
                          <Star size={14} />
                        </button>

                        {/* 4. Mark Sold toggle */}
                        <button
                          onClick={() => handleToggleSold(p.id, p.is_sold)}
                          className={`p-[6.5px] text-[10.5px] rounded-[3px] border font-bold transition-colors select-none ${
                            p.is_sold
                              ? "bg-red-600 border-red-600 text-white hover:bg-red-800"
                              : "border-[#cccccc] hover:bg-slate-100 text-primary-text"
                          }`}
                          title={p.is_sold ? "Mark as For Sale" : "Mark as Sold"}
                        >
                          Sold
                        </button>

                        {/* 5. Permanent Delete */}
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="border border-red-200 hover:bg-red-50 p-[6px] rounded-[3px] text-red-600 transition-colors"
                          title="Permanently remove file record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
