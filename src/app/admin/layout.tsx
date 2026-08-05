"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Landmark, LayoutDashboard, Home, FileText, Settings, LogOut, CheckSquare, Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check login session (mock admin session via localStorage)
  useEffect(() => {
    const session = localStorage.getItem("zb_admin_session");
    if (!session && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("zb_admin_session");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#ffffff] font-semibold text-muted-text">
        Verifying administrator authorization credentials...
      </div>
    );
  }

  // If path is admin login page, don't wrap layout with sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Normal admin page layout with sidebar
  return (
    <div className="min-h-screen flex bg-gray-50 text-[#243238]">
      
      {/* 1. SOLID FLAT SIDEBAR */}
      <aside className="w-[240px] bg-[#2d394b] text-[#b0bec5] border-r border-[#000000] flex flex-col justify-between p-[20px]">
        <div className="flex flex-col gap-[35px]">
          {/* Logo brand */}
          <Link href="/" className="flex items-center gap-[5px] text-white">
            <div className="w-[30px] h-[30px] bg-accent flex items-center justify-center rounded-[3px]">
              <Landmark size={18} className="text-white" />
            </div>
            <span className="font-bold text-[18px] tracking-tight">
              ZeroBroker <span className="text-accent">TN</span>
            </span>
          </Link>

          {/* Nav groups */}
          <nav className="flex flex-col gap-[5px]">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-[10px] text-[13.5px] px-[12px] py-[10px] rounded-[3px] font-[500] hover:text-white transition-colors ${
                pathname === "/admin/dashboard" ? "bg-accent text-white" : "text-[#b0bec5]"
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Metrics & Charts</span>
            </Link>
            <Link
              href="/admin/properties"
              className={`flex items-center gap-[10px] text-[13.5px] px-[12px] py-[10px] rounded-[3px] font-[500] hover:text-white transition-colors ${
                pathname.startsWith("/admin/properties") ? "bg-accent text-white" : "text-[#b0bec5]"
              }`}
            >
              <CheckSquare size={16} />
              <span>Property Moderation</span>
            </Link>
            <Link
              href="/admin/enquiries"
              className={`flex items-center gap-[10px] text-[13.5px] px-[12px] py-[10px] rounded-[3px] font-[500] hover:text-white transition-colors ${
                pathname.startsWith("/admin/enquiries") ? "bg-accent text-white" : "text-[#b0bec5]"
              }`}
            >
              <FileText size={16} />
              <span>Enquiry Lead Tracker</span>
            </Link>
          </nav>
        </div>

        {/* Footer info logout */}
        <div className="flex flex-col gap-[15px] pt-[15px] border-t border-[#b0bec5]/15">
          <Link
            href="/"
            className="flex items-center gap-[10px] text-[13px] px-[12px] py-[8px] hover:text-white"
          >
            <Home size={15} />
            <span>Go to Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-[10px] text-[13px] px-[12px] py-[8px] hover:text-white text-danger/90 font-bold bg-transparent border-0 cursor-pointer text-left"
          >
            <LogOut size={15} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* 2. RIGHT LAYOUT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation top metrics header bar */}
        <header className="h-[60px] bg-white border-b border-surface/30 px-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <Shield size={16} className="text-accent" />
            <span className="font-[650] text-[14px] text-primary-text">Admin Panel Coordination</span>
          </div>

          <div className="flex items-center gap-[12px]">
            <div className="text-[12px] text-right">
              <span className="font-semibold block text-primary-text">TN Executive Admin</span>
              <span className="text-muted-text text-[10px]">Active Session</span>
            </div>
            <div className="w-[32px] h-[32px] bg-accent/25 text-accent rounded-full flex items-center justify-center font-[700] text-[14px]">
              A
            </div>
          </div>
        </header>

        {/* Main nested Children body */}
        <main className="flex-1 overflow-y-auto p-[20px] md:p-[30px] max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
