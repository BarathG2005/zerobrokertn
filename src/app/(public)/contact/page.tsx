"use client";

import { useState } from "react";
import { submitEnquiry } from "@/lib/supabase";
import { Phone, Mail, MapPin, Landmark, MessageSquare, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitEnquiry({
        name,
        email,
        phone,
        message: `[General Enquiry] ${message}`,
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error("General inquiry submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white/55 backdrop-blur-sm min-h-screen">
      {/* Banner */}
      <section className="bg-[#b3c8e7]/70 border-b border-surface/50 py-[40px]">
        <div className="max-w-[1440px] mx-auto px-[15px] md:px-[30px] lg:px-[70px] text-left">
          <span className="text-accent uppercase tracking-wider font-[700] text-[12px]">Support Helpdesk</span>
          <h1 className="text-[28px] md:text-[36px] font-[700] text-primary-text leading-tight mt-[5px]">Contact Us</h1>
          <p className="text-[14px] text-[#243238]/85 mt-[5px]">Reach out for listing verifications, platform queries, or custom assistance.</p>
        </div>
      </section>

      {/* Main Layout Grid */}
      <section className="py-[60px]">
        <div className="max-w-[1100px] mx-auto px-[15px] grid grid-cols-1 md:grid-cols-2 gap-[40px]">
          
          {/* Column 1: Info panel */}
          <div className="flex flex-col gap-[25px]">
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-[22px] font-[750] text-[#243238]">Office Address & Support</h2>
              <p className="text-[14.5px] leading-relaxed text-[#243238]/80">
                ZeroBroker TN is based in Chennai, coordinates verification visits by appointment, and lists properties online.
              </p>
            </div>

            <div className="flex flex-col gap-[15px] text-[14px] text-primary-text/95">
              <div className="flex items-start gap-[12px] border border-surface/55 p-[15px] rounded-[3px] bg-slate-50">
                <MapPin className="text-accent shrink-0 mt-[2px]" size={18} />
                <div className="flex flex-col gap-[2px]">
                  <span className="font-[650]">Chennai Main Office</span>
                  <span>Anna Salai, Thousand Lights, Chennai, TN - 600006</span>
                </div>
              </div>

              <div className="flex items-start gap-[12px] border border-surface/55 p-[15px] rounded-[3px] bg-slate-50">
                <Phone className="text-accent shrink-0 mt-[2px]" size={18} />
                <div className="flex flex-col gap-[2px]">
                  <span className="font-[650]">Call Support Helpline</span>
                  <span>+91 94440 12345 (9 AM - 6 PM)</span>
                </div>
              </div>

              <div className="flex items-start gap-[12px] border border-surface/55 p-[15px] rounded-[3px] bg-slate-50">
                <MessageSquare className="text-accent shrink-0 mt-[2px]" size={18} />
                <div className="flex flex-col gap-[2px]">
                  <span className="font-[650]">WhatsApp Support</span>
                  <span>+91 94440 12345 (Direct Chat Verification)</span>
                </div>
              </div>

              <div className="flex items-start gap-[12px] border border-surface/55 p-[15px] rounded-[3px] bg-slate-50">
                <Mail className="text-accent shrink-0 mt-[2px]" size={18} />
                <div className="flex flex-col gap-[2px]">
                  <span className="font-[650]">Email Support</span>
                  <span>support@zerobrokertn.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Form panel */}
          <div className="border border-surface/65 p-[25px] rounded-[3px] bg-[#b3c8e7]/10">
            <h3 className="font-[700] text-[16px] text-primary-text mb-[20px] uppercase tracking-wider border-b border-[#cccccc] pb-[5px]">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-[20px] rounded-[3px] text-center flex flex-col items-center gap-[10px]">
                <CheckCircle size={36} className="text-green-600" />
                <span className="font-[700] text-[15px]">Message Sent Successfully</span>
                <p className="text-[13px] leading-relaxed max-w-[300px]">
                  Our administration team has received your support request and will reply within 12 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] text-[13px]">
                <div className="flex flex-col gap-[4px]">
                  <label className="text-[11px] text-muted-text uppercase font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Babu"
                    className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                  />
                </div>

                <div className="flex flex-col gap-[4px]">
                  <label className="text-[11px] text-muted-text uppercase font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                  />
                </div>

                <div className="flex flex-col gap-[4px]">
                  <label className="text-[11px] text-muted-text uppercase font-semibold">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 XXXXX"
                    className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238]"
                  />
                </div>

                <div className="flex flex-col gap-[4px]">
                  <label className="text-[11px] text-muted-text uppercase font-semibold">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What details are you looking for?"
                    className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] px-[12px] rounded-[3px] text-[#243238] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-white font-[600] text-[13px] py-[12px] text-center rounded-[3px] hover:bg-[#0d95e5] btn-transition select-none mt-[5px]"
                >
                  {loading ? "Sending..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
