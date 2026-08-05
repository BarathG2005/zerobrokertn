"use client";

import Link from "next/link";
import { ShieldCheck, Landmark, HeartHandshake, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full bg-white/55 backdrop-blur-sm min-h-screen">
      {/* Banner */}
      <section className="bg-[#b3c8e7]/70 border-b border-surface/50 py-[40px]">
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] text-left">
          <span className="text-accent uppercase tracking-wider font-[700] text-[12px]">Our Identity</span>
          <h1 className="text-[28px] md:text-[36px] font-[700] text-primary-text leading-tight mt-[5px]">About ZeroBroker TN</h1>
          <p className="text-[14px] text-[#243238]/85 mt-[5px]">Learn about our mission to digitize commission-free real estate trade across Tamil Nadu.</p>
        </div>
      </section>

      {/* Story & Context */}
      <section className="py-[60px]">
        <div className="max-w-[900px] mx-auto px-[15px] flex flex-col gap-[35px]">
          {/* Mission Block */}
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-[22px] font-[700] text-primary-text border-b border-surface/50 pb-[8px]">Our Core Mission</h2>
            <p className="text-[15px] leading-relaxed text-[#243238]/85">
              Tamil Nadu real estate brokerages historically demand 2% commission from sellers and 1-2% from buyers. On a standard 1 Crore villa transaction, this translates to 3-4 Lakhs of unnecessary overhead. 
            </p>
            <p className="text-[15px] leading-relaxed text-[#243238]/85">
              ZeroBroker TN was created to eliminate this transaction barrier. We provide a clean, secure database where owners list properties directly and upload property deed confirmations. Buyers browse and contact landlords directly via WhatsApp, guaranteeing speed and reducing costs.
            </p>
          </div>

          {/* Core Values grid */}
          <div className="flex flex-col gap-[15px] mt-[10px]">
            <h2 className="text-[22px] font-[700] text-primary-text border-b border-surface/50 pb-[8px]">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              <div className="border border-surface/65 p-[20px] rounded-[3px] flex items-start gap-[12px] bg-slate-50">
                <ShieldCheck className="text-accent shrink-0 mt-[2px]" size={20} />
                <div className="flex flex-col gap-[5px]">
                  <span className="font-[650] text-[#243238] text-[14px]">Document Verification</span>
                  <span className="text-[13px] text-[#243238]/80 leading-normal">
                    We request land documents (Patta/Chitta) and inspect listing titles before approval.
                  </span>
                </div>
              </div>

              <div className="border border-surface/65 p-[20px] rounded-[3px] flex items-start gap-[12px] bg-slate-50">
                <Landmark className="text-accent shrink-0 mt-[2px]" size={20} />
                <div className="flex flex-col gap-[5px]">
                  <span className="font-[650] text-[#243238] text-[14px]">Commission Free</span>
                  <span className="text-[13px] text-[#243238]/80 leading-normal">
                    We charge zero platform usage fees and zero brokerage commissions. Forever.
                  </span>
                </div>
              </div>

              <div className="border border-surface/65 p-[20px] rounded-[3px] flex items-start gap-[12px] bg-slate-50">
                <HeartHandshake className="text-accent shrink-0 mt-[2px]" size={20} />
                <div className="flex flex-col gap-[5px]">
                  <span className="font-[650] text-[#243238] text-[14px]">Direct Ownership</span>
                  <span className="text-[13px] text-[#243238]/80 leading-normal">
                    Only property owners or primary family legal represents are permitted to post listings.
                  </span>
                </div>
              </div>

              <div className="border border-surface/65 p-[20px] rounded-[3px] flex items-start gap-[12px] bg-slate-50">
                <Eye className="text-accent shrink-0 mt-[2px]" size={20} />
                <div className="flex flex-col gap-[5px]">
                  <span className="font-[650] text-[#243238] text-[14px]">Extreme Clarity</span>
                  <span className="text-[13px] text-[#243238]/80 leading-normal">
                    All specifications, costs, and contact parameters are transparently visible to visitors.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Milestone timeline */}
          <div className="flex flex-col gap-[15px] mt-[10px]">
            <h2 className="text-[22px] font-[700] text-primary-text border-b border-surface/50 pb-[8px]">Development Milestones</h2>
            <div className="flex flex-col gap-[15px] border-l-2 border-accent pl-[15px] ml-[5px] text-[14px]">
              <div className="flex flex-col gap-[2px]">
                <span className="font-bold text-[#243238] text-[14px]">January 2026: The Start</span>
                <span className="text-muted-text">ZeroBroker launched in Chennai to connect local flat owners with buyers directly.</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-bold text-[#243238] text-[14px]">March 2026: Tamil Nadu Expansion</span>
                <span className="text-muted-text">Expanded support services to Coimbatore, Madurai, Salem, and Trichy districts.</span>
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-bold text-[#243238] text-[14px]">August 2026: Title Verification Engine</span>
                <span className="text-muted-text">Introduced strict deed document reviews (Patta/Chitta) to optimize buyer safety.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
