"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProperties, getEnquiries, Property, Enquiry } from "@/lib/supabase";
import { Landmark, ArrowUpRight, CheckSquare, FileText, Send, UserCheck, ShieldCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Statistics counters
  const [statTotals, setStatTotals] = useState({
    totalListed: 0,
    pendingVerification: 0,
    featuredCount: 0,
    totalEnquiries: 0,
  });

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        const props = await getProperties({ showAllStatus: true });
        const enqs = await getEnquiries();
        
        setProperties(props);
        setEnquiries(enqs);

        setStatTotals({
          totalListed: props.length,
          pendingVerification: props.filter(p => p.status === "Pending Approval").length,
          featuredCount: props.filter(p => p.is_featured).length,
          totalEnquiries: enqs.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardStats();
  }, []);

  // Prepare chart representation from loaded dataset (listings per city)
  const getCityChartData = () => {
    const counts: Record<string, number> = {};
    properties.forEach((p) => {
      counts[p.city] = (counts[p.city] || 0) + 1;
    });
    return Object.keys(counts).map((city) => ({
      name: city,
      listings: counts[city],
    }));
  };

  const chartData = getCityChartData();

  if (loading) {
    return (
      <div className="text-center font-bold text-muted-text py-[40px] animate-pulse">
        Updating metrics charts...
      </div>
    );
  }

  // Slice recent collections for dashboard activities logger
  const recentSubmissions = [...properties]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const recentEnquiries = [...enquiries]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-[30px] p-[5px]">
      
      {/* 1. Header welcome */}
      <div className="flex justify-between items-center bg-[#b3c8e7]/20 border border-surface/50 p-[20px] rounded-[3px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-[24px] font-[750] text-[#243238]">ZeroBroker TN Executive Dashboard</h1>
          <p className="text-[13px] text-muted-text leading-relaxed">
            Overall real estate performance data, seller verification records, and customer callback leads review.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-[5px] bg-[#243238] text-white text-[12px] font-bold py-[8px] px-[12px] rounded-[3px]">
          <ShieldCheck size={14} className="text-accent" /> Secure System Check Normal
        </div>
      </div>

      {/* 2. Grid Cards stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        
        <div className="bg-white border border-surface/60 p-[20px] rounded-[3px] flex items-center justify-between">
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] text-muted-text uppercase font-bold">Total Listings</span>
            <span className="text-[28px] font-bold text-[#243238]">{statTotals.totalListed}</span>
          </div>
          <div className="w-[45px] h-[45px] bg-accent/10 text-accent rounded-[3px] flex items-center justify-center">
            <Landmark size={22} />
          </div>
        </div>

        <div className="bg-white border border-surface/60 p-[20px] rounded-[3px] flex items-center justify-between">
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] text-muted-text uppercase font-bold">Pending Review</span>
            <span className="text-[28px] font-bold text-accent">{statTotals.pendingVerification}</span>
          </div>
          <div className="w-[45px] h-[45px] bg-orange-100 text-orange-600 rounded-[3px] flex items-center justify-center">
            <UserCheck size={22} />
          </div>
        </div>

        <div className="bg-white border border-surface/60 p-[20px] rounded-[3px] flex items-center justify-between">
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] text-muted-text uppercase font-bold">Featured Items</span>
            <span className="text-[28px] font-bold text-[#243238]">{statTotals.featuredCount}</span>
          </div>
          <div className="w-[45px] h-[45px] bg-green-100 text-green-600 rounded-[3px] flex items-center justify-center">
            <CheckSquare size={22} />
          </div>
        </div>

        <div className="bg-white border border-surface/60 p-[20px] rounded-[3px] flex items-center justify-between">
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] text-[#b0bec5] uppercase font-bold">Callback leads</span>
            <span className="text-[28px] font-bold text-[#243238]">{statTotals.totalEnquiries}</span>
          </div>
          <div className="w-[45px] h-[45px] bg-blue-100 text-blue-600 rounded-[3px] flex items-center justify-center">
            <FileText size={22} />
          </div>
        </div>

      </div>

      {/* 3. Analytics Chart Column */}
      {chartData.length > 0 && (
        <section className="bg-white border border-surface/60 p-[25px] rounded-[3px] flex flex-col gap-[15px]">
          <h3 className="font-[700] text-[15px] border-b border-[#cccccc]/45 pb-[10px] text-primary-text">
            Properties Listing Distribution by City
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="listings" fill="#00a3ff" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* 4. Activities log split logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
        {/* Submissions Panel */}
        <div className="bg-white border border-[#243238]/15 p-[20px] rounded-[3px] flex flex-col gap-[15px]">
          <div className="flex items-center justify-between border-b border-[#cccccc]/45 pb-[8px]">
            <h3 className="font-[700] text-[14px] text-primary-text uppercase tracking-wider">
              Recent Property Submissions
            </h3>
            <Link
              href="/admin/properties"
              className="text-[11.5px] text-accent font-bold hover:underline flex items-center gap-[3px]"
            >
              Manage Listings <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="flex flex-col gap-[10px]">
            {recentSubmissions.length === 0 ? (
              <span className="text-[13px] text-center text-muted-text py-[20px]">No recent submissions.</span>
            ) : (
              recentSubmissions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-[10px] text-[13px] last:border-b-0"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-primary-text truncate">{s.title}</span>
                    <span className="text-muted-text text-[11px]">
                      Owner: {s.owner_name} • City: {s.city}
                    </span>
                  </div>
                  <div className="flex flex-col items-end shrink-0 gap-[3px]">
                    <span className="font-bold text-accent">₹{(s.price / 100000).toFixed(1)}L</span>
                    <span
                      className={`text-[10px] font-bold px-[6px] py-[2px] rounded-[3px] uppercase ${
                        s.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {s.status === "Approved" ? "Active" : "Pending"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lead Enquiries Panel */}
        <div className="bg-white border border-[#243238]/15 p-[20px] rounded-[3px] flex flex-col gap-[15px]">
          <div className="flex items-center justify-between border-b border-[#cccccc]/45 pb-[8px]">
            <h3 className="font-[700] text-[14px] text-primary-text uppercase tracking-wider">
              Recent Customer Leads
            </h3>
            <Link
              href="/admin/enquiries"
              className="text-[11.5px] text-accent font-bold hover:underline flex items-center gap-[3px]"
            >
              Review Leads <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="flex flex-col gap-[10px]">
            {recentEnquiries.length === 0 ? (
              <span className="text-[13px] text-center text-muted-text py-[20px]">No recent enquiries.</span>
            ) : (
              recentEnquiries.map((e) => (
                <div
                  key={e.id}
                  className="flex flex-col gap-[5px] border-b border-gray-100 pb-[10px] text-[13px] last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-[650] text-[#243238]">{e.name}</span>
                    <span className="text-[11px] text-muted-text">
                      {new Date(e.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-muted-text text-[11px]">
                    Target: {e.property_title || "General Enquiry"} • Phone: {e.phone}
                  </span>
                  <p className="text-[12px] text-primary-text/75 line-clamp-1 italic bg-slate-50 p-[5px] rounded-[3px]">
                    &quot;{e.message}&quot;
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
