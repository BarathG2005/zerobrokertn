import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#ffffff] min-h-screen py-[50px]">
      <div className="max-w-[800px] mx-auto px-[15px] flex flex-col gap-[20px] text-[14px] leading-relaxed text-[#243238]/90">
        <h1 className="text-[28px] font-[700] text-primary-text mb-[10px] border-b border-surface/50 pb-[10px]">
          Privacy Policy
        </h1>
        <p className="text-[11px] uppercase tracking-wider text-muted-text font-semibold">Last Updated: August 2026</p>

        <p>
          At ZeroBroker TN, we value the trust you place in us when sharing your real estate listings. This Privacy Policy details how we accumulate, utilize, and protect your information when you access our listing portal.
        </p>

        <h2 className="text-[18px] font-[750] text-[#243238] mt-[10px]">1. Information We Accumulate</h2>
        <p>
          We accumulate information from sellers submitting properties (owner name, telephone coordinate, WhatsApp number, email, and property specifications). We also accumulate callback contact details from buyers utilizing our lead enquiry forms.
        </p>

        <h2 className="text-[18px] font-[750] text-[#243238] mt-[10px]">2. How Information is Used</h2>
        <p>
          Owner contact parameters are published directly alongside approved properties to allow peer-to-peer negotiation. Lead enquiry coordinates are dispatched directly to the listed property owner and kept in our admin portal for backup retrieval. We never sell your personal information to third-party databases.
        </p>

        <h2 className="text-[18px] font-[750] text-[#243238] mt-[10px]">3. Verification Documents Secure Handling</h2>
        <p>
          Patta/Chitta titles or government ID documents uploaded by landlords during step 4 of property submission are strictly restricted to admin security audits. These documents are encrypted, never sold, and deleted once credentials are verified.
        </p>

        <h2 className="text-[18px] font-[750] text-[#243238] mt-[10px]">4. Contact Support</h2>
        <p>
          If you have questions about this policy or request to delete your listed parameters, write to us at <Link href="/contact" className="text-accent underline font-[550]">support@zerobrokertn.com</Link>.
        </p>
      </div>
    </div>
  );
}
