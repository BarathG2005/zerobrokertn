import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroBroker TN | Commission-Free Real Estate Tamil Nadu",
  description: "ZeroBroker TN helps property owners sell houses, apartments, plots, and commercial properties without brokerage fee in Tamil Nadu. We act as the trusted middleman between sellers and buyers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-primary-text font-sans">
        {children}
      </body>
    </html>
  );
}

