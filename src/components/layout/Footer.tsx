"use client";

import Link from "next/link";
import { Landmark, Mail, Phone, MessageSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#2d394b] text-[#b0bec5] pt-[40px] pb-[30px] border-t border-[#000000]">
      <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
        {/* Column 1: Brand details */}
        <div className="flex flex-col gap-[15px]">
          <Link href="/" className="flex items-center gap-[5px] text-white">
            <div className="w-[30px] h-[30px] bg-accent flex items-center justify-center rounded-[3px]">
              <Landmark size={18} className="text-white" />
            </div>
            <span className="font-bold text-[18px] tracking-tight">
              ZeroBroker <span className="text-accent">TN</span>
            </span>
          </Link>
          <p className="text-[14px] leading-relaxed text-[#b0bec5]/80">
            ZeroBroker TN acts as the trusted brokerage bridge between property sellers and buyers across Tamil Nadu. We assist in transaction processing with zero commission brokerage.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col gap-[15px]">
          <span className="text-white font-[600] text-[14px] uppercase tracking-wider">Quick Links</span>
          <div className="flex flex-col gap-[10px] text-[14px]">
            <Link href="/" className="hover:text-white transition-colors duration-150">Home</Link>
            <Link href="/properties" className="hover:text-white transition-colors duration-150">Search Properties</Link>
            <Link href="/about" className="hover:text-white transition-colors duration-150">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-150">Contact Office</Link>
            <Link href="/submit" className="hover:text-white transition-colors duration-150">Submit Property</Link>
          </div>
        </div>

        {/* Column 3: Legal Policy Links */}
        <div className="flex flex-col gap-[15px]">
          <span className="text-white font-[600] text-[14px] uppercase tracking-wider">Policies</span>
          <div className="flex flex-col gap-[10px] text-[14px]">
            <Link href="/privacy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-150">Terms & Conditions</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors duration-150">Admin Interface</Link>
          </div>
        </div>

        {/* Column 4: Reach Us */}
        <div className="flex flex-col gap-[15px]">
          <span className="text-white font-[600] text-[14px] uppercase tracking-wider">Contact TN Support</span>
          <div className="flex flex-col gap-[10px] text-[14px]">
            <div className="flex items-center gap-[10px]">
              <Phone size={16} className="text-[#00a3ff]" />
              <span>+91 94440 12345</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <MessageSquare size={16} className="text-[#00a3ff]" />
              <span>+91 94440 12345 (WhatsApp)</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <Mail size={16} className="text-[#00a3ff]" />
              <span>support@zerobrokertn.com</span>
            </div>
            <div className="text-[12px] text-[#b0bec5]/60 mt-[5px]">
              Office: Anna Salai, Chennai, TN, India
            </div>
          </div>
        </div>
      </div>

      {/* Copy info */}
      <div className="max-w-[1440px] mx-auto mt-[40px] pt-[20px] px-[15px] md:px-[30px] lg:px-[70px] border-t border-[#000000]/60 flex flex-col sm:flex-row items-center justify-between gap-[10px] text-[12px] text-[#b0bec5]/50">
        <span>© {currentYear} ZeroBroker TN. All rights reserved.</span>
        <span>A Premium Flat Estate Design Interface</span>
      </div>
    </footer>
  );
}
