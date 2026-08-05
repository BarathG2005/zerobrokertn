import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="w-full bg-[#ffffff] min-h-screen py-[50px]">
      <div className="max-w-[800px] mx-auto px-[15px] flex flex-col gap-[20px] text-[14px] leading-relaxed text-[#243238]/90">
        <h1 className="text-[28px] font-[700] text-primary-text mb-[10px] border-b border-surface/50 pb-[10px]">
          Terms & Conditions
        </h1>
        <p className="text-[11px] uppercase tracking-wider text-muted-text font-semibold">Last Updated: August 2026</p>

        <p>
          Welcome to ZeroBroker TN. By submitting listings or browsing properties on our platform, you agree to comply with and be bound by the following terms of service.
        </p>

        <h2 className="text-[18px] font-[750] text-[#243238] mt-[10px]">1. No Brokerage Commitment</h2>
        <p>
          This is a zero brokerage and commission-free platform. Sellers agree not to request commissions from visitors, and buyers agree that transactions are finalized directly with owners. ZeroBroker TN coordinates basic reviews but is not a party to the sale contract and has no financial liability.
        </p>

        <h2 className="text-[18px] font-[750] text-[#243238] mt-[10px]">2. Listing Accuracy and Deed Verifications</h2>
        <p>
          Sellers must upload authentic documents and describe properties accurately. ZeroBroker TN reserves the right to hide, modify, or reject any listing that cannot provide valid title documents (Patta/Chitta/etc.) or is suspected of representing a broker agent masquerading as an owner.
        </p>

        <h2 className="text-[18px] font-[750] text-[#243238] mt-[10px]">3. Direct Communication</h2>
        <p>
          Users appreciate that by entering their details, their telephone numbers, WhatsApp linkages, and email addresses will be accessible to public visitors to coordinate enquiries.
        </p>

        <h2 className="text-[18px] font-[750] text-[#243238] mt-[10px]">4. Contact System</h2>
        <p>
          If you violate these terms, your account and all listings will be blacklist deleted. For queries, contact <Link href="/contact" className="text-accent underline font-[550]">support@zerobrokertn.com</Link>.
        </p>
      </div>
    </div>
  );
}
