import Link from "next/link";

const sections = [
  {
    title: "Acceptance of these terms",
    paragraphs: [
      "By using House Hunting, you agree to use the platform responsibly and to follow these initial terms. If you do not agree with them, please do not use the platform.",
    ],
  },
  {
    title: "Purpose of the platform",
    paragraphs: [
      "House Hunting is intended to help people discover rental properties in Nairobi. It provides listing information and tools for exploring homes; it is not a party to a tenancy agreement between a property seeker and a representative.",
    ],
  },
  {
    title: "Responsibilities of property seekers",
    paragraphs: [
      "Property seekers should provide accurate information, use enquiries respectfully and make their own assessment of each home. Before making a payment, independently verify the property, the identity and authority of the representative, and the tenancy terms.",
    ],
  },
  {
    title: "Responsibilities of property contributors",
    paragraphs: [
      "Contributors should only submit listings they are authorised to share. Listing information should be accurate, current and not misleading, including the property's location, availability, pricing, images and material conditions.",
      "Contributors should update or remove information when a property is no longer available or when important details change.",
    ],
  },
  {
    title: "Listings, availability and pricing",
    paragraphs: [
      "Listings are sample or contributor-provided information and may not be independently verified at every stage. Availability, rent and additional charges can change without notice. A listing on the platform is not a guarantee that a property is available or suitable for a particular person.",
      "Users should arrange a physical viewing where possible and confirm all important details directly with the relevant representative before relying on a listing.",
    ],
  },
  {
    title: "Prohibited activities",
    paragraphs: [
      "Users must not create fraudulent listings, provide misleading information, impersonate another person, misuse another user's account, attempt to collect money through deceptive means, or use the platform for unlawful or harmful activity.",
    ],
  },
  {
    title: "Suspension and termination",
    paragraphs: [
      "The platform may restrict, suspend or end access where it reasonably believes that a user has breached these terms, created a safety risk, or misused the platform. Any future account process should provide more detail about applicable notices and review options.",
    ],
  },
  {
    title: "Platform responsibilities and limitations",
    paragraphs: [
      "The platform aims to present useful rental information, but it does not promise that listings are complete, accurate, current, available or suitable. House Hunting does not guarantee a tenancy, a particular outcome, or the conduct of a property representative.",
      "Users remain responsible for their own decisions, viewings, agreements, payments and interactions. This initial draft requires legal review before launch.",
    ],
  },
  {
    title: "Support and suspicious listings",
    paragraphs: [
      "For general assistance, check the Contact Us page for platform support channels currently configured. If a listing appears suspicious, use the reporting option on the relevant property page where available.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-cream px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <header className="border-b border-[#e5ded2] pb-10">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-semibold tracking-[0.08em] text-charcoal">LEGAL DRAFT</p>
          <h1 className="mt-4 font-[family-name:var(--font-lora)] text-[42px] font-normal leading-[1.18] tracking-[-0.02em] text-charcoal sm:text-[54px]">Terms of Use</h1>
          <p className="mt-5 max-w-2xl font-[family-name:var(--font-inter)] text-base leading-[1.7] text-charcoal">These initial terms describe responsible use of House Hunting as a Nairobi rental property discovery platform.</p>
          <p className="mt-5 font-[family-name:var(--font-inter)] text-xs text-grey">Last updated: November 11, 2026</p>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-xs text-grey">This document requires legal review before launch and is not legal advice.</p>
        </header>

        <div className="divide-y divide-[#e5ded2]">
          {sections.map((section, index) => (
            <section key={section.title} className="py-9" aria-labelledby={`terms-section-${index}`}>
              <h2 id={`terms-section-${index}`} className="font-[family-name:var(--font-lora)] text-[28px] font-normal text-charcoal">{section.title}</h2>
              <div className="mt-4 space-y-4 font-[family-name:var(--font-inter)] text-[15px] leading-[1.75] text-charcoal">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <nav className="flex flex-wrap gap-5 border-t border-[#e5ded2] pt-6 font-[family-name:var(--font-inter)] text-sm" aria-label="Legal pages">
          <Link href="/privacy" className="font-medium text-charcoal underline underline-offset-4">Read the Privacy Policy</Link>
          <Link href="/properties" className="text-grey underline underline-offset-4">Explore homes</Link>
        </nav>
      </div>
    </main>
  );
}
