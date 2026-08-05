"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/supabase";
import { Landmark, Lock, User, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const session = localStorage.getItem("zb_admin_session");
    if (session) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const success = await adminLogin(username, password);
      if (success) {
        localStorage.setItem("zb_admin_session", "true");
        router.push("/admin/dashboard");
      } else {
        setErrorMsg("Invalid administrative username or secure password credentials.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to finalize authentication validation check.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#ffffff] min-h-screen flex flex-col justify-center items-center px-[15px]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] border border-surface/50 p-[30px] rounded-[3px] bg-slate-50 flex flex-col gap-[25px]"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-[10px] text-center">
          <div className="w-[45px] h-[45px] bg-[#00a3ff] flex items-center justify-center rounded-[3px] text-white">
            <Landmark size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[18px] text-primary-text">
              ZeroBroker TN Admin
            </span>
            <span className="text-[11px] text-muted-text uppercase tracking-wider font-semibold">
              Secure Staff Portal
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-danger/10 border border-danger/30 text-danger text-[12px] p-[10px] rounded-[3px] text-center font-[550]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-[15px] text-[13px]">
          {/* User field */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[11px] text-muted-text font-bold uppercase">Admin Username</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] pl-[35px] pr-[10px] rounded-[3px] text-primary-text"
              />
              <User size={14} className="absolute left-[12px] top-[14px] text-muted-text" />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[11px] text-muted-text font-bold uppercase block">Secure Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#cccccc] focus:border-accent outline-none py-[10px] pl-[35px] pr-[10px] rounded-[3px] text-primary-text"
              />
              <Lock size={14} className="absolute left-[12px] top-[14px] text-muted-text" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white font-[700] text-[13px] py-[12px] rounded-[3px] hover:bg-[#0d95e5] btn-transition select-none mt-[5px]"
          >
            {loading ? "Authorizing access..." : "Sign In to Admin Panel"}
          </button>
        </form>

        <div className="text-[11px] text-center text-muted-text border-t border-[#cccccc]/40 pt-[15px] flex items-center justify-center gap-[5px]">
          <ShieldCheck size={12} className="text-green-600" />
          <span>Encrypted Direct Session Console</span>
        </div>
      </motion.div>
    </div>
  );
}
