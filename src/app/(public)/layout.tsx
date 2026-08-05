"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Parallax transform equations
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
  const backgroundScale = useTransform(scrollY, [0, 1000], [1.0, 1.15]);

  const homeImages = [
    "/pexels-dibyendu-maiti-1591975618-38839721.jpg",
    "/pexels-mlkbnl-20220498.jpg"
  ];
  const [homeBgIndex, setHomeBgIndex] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;
    const interval = setInterval(() => {
      setHomeBgIndex((prev) => (prev + 1) % homeImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pathname]);

  let bgImage = homeImages[homeBgIndex];
  if (pathname === "/about" || pathname.startsWith("/about/")) {
    bgImage = "/pexels-analogicus-37426482.jpg";
  } else if (pathname === "/contact" || pathname.startsWith("/contact/")) {
    bgImage = "/pexels-pixabay-358636.jpg";
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-[#b3c8e7]">
        <AnimatePresence initial={false}>
          <motion.div
            key={bgImage}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 1.2 }}
            style={{ y: backgroundY, scale: backgroundScale }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={bgImage}
              alt="ZeroBroker TN Background"
              fill
              priority
              className="object-cover opacity-100"
            />
          </motion.div>
        </AnimatePresence>
        {/* Soft overlay tint */}
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
      </div>

      <Navbar />
      <main className="flex-1 w-full flex flex-col relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
