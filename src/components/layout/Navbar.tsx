"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Landmark } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-surface/30">
      {/* 
        Tailwind equivalent of layout specs: 
        padding: 10px 70px 10px 30px
        Wait, for responsive screens we decrease outer padding, and use lg:pl-[30px] lg:pr-[70px] py-[10px]
      */}
      <div className="max-w-[1440px] mx-auto flex items-center justify-between pl-[15px] pr-[15px] md:pl-[30px] md:pr-[40px] lg:pr-[70px] py-[10px]">
        {/* Child 1: Brand Logo */}
        <Link href="/" className="flex items-center gap-[5px] select-none group focus:outline-none">
          <div className="w-[30px] h-[30px] bg-accent flex items-center justify-center rounded-[3px] text-white">
            <Landmark size={18} />
          </div>
          <span className="font-bold text-[18px] tracking-tight text-primary-text group-hover:text-accent transition-colors duration-150">
            ZeroBroker <span className="text-accent underline decoration-2 underline-offset-4">TN</span>
          </span>
        </Link>

        {/* Child 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-[10px]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-[400] px-[15px] py-[8px] rounded-[3px] transition-colors duration-150 focus:outline-[#243238] focus:outline-auto focus:outline-1 ${
                  isActive
                    ? "text-accent font-semibold"
                    : "text-muted-text hover:text-primary-text"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Child 3: CTA Buttons */}
        <div className="hidden md:flex items-center gap-[15px]">
          <Link
            href="/submit"
            className="bg-accent text-white border border-accent rounded-[3px] px-[20px] py-[10px] text-[14px] font-[600] text-center btn-transition hover:bg-[#0d95e5] focus:outline-none focus:ring-1 focus:ring-accent select-none"
          >
            Submit Property
          </Link>
          <Link
            href="/admin/login"
            className="border border-[#cccccc] text-primary-text bg-transparent rounded-[3px] px-[15px] py-[10px] text-[14px] font-[500] text-center btn-transition hover:bg-surface/30 focus:outline-none focus:ring-1 focus:ring-accent select-none"
          >
            Admin Link
          </Link>
        </div>

        {/* Child 4: Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-[5px] text-primary-text hover:text-accent rounded-[3px] transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface/30 bg-white px-[20px] py-[15px] flex flex-col gap-[15px]">
          <div className="flex flex-col gap-[5px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  className={`text-[15px] px-[10px] py-[10px] rounded-[3px] font-[500] transition-colors ${
                    isActive ? "text-accent bg-surface/10" : "text-primary-text hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-[10px] pt-[10px] border-t border-surface/10">
            <Link
              href="/submit"
              onClick={handleMobileLinkClick}
              className="bg-accent text-white rounded-[3px] py-[12px] text-[14px] font-[600] text-center btn-transition hover:bg-[#0d95e5]"
            >
              Submit Property
            </Link>
            <Link
              href="/admin/login"
              onClick={handleMobileLinkClick}
              className="border border-[#cccccc] text-primary-text rounded-[3px] py-[12px] text-[14px] font-[500] text-center btn-transition hover:bg-surface/10"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
