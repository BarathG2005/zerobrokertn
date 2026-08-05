"use client";

import Link from "next/link";
import { Landmark, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full bg-[#ffffff] min-h-screen flex flex-col justify-center items-center px-[15px] text-center">
      <div className="max-w-[450px] flex flex-col items-center gap-[25px]">
        {/* Flat Logo Symbol */}
        <div className="w-[60px] h-[60px] bg-[#00a3ff] flex items-center justify-center rounded-[3px] text-white">
          <Landmark size={32} />
        </div>
        
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[52px] font-[850] text-primary-text leading-none">404</h1>
          <h2 className="text-[20px] font-[700] text-[#243238]">Page Not Found</h2>
          <p className="text-[14px] text-muted-text leading-relaxed mt-[5px]">
            The route you are searching for does not exist or has been shifted. Return home to browse our Tamil Nadu properties.
          </p>
        </div>

        <Link
          href="/"
          className="bg-accent text-white font-[600] text-[13px] px-[25px] py-[12px] rounded-[3px] hover:bg-[#0d95e5] btn-transition flex items-center gap-[5px] select-none shadow-none"
        >
          Back to Home Page <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
