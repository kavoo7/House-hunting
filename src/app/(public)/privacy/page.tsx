import Link from "next/link";

const sections = [
  {
    title: "Information we collect",
    paragraphs: [
      "Depending on how you use House Hunting, we may collect information such as your name, email address, phone number and account details that you choose to provide.",
      "We may also receive information about your property searches, saved homes, enquiries and interactions with property representatives. Please avoid sharing sensitive information that is not needed for your rental search.",
    ],
  },
  {
    title: "How information is used",
    paragraphs: [
      "Information may be used to provide the platform, remember your preferences, help you manage saved homes and support your enquiries. It may also help us understand how the platform is used and improve its content and experience.",
    ],
  },
  {
    title: "When information is shared",
    paragraphs: [
      "If you choose to contact a property representative, the information you submit for that enquiry may be shared with the relevant representative so they can respond. We do not treat a browsing or saved-home action as an instruction to contact a representative.",
      "Any information shared with a property representative may then be handled according to that representative's own practices. Consider what you include in an enquiry before sending it.",
    ],
  },
  {
    title: "Account security and data protection",
    paragraphs: [
      "Please keep your account credentials private and tell us if you believe your account has been used without permission. The platform is intended to use reasonable measures to protect account and personal information, but no online service can promise absolute security.",
      "We will continue to review the platform's data protection practices as account and enquiry functionality develops.",
    ],
  },
  {
    title: "Cookies and similar technologies",
    paragraphs: [
      "The platform may use cookies or similar technologies where needed for core functionality, preferences, security, or understanding how pages are used. Any future non-essential technologies should be introduced with appropriate information and choices where required.",
    ],
  },
  {
    title: "Your requests",
    paragraphs: [
      "You may ask about the personal information associated with your account, request corrections, or ask for information to be deleted where appropriate. We may need to confirm your identity before acting on a request.",
      "For privacy questions or requests, check the Contact Us page for platform support channels currently configured. This draft does not specify a separate privacy contact.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <header className="border-b border-[#e5ded2] pb-10">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">LEGAL DRAFT</p>
          <h1 className="mt-4 font-[family-name:var(--font-lora)] text-[42px] font-normal leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[54px]">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-[1.7] text-charcoal">This initial draft explains how House Hunting may handle information as the Nairobi rental discovery platform develops.</p>
          <p className="mt-5 font-[family-name:var(--font-inter)] text-xs text-grey">Last updated: November 11, 2026</p>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-xs text-grey">This document requires legal review before launch and is not legal advice.</p>
        </header>

        <div className="divide-y divide-[#e5ded2]">
          {sections.map((section, index) => (
            <section key={section.title} className="py-9" aria-labelledby={`privacy-section-${index}`}>
              <h2 id={`privacy-section-${index}`} className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">{section.title}</h2>
              <div className="mt-4 space-y-4 font-[family-name:var(--font-inter)] text-[15px] leading-[1.75] text-charcoal">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <nav className="flex flex-wrap gap-5 border-t border-[#e5ded2] pt-6 font-[family-name:var(--font-inter)] text-sm" aria-label="Legal pages">
          <Link href="/terms" className="font-medium text-charcoal underline underline-offset-4">Read the Terms of Use</Link>
          <Link href="/properties" className="text-grey underline underline-offset-4">Explore homes</Link>
        </nav>
      </div>
    </main>
  );
}
