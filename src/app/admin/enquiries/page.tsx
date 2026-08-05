"use client";

import { useEffect, useState } from "react";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry, Enquiry } from "@/lib/supabase";
import { Check, Trash2, Phone, Landmark } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (e) {
      console.error("Failed to load enquiries for admin:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleResolve = async (id: string, isResolved: boolean) => {
    const nextStatus = isResolved ? "Pending" : "Resolved";
    try {
      await updateEnquiryStatus(id, nextStatus);
      setEnquiries(prev =>
        prev.map(e => (e.id === id ? { ...e, status: nextStatus } : e))
      );
    } catch (err) {
      console.error("Failed to toggle resolution state:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead record?")) return;
    try {
      await deleteEnquiry(id);
      setEnquiries(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error("Failed to delete enquiry lead:", err);
    }
  };

  // Filter listings based on inputs
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.property_title || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Resolved" && e.status === "Resolved") ||
      (statusFilter === "Pending" && e.status !== "Resolved");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-[20px] p-[5px]">
      
      {/* Header section row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[15px] bg-[#b3c8e7]/20 border border-surface/50 p-[20px] rounded-[3px]">
        <div className="flex flex-col gap-[3px]">
          <h1 className="text-[22px] font-[750] text-[#243238]">Callback Lead Enquiries Tracker</h1>
          <p className="text-[13px] text-muted-text">Manage customer lead enquiries cataloged from property detail panels.</p>
        </div>
        <button
          onClick={loadData}
          className="bg-accent text-white font-[600] text-[12px] py-[8px] px-[15px] rounded-[3px] select-none shrink-0"
        >
          Refresh Leads
        </button>
      </div>

      {/* Searching row */}
      <div className="bg-white border border-surface/60 p-[15px] rounded-[3px] flex flex-col sm:flex-row gap-[12px] text-[13px]">
        <input
          type="text"
          placeholder="Filter by name, phone, or billing property..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-white border border-[#cccccc] focus:border-accent outline-none py-[8px] px-[12px] rounded-[3px]"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-[#cccccc] outline-none py-[8px] px-[12px] rounded-[3px] text-[#243238] sm:w-[180px]"
        >
          <option value="All">All Leads ({enquiries.length})</option>
          <option value="Pending">Unresolved ({enquiries.filter(e => e.status !== "Resolved").length})</option>
          <option value="Resolved">Resolved ({enquiries.filter(e => e.status === "Resolved").length})</option>
        </select>
      </div>

      {/* Main table log */}
      <div className="bg-white border border-surface/60 rounded-[3px] overflow-hidden">
        {loading ? (
          <div className="text-center text-muted-text font-semibold py-[40px] animate-pulse">
            Loading customer responses...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center text-muted-text py-[40px]">
            No lead enquiries match search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-[#cccccc] text-[11px] uppercase font-bold text-muted-text">
                  <th className="p-[12px]">Client Details</th>
                  <th className="p-[12px]">Target Property Info</th>
                  <th className="p-[12px]">Enquiry message</th>
                  <th className="p-[12px] w-[100px]">Received</th>
                  <th className="p-[12px] w-[95px]">Status</th>
                  <th className="p-[12px] w-[140px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {filteredEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-[12px]">
                      <div className="flex flex-col pr-[10px]">
                        <span className="font-semibold text-primary-text">{e.name}</span>
                        <span className="text-[11px] text-[#b0bec5]">{e.email}</span>
                      </div>
                    </td>
                    <td className="p-[12px]">
                      <div className="flex flex-col pr-[10px] min-w-[150px]">
                        <span className="font-medium text-[#243238] truncate" title={e.property_title}>
                          {e.property_title || "[General Inquiry]"}
                        </span>
                        <span className="text-muted-text text-[10.5px]">
                          ID: {e.property_id || "None"}
                        </span>
                      </div>
                    </td>
                    <td className="p-[12px]">
                      <p className="text-[12.5px] text-[#243238]/85 max-w-[280px] line-clamp-2" title={e.message}>
                        {e.message}
                      </p>
                    </td>
                    <td className="p-[12px] whitespace-nowrap">
                      <span className="text-[11px] text-[#b0bec5]">
                        {new Date(e.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-[12px]">
                      <span
                        className={`text-[10px] font-bold px-[6px] py-[2px] rounded-[3px] uppercase select-none ${
                          e.status === "Resolved"
                            ? "bg-green-100 text-green-700 font-semibold"
                            : "bg-[#243238]/10 text-primary-text"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="p-[12px] text-right">
                      <div className="flex items-center justify-end gap-[5px]">
                        {/* WhatsApp coordinate direct shortcut */}
                        <a
                          href={`https://wa.me/${e.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-[#cccccc] hover:bg-slate-100 p-[6px] rounded-[3px] text-accent flex items-center justify-center"
                          title="WhatsApp Client coordinate"
                        >
                          <Phone size={13} />
                        </a>

                        {/* Toggle resolved status */}
                        <button
                          onClick={() => handleToggleResolve(e.id, e.status === "Resolved")}
                          className={`p-[6px] rounded-[3px] border transition-colors ${
                            e.status === "Resolved"
                              ? "bg-green-600 border-green-600 text-white hover:bg-green-800"
                              : "border-[#cccccc] hover:bg-slate-100 text-primary-text"
                          }`}
                          title={e.status === "Resolved" ? "Mark Lead Unresolved" : "Mark Lead Resolved"}
                        >
                          <Check size={13} />
                        </button>

                        {/* Permanent Delete */}
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="border border-red-200 hover:bg-red-50 p-[6px] rounded-[3px] text-red-600 transition-colors"
                          title="Delete Lead Record"
                        >
                          <Trash2 size={13} />
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
